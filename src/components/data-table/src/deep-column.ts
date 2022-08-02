import { defineComponent, h, inject, computed } from 'vue'
import { omit } from 'lodash-es'
import { UeTableColumn } from '@/ui-comps'
import ActionBtns from '@/components/action-btns'
import SelectionSlot from './selection'
import { vueTypeProp } from '@/utils/component'
import { DataTableColumn } from '../types'

const DeepColumn = defineComponent({
  name: 'UeDeepColumn',
  props: {
    column: vueTypeProp<DataTableColumn>(Object, () => ({} as DataTableColumn)),
    data: vueTypeProp<any>(null),
    emptyCell: vueTypeProp<undefined | AnyFunction<StrOrNum>>(Function)
  },
  setup(props) {
    const getScopeRowKey = inject('getScopeRowKey') as AnyFunction<StrOrNum>

    const tableColumnProps = computed(() => {
      const { column, emptyCell } = props
      const { slots, action, prop, formatter, selection, width, minWidth } = column
      const result = omit(column, [
        'isRemoteSort',
        'action',
        'slots',
        'children',
        'selection',
        'getSelectionProps'
      ])
      if (emptyCell && !slots?.default && !action && prop) {
        result.formatter = (...args) => {
          const result = formatter ? formatter(...args) : args[2]
          return emptyCell ? emptyCell(result, ...args) : result
        }
      }
      if (selection === 'checkbox') {
        result.type = 'selection'
      } else if (selection === 'radio' && (!width || !minWidth)) {
        result.width = 50
      }
      return result
    })

    const handleSlots = computed(() => {
      const { column, data } = props
      const { children, slots, action, selection, notUseRender } = column
      const { default: defSlot, ...rest } = slots || {}
      const childrenColumns: any =
        Array.isArray(children) && children.length
          ? children.map((item, index) => h(DeepColumn, { column: item, key: index }))
          : null
      const needDefSlot: boolean = !notUseRender && !!(defSlot || action || selection === 'radio')
      return {
        ...rest,
        ...(needDefSlot || childrenColumns
          ? {
              default: (scope: any) => {
                const defSlotContent = defSlot
                  ? defSlot(scope)
                  : action
                  ? h(ActionBtns, {
                      key: getScopeRowKey(scope.row),
                      btns: action,
                      loadingFlags: scope.row,
                      data: scope.row,
                      extraArgs: [scope]
                    })
                  : selection === 'radio'
                  ? h(SelectionSlot, { key: getScopeRowKey(scope.row), column, scope, data })
                  : null
                return [defSlotContent, childrenColumns]
              }
            }
          : {})
      }
    })

    return () => h(UeTableColumn, tableColumnProps.value, handleSlots.value)
  }
})

// <TableColumn {...{ props: this.tableColumnProps }} scopedSlots={scopedSlots}>

// </TableColumn>
export default DeepColumn
