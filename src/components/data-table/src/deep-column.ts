import { defineComponent, h, inject, computed } from 'vue'
import { omit } from 'lodash-es';
import { UeTableColumn } from '@/ui-comps';
import ActionBtnsSlot from './action-btns';
import SelectionSlot from './selection'
import { vueTypeProp } from '@/utils/component';
import { DataTableColumn } from '../types';


export default defineComponent({
  name: 'UeDeepColumn',
  props: {
    column: vueTypeProp<DataTableColumn>(Object),
    data: vueTypeProp<any>(null),
    emptyCell: vueTypeProp<boolean | AnyFunction<StrOrNum>>([Boolean, Function])
  },
  setup(props) {
    const getScopeRowKey = inject('getScopeRowKey') as AnyFunction<StrOrNum>

    const tableColumnProps = computed(() => getTableColumnProps(props.column, props.emptyCell))

    const slotComponent = computed(() => {
      const { slots, action, selection } = props.column
      const { default: defSlot } = slots || {}
      return defSlot || (action && ActionBtnsSlot) || (selection === 'radio' && SelectionSlot);
    })

    const getTableColumnProps = (column, emptyCell) => {
      const { scopeSlot, action, prop, formatter, selection, width, minWidth } = column;
      let result = omit(column, ['isRemoteSort', 'action', 'slots', 'children', 'selection', 'getSelectionProps']);
      if (emptyCell && !scopeSlot && !action && prop) {
        result.formatter = (...args) => {
          const result = formatter ? formatter(...args) : args[2];
          return emptyCell ? emptyCell(result, ...args) : result;
        };
      }
      selection && handleSelectionColumn(result, selection);
      return result;
    }
    const handleSelectionColumn = (props, type) => {
      type === 'radio'
        ? (!props.width || !props.minWidth) && (props.width = 50)
        : (props.type = 'selection');
    }
    const scopedSlotCreator = () => {
      const { column, data } = props
      return (scope) => h(component, { key: getScopeRowKey(scope.row), props: { column, scope, data } })
    }

    return () => {
      const { column: { children, notUseScopeSlot }, slotComponent, headerComponent } = this;
      let scopedSlots = {};
      slotComponent && !notUseScopeSlot && (scopedSlots.default = this.scopedSlotCreator(h, slotComponent));
      headerComponent && (scopedSlots.header = this.scopedSlotCreator(headerComponent));
      return h(UeTableColumn, )


      )
    }
  }
})

// <TableColumn {...{ props: this.tableColumnProps }} scopedSlots={scopedSlots}>
// {
//   Array.isArray(children) && children.length && children.map((item, index) => (
//     <UeDeepColumn column={item} key={index}></UeDeepColumn>
//   ))
// }
// </TableColumn>