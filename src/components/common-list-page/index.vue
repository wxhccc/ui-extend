<script setup lang="ts">
import { ref, reactive, computed, useSlots } from 'vue'
import { isFunction, pick } from 'lodash-es'
import { vueTypeProp } from '@/utils/component'
import { PropsTypeToDefine } from '@/types/vue-props'
import { useVModel } from '@/hooks/props'
import { vwp } from '@/utils'
import UePagedTable, { PagedTableProps } from '../paged-table'
import UeSearchForm from '../search-form'
import { CommonListPageProps } from './types'

const props = defineProps({
  ...(UePagedTable.props as PropsTypeToDefine<PagedTableProps>),
  pagedData: vueTypeProp<PagedTableProps['pagedData']>(Object),
  getPagedData: vueTypeProp<PagedTableProps['getPagedData']>(Function),
  request: vueTypeProp<CommonListPageProps['request']>(Function),
  rowKey: vueTypeProp<CommonListPageProps['rowKey']>([String, Function], 'id'),
  searchForms: vueTypeProp<CommonListPageProps['searchForms']>([Array, Object]),
  searchParamsHandler: vueTypeProp<CommonListPageProps['searchParamsHandler']>(Function),
  searchParams: vueTypeProp<CommonListPageProps['searchParams']>(Object),
  initSearchParams: vueTypeProp<CommonListPageProps['initSearchParams']>(Object),
  operation: vueTypeProp<CommonListPageProps['operation']>(Object),
  fetchParamsHandler: vueTypeProp<CommonListPageProps['fetchParamsHandler']>(Function)
})
const emit = defineEmits<{
  (e: 'update:searchParams', value?: AnyObject): void
}>()

const handleSearchParams = useVModel(props, 'searchParams', emit, { supportInner: true })
const handlePagedData = useVModel(props, 'pagedData', undefined, {
  supportInner: true,
  noEmit: true
})
const slots = useSlots()

const selfLoading = ref(false)
const operateLoadings = reactive<Record<string, boolean>>({})

const pagedTableSlots = computed(() =>
  Object.keys(slots).filter((name) => !['default', 'operation'].includes(name))
)

const handleOperation = computed(() => {
  const { operation } = props
  if (!operation) {
    return null
  }
  const items = Array.isArray(operation) ? operation : operation.items
  items.forEach((item) => {
    // 对按钮类组件进行click事件拦截，将相关数据传入事件函数
    const { component, onClick, lockingKey } = item || {}
    if (!component && onClick) {
      const loadingSwitch = (bool: boolean) => {
        lockingKey && (operateLoadings[lockingKey] = bool)
      }
      item.onClick = () => onClick(item, loadingSwitch)
    }
  })
  return Array.isArray(operation) ? { items: operation, loadings: operateLoadings } : operation
})

const pagedTableProps = computed(() => pick(props, Object.keys(UePagedTable.props)))

const searchFormProps = computed(() => ({
  layout: 'inline',
  ...props.searchForms
}))

const showSearchForm = computed(() => {
  const { items } = searchFormProps.value
  return Array.isArray(items) && items.length > 0
})

const handleExtraParams = computed(() => {
  const { searchParamsHandler } = props
  if (isFunction(searchParamsHandler)) {
    return searchParamsHandler(handleSearchParams.value)
  }
  return handleSearchParams.value
})

const handleGetPageData = computed(
  () => (props.getPagedData || selfGetPagedData) as PagedTableProps['getPagedData']
)

const handleLoading = computed(() =>
  props.loading !== undefined ? props.loading : selfLoading.value
)

const selfGetPagedData = async (params: AnyObject) => {
  const { request, fetchParamsHandler } = props
  if (!request) {
    return
  }
  const handleParams = isFunction(fetchParamsHandler) ? fetchParamsHandler(params) : params
  const [, data] = await vwp<PagedTableProps['pagedData']>(request(handleParams), selfLoading)
  handlePagedData.value = data ? data : { rows: [], total: 0 }
}
</script>
<script lang="ts">
export default { name: 'UeCommonListPage' }
</script>
<template>
  <div v-if="columns" class="ue-common-list-page">
    <div v-if="handleOperation || showSearchForm" class="top-form-container">
      <div :class="['operation-pane', { 'single-line': searchFormProps.singleLine }]">
        <slot name="operation">
          <div v-if="handleOperation" class="operation-btns-pane">
            <component
              :is="item.component || 'AButton'"
              v-for="(item, index) in handleOperation.items"
              v-bind="{ ...item, ...item.props }"
              :key="item.key || index"
              class="operation-item"
              :loading="
                handleOperation.loadings &&
                item.lockingKey &&
                handleOperation.loadings[item.lockingKey]
              "
            >
              {{ item.text }}
            </component>
          </div>
        </slot>
      </div>
      <ue-search-form
        v-if="showSearchForm"
        ref="searchForm"
        v-bind="searchFormProps"
        v-model="handleSearchParams"
      ></ue-search-form>
    </div>
    <slot></slot>
    <ue-paged-table
      v-if="columns.length"
      ref="pagedTable"
      v-bind="pagedTableProps"
      :extra-model="handleExtraParams"
      :paged-data="handlePagedData"
      :loading="handleLoading"
      :get-paged-data="handleGetPageData"
    >
      <template v-for="item in pagedTableSlots" :key="item" #[item]="scope">
        <slot :name="item" v-bind="scope"></slot>
      </template>
    </ue-paged-table>
  </div>
</template>

<style lang="scss">
.ue-common-list-page {
  padding: 16px 16px 5px;
  background-color: #ffffff;
  .top-form-container {
    display: flex;
    margin-bottom: 16px;
  }
  .ue-search-form {
    position: relative;
  }
  .operation-pane {
    flex: 1;
    white-space: nowrap;
    .operation-item {
      margin: 0 20px 12px 0;
    }
    &.single-line {
      .operation-item {
        margin-bottom: 0;
      }
    }
  }
}
</style>
