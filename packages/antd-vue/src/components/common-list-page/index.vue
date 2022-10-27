<script setup lang="ts">
import { ref, reactive, computed, useSlots, useAttrs } from 'vue'
import { isFunction, omit, pick } from 'lodash-es'
import { UeButton, UeSpace } from '@/ui-comps'
import UePagedTable, { PagedTableProps } from '@/components/paged-table'
import UeSearchForm from '@/components/search-form'
import { vueTypeProp, PropsTypeToDefine, useVModel, vwp } from '@wxhccc/ue-shared'
import { CommonListPageProps, OperationItem } from './types'

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
  flexLayout: vueTypeProp<CommonListPageProps['flexLayout']>(Boolean, true)
})
const emit = defineEmits<{
  (e: 'update:searchParams', value?: AnyObject): void
}>()
const attrs = useAttrs()
const slots = useSlots()

const pagedTablePropsKeys = Object.keys(UePagedTable.props)
const searchFormPropsKeys = Object.keys(UeSearchForm.props)

const handleSearchParams = useVModel(props, 'searchParams', emit, { supportInner: true })

const handlePagedData = useVModel(props, 'pagedData', undefined, {
  supportInner: true,
  noEmit: true
})

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

const pagedTableProps = computed(() => ({
  ...omit(attrs, ['id', 'class', 'style']),
  ...pick(props, pagedTablePropsKeys)
}))

const searchFormProps = computed(() => ({
  layout: 'inline',
  ...pick(props, searchFormPropsKeys),
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
  const { request } = props
  if (!request) {
    return
  }
  console.log(props.loading)
  const [, data] = await vwp<PagedTableProps['pagedData']>(request(params), selfLoading)
  handlePagedData.value = data ? data : { rows: [], total: 0 }
}

const getOperationItemProps = (item: OperationItem, index: number) => {
  const { loadings } = handleOperation.value || {}
  const { component, key = index, lockingKey, btnText, props, ...rest } = item
  const loading = loadings && lockingKey ? { loading: !!loadings[lockingKey] } : {}
  return { key, ...loading, ...rest, ...props }
}
</script>
<script lang="ts">
export default { name: 'UeCommonListPage' }
</script>
<template>
  <div v-if="columns" :class="['ue-common-list-page', { 'flex-layout': flexLayout }]">
    <div v-if="handleOperation || showSearchForm" class="top-form-container">
      <div :class="['operation-pane', { 'single-line': searchFormProps.singleLine }]">
        <slot name="operation">
          <ue-space v-if="handleOperation" class="operation-btns-pane">
            <component
              :is="item.component || UeButton"
              v-for="(item, index) in handleOperation.items"
              v-bind="getOperationItemProps(item, index)"
              class="operation-item"
            >
              {{ item.btnText }}
            </component>
          </ue-space>
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
      :row-key="rowKey"
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
    &.single-line {
      .operation-item {
        margin-bottom: 0;
      }
    }
  }
  &.flex-layout {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    .ue-paged-table {
      flex: 1;
      overflow: hidden;
    }
    .data-list-container {
      flex: 1;
      overflow: hidden;
    }
  }
}
</style>
