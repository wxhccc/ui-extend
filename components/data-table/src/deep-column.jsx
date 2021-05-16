import { TableColumn } from 'UE/ui-comps';
import ActionBtnsSlot from './action-btns';
import SelectionSlot, { SelectionHeader } from './selection'
import { omit } from 'UE/utils/lodash-es';

export default {
  name: 'UeDeepColumn',
  props: {
    column: Object,
    data: null,
    emptyCell: [Boolean, Function]
  },
  inject: ['getScopeRowKey'],
  computed: {
    tableColumnProps () {
      return this.getTableColumnProps(this.column, this.emptyCell);
    },
    headerComponent () {
      const { slotHeader } = this.column;
      return slotHeader;
    },
    slotComponent () {
      const { scopeSlot, action, selection } = this.column;
      return scopeSlot || (action && ActionBtnsSlot) || (selection === 'radio' && SelectionSlot);
    }
  },
  methods: {
    getTableColumnProps (column, emptyCell) {
      const { scopeSlot, action, prop, formatter, selection, width, minWidth } = column;
      let result = omit(column, ['isRemoteSort', 'action', 'scopeSlot', 'children', 'selection', 'getSelectionProps']);
      if (emptyCell && !scopeSlot && !action && prop) {
        result.formatter = (...args) => {
          const result = formatter ? formatter(...args) : args[2];
          return emptyCell ? emptyCell(result, ...args) : result;
        };
      }
      selection && this.handleSelectionColumn(result, selection);
      return result;
    },
    handleSelectionColumn (props, type) {
      type === 'radio'
        ? (!props.width || !props.minWidth) && (props.width = 50)
        : (props.type = 'selection');
    },
    scopedSlotCreator (h, component) {
      return (scope) => h(component, { key: this.getScopeRowKey(scope.row), props: { column: this.column, scope, data: this.data } })
    }
  },
  render (h) {
    const { column: { children, notUseScopeSlot }, slotComponent, headerComponent } = this;
    let scopedSlots = {};
    slotComponent && !notUseScopeSlot && (scopedSlots.default = this.scopedSlotCreator(h, slotComponent));
    headerComponent && (scopedSlots.header = this.scopedSlotCreator(h, headerComponent));
    return (
      <TableColumn {...{ props: this.tableColumnProps }} scopedSlots={scopedSlots}>
        {
          Array.isArray(children) && children.length && children.map((item, index) => (
            <UeDeepColumn column={item} key={index}></UeDeepColumn>
          ))
        }
      </TableColumn>
    )
  }
}
