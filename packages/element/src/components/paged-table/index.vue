<script setup lang="ts">
import { reactive, ref, computed, useAttrs } from 'vue'
import { pick } from 'lodash-es'
import { vueTypeProp, PropsTypeToDefine, useProxyInstanceMethods } from '@wxhccc/ue-shared'
import { pagedCompProps } from '@/utils/paged-utils'
import UePagedList, { exposeMethods as pagedListMethods } from '@/components/paged-list'
import UeDataTable, { exposeMethods as dataTableMethods, DataTableProps } from '@/components/data-table'
import { SortConfig } from './types'

const props = defineProps({
  ...(UeDataTable.props as PropsTypeToDefine<DataTableProps>),
  ...pagedCompProps('PagedTable'),
  initSort: vueTypeProp<SortConfig>(Object),
  sortPropKeys: vueTypeProp<SortConfig>(Object)
})
const attrs = useAttrs()

const table = ref()
const pagedList = ref()

const ueSort = reactive(props.initSort || {})

const pagedListProps = computed(() => pick(props, Object.keys(UePagedList.props)))

const sortKeys = computed(() => ({ orderby: 'orderby', order: 'order', ...props.sortPropKeys }))

const tableProps = computed(() => ({
  ...ueDefaultSort(),
  ...attrs,
  ...(props.flexLayout ? { height: '100%' } : {}),
  ...pick(props, Object.keys(UeDataTable.props))
}))

const handledExtraForm = computed(() => {
  const { orderby, order } = sortKeys.value
  const sortArgs = ueSort.orderby ? { [orderby]: ueSort.orderby, [order]: ueSort.order } : {}
  return { ...sortArgs, ...props.extraModel }
})

const ueDefaultSort = () => {
  return props.restore && ueSort.orderby
    ? { defaultSort: { prop: ueSort.orderby, order: ueSort.order } }
    : {}
}

const handleSortChange = (values: any) => {
  if (values.column && values.column.sortable === 'custom' && values.prop && values.order) {
    const sort = {
      orderby: values.prop,
      order: values.order === 'descending' ? 'desc' : 'asc'
    }
    Object.assign(ueSort, sort)
  }
}

const listProxyMethods = useProxyInstanceMethods(pagedList, pagedListMethods)
const tableProxyMethods = useProxyInstanceMethods(table, dataTableMethods)

defineExpose({ ...listProxyMethods, ...tableProxyMethods })

</script>
<script lang="ts">
export default { name: 'UePagedTable' }
</script>
<template>
  <ue-paged-list
    ref="pagedList"
    class="ue-paged-table"
    v-bind="pagedListProps"
    :extra-model="handledExtraForm"
  >
    <template #default="{ rows }">
      <ue-data-table
        ref="table"
        v-bind="tableProps"
        :data="rows"
        @sort-change="handleSortChange"
      >
      </ue-data-table>
    </template>
  </ue-paged-list>
</template>

<style lang="scss">
.ue-paged-table {
  .pagination-container {
    margin-top: 4px;
    padding: 18px 0;
    text-align: center;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
}
</style>
