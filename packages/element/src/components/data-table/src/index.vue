<script setup lang="ts">
import { ref, watch, provide, computed, useAttrs } from 'vue'
import { get, isFunction } from 'lodash-es'
import { UeTable, UeTableProps } from '@/ui-comps'
import { useVModel, useProxyInstanceMethods, vueTypeProp, resolveFunctional, StrOrNum } from '@wxhccc/ue-shared'
import UeDeepColumn from './deep-column'
import { DataTableProps, exposeMethods } from '../types'

const defEmptyCell = (value: StrOrNum) => (value || value === 0 ? value : '--')

type SelectionValue = DataTableProps['selectionValue']

const props = defineProps({
  columns: vueTypeProp<NonNullable<DataTableProps['columns']>>(Array, () => [], true),
  selectionKey: vueTypeProp<DataTableProps['selectionKey']>([String, Function]),
  selectionValue: vueTypeProp<SelectionValue>([Array, String, Number]),
  setEmptyCell: vueTypeProp<DataTableProps['setEmptyCell']>([Function, Boolean]),
})
const emit = defineEmits<{
  (e: 'update:selectionValue', value?: SelectionValue): void
}>()

const attrs = useAttrs() as unknown as UeTableProps<any>

const table = ref()

const handleSelectionValue = useVModel(props, 'selectionValue', emit, { supportInner: true })

const emptyCellHandler = computed(() => {
  const { setEmptyCell } = props
  return isFunction(setEmptyCell) ? setEmptyCell : setEmptyCell ? defEmptyCell : undefined
})
const handleColumns = computed(() => props.columns.filter((item) => !resolveFunctional(item.hide)))

const handledSelectionKey = computed(() => {
  return props.selectionKey || attrs.rowKey || attrs['row-key' as 'rowKey']
})

const getScopeRowKey = (row: any) => {
  const { rowKey } = attrs
  return isFunction(rowKey) ? rowKey(row) : rowKey ? get(row, rowKey) : Math.random()
}

const getSelectItemValue = (row: any) => {
  const selectionKey = handledSelectionKey.value
  if (typeof selectionKey === 'string') {
    return row[selectionKey]
  } else if (isFunction(selectionKey)) {
    return selectionKey(row)
  }
  return row
}
const handleSelectionValueChange = () => {
  const values = handleSelectionValue.value
  if (!Array.isArray(values)) return
  const { data } = attrs
  table.value && Array.isArray(data)
  data.forEach((row) => {
    const value = getSelectItemValue(row)
    table.value.toggleRowSelection(row, values.indexOf(value) >= 0)
  })
}
/** events **/
const handleCheckboxChange = (values: StrOrNum[]) => {
  if (!Array.isArray(handleSelectionValue.value)) return
  const selectionKey = handledSelectionKey.value
  const keys = selectionKey ? values.map(getSelectItemValue) : values
  handleSelectionValue.value = keys
}
const handleRadioChange = (value: SelectionValue) => {
  handleSelectionValue.value = value
}

provide('getScopeRowKey', getScopeRowKey)
provide('getSelectItemValue', getSelectItemValue)
provide('handleRadioChange', handleRadioChange)

const proxyMethods = useProxyInstanceMethods(table, exposeMethods)

defineExpose({ ...proxyMethods })

watch(() => [attrs.data, props.selectionValue], handleSelectionValueChange)
</script>
<script lang="ts">
export default { name: 'UeDataTable' }
</script>
<template>
  <ue-table
    ref="table"
    class="ue-data-table"
    :border="true"
    stripe
    @selection-change="handleCheckboxChange"
  >
    <ue-deep-column
      v-for="(column, index) of handleColumns"
      :key="column.key || column.prop || index"
      :column="column"
      :data="{ selectionValue: handleSelectionValue }"
      :empty-cell="emptyCellHandler"
    >
    </ue-deep-column>
  </ue-table>
</template>
<style lang="scss">
.ue-data-table {
  .action-btn {
    margin: 4px 4px;
  }
}
</style>
