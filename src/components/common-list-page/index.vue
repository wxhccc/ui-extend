<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { cloneDeep, pick } from 'lodash-es'
import { UeTabs } from '@/ui-comps'
import { vueTypeProp } from '@/utils/component'
import PagedTable, { PagedTableProps } from '../paged-table'
import SearchForm, { SearchFormPorps } from '../search-form'
import { ButtonOnClick, CommonListPageProps, OperationOption } from './types'
import { PropsTypeToDefine } from '@/types/vue-props'
import { useVModel } from '@/hooks/props'

const props = defineProps({
  ...(SearchForm.props as PropsTypeToDefine<SearchFormPorps>),
  ...(PagedTable.props as PropsTypeToDefine<PagedTableProps>),
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
const handlePagedData = useVModel(props, 'pagedData', undefined, { supportInner: true, noEmit: true })

const selfLoading = ref(false)
const operateLoadings = reactive<Record<string, boolean>>({})

  computed: {
    pagedTableSlots(): string[] {
      return Object.keys(this.$slots).filter((name) => !['default', 'operation'].includes(name))
    },
    handleOperation(): null | OperationOption {
      if (!this.operation) {
        return null
      }
      const items = Array.isArray(this.operation) ? this.operation : this.operation.items
      items.forEach((item) => {
        // 对按钮类组件进行click事件拦截，将相关数据传入事件函数
        const { component, onClick, lockingKey } = item || {}
        if (!component && onClick && lockingKey) {
          const loadingSwitch = (bool: boolean) => (this.operateLoadings[lockingKey] = bool)
          item.onClick = () => {
            ;(onClick as ButtonOnClick)(item, loadingSwitch)
          }
        }
      })
      return Array.isArray(this.operation)
        ? { items: this.operation, loadings: this.operateLoadings }
        : this.operation
    },
    pagedTableProps(): PagedTableProps {
      return {
        ...this.$attrs,
        ...pick(this.$props, Object.keys(PagedTable.props))
      } as PagedTableProps
    },
    searchFormProps(): SearchFormPorps {
      return {
        layout: 'inline',
        ...pick(this.$props, Object.keys(SearchForm.props)),
        ...this.searchForms
      } as SearchFormPorps
    },
    showSearchForm(): boolean {
      const { items } = this.searchFormProps
      return Array.isArray(items) && items.length > 0
    },
    handlePagedData(): CommonListPageProps['pagedData'] {
      return this.pagedData || this.selfPagedData
    },
    handleSearchParams: {
      get(): AnyObject {
        return this.searchParams || this.selfSearchParams
      },
      set(val: AnyObject) {
        let newValue = cloneDeep(val)
        this.selfSearchParams = newValue
        this.$emit('update:searchParams', newValue)
      }
    },
    handleExtraParams() {
      if (this.searchParamsHandler instanceof Function) {
        return this.searchParamsHandler(this.handleSearchParams)
      }
      return this.handleSearchParams
    },
    handleGetPageData(): PagedTableProps['getPagedData'] {
      return (this.getPagedData || this.selfGetPagedData) as PagedTableProps['getPagedData']
    },
    handleLoading(): boolean {
      const loading = this.$attrs.loading as boolean | undefined
      return loading !== undefined ? loading : this.selfLoading
    }
  },
  methods: {
    async selfGetPagedData(params: AnyObject) {
      if (!this.request) {
        return
      }
      const handleParams =
        this.fetchParamsHandler instanceof Function ? this.fetchParamsHandler(params) : params
      const [, data] = await this.$fetch<CommonListPageProps['pagedData']>(
        this.request(handleParams),
        'selfLoading'
      )
      this.selfPagedData = data && data.records ? data : { records: [], total: 0 }
    }
  }
})
</script>
<script lang="ts">
export default { name: 'UeCommonListPage' }
</script>
<template>
  <div v-if="columns" class="ue-common-list-page">
    <div v-if="handleOperation || showSearchForm" class="top-form-container">
      <div :class="['operation-pane', { 'single-line': singleLine }]">
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
      <search-form
        v-if="showSearchForm"
        ref="searchForm"
        v-bind="searchFormProps"
        v-model="handleSearchParams"
      ></search-form>
    </div>
    <slot></slot>
    <paged-table
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
    </paged-table>
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
