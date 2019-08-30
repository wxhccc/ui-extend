import { Radio } from 'UE/ui-comps';

export default {
  inject: ['getSelectItemValue', 'handleRadioChange'],
  props: {
    column: Object,
    scope: Object,
    data: null
  },
  computed: {
    selectionValue () { return this.data ? this.data.selectionValue: '' },
    row () { return this.scope.row || {}; },
    selectValue () { return this.getSelectItemValue(this.row) },
    handleBindProps () {
      const { column: { selectable }, selectValue, selectionValue } = this;
      const disabled = typeof selectable === 'function' && !selectable(row, scope.$index);
      return {
        key: selectValue,
        props: { disabled, label: selectValue, value: selectionValue },
        on: { input: this.handleRadioChange }
      };
    }
  },
  render (h) {
    return h(Radio, this.handleBindProps, [h('span')]);
  }
}