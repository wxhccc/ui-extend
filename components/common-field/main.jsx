import { cloneDeep } from 'UE/utils/lodash';
import { resolveProps } from 'UE/utils/component';
import slotsHandlerMixin from 'UE/mixins/slots-handler';

const fieldChild = {
  Select: 'Option',
  CheckboxGroup: 'Checkbox',
  RadioGroup: 'Radio'
};

export default {
  name: 'UeCommonField',
  mixins: [slotsHandlerMixin],
  props: {
    value: null,
    libPrefix: {
      type: String,
      default: 'El'
    },
    field: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    fieldValue: {
      get () {
        return (this.field.initValue && typeof this.value === 'undefined') ? cloneDeep(this.field.initValue) : cloneDeep(this.value);
      },
      set (value) {
        const handleVal = typeof value === 'string' && this.field.isNumber
          ? this.parseNumber(value)
          : value;
        this.$emit('input', handleVal);
      }
    },
    fieldVDO () {
      const { props, events } = this.field;
      const handleEvents = Object.assign({}, this.$listeners, events, { input: val => (this.fieldValue = val) });
      return resolveProps(props, handleEvents, { ref: 'field' });
    },
    childField () {
      const { childComponent, component } = this.field;
      if (childComponent) return childComponent;
      if (typeof component === 'string') {
        const noPrefixName = component.replace(this.libPrefix, '');
        return fieldChild[noPrefixName] ? this.libPrefix + fieldChild[noPrefixName] : ''
      }
    },
    isItemNeedFixed () {
      const { childField, forbidValueFixed, field: { component } } = this;
      if (forbidValueFixed) return false;
      return ['ElRadioGroup', 'ElCheckboxGroup'].includes(component)
    },
    dataChildren () {
      const { field: { data }, childField } = this;
      return Array.isArray(data) && data.length && childField
        ? data.map(this.createDataItem)
        : null;
    },
    slotChildren () {
      const { field: { slots }, $createElement: h } = this;
      if (!slots) return;
      const workSlots = slots.component ? { default: slots } : slots;
      return this.$_mixin_slotsToVNode(workSlots);
    }
  },
  $_ue_methods: ['callFieldMethod'],
  methods: {
    /** public methods **/
    callFieldMethod (fn, ...args) {
      const { field } = this.$refs;
      if (field && typeof field[fn] === 'function') return field[fn](...args);
    },
    /** utils **/
    parseNumber (value) {
      return Number.isNaN(Number.parseFloat(value)) ? value : Number.parseFloat(value);
    },
    createDataItem (item, index) {
      const { field: { dataItemContent }, $createElement: h, isItemNeedFixed, childField } = this;
      const { value, label } = item;
      const childNodes = dataItemContent && (typeof dataItemContent === 'function' ? dataItemContent(h, item, index) : h(dataItemContent, { props: { item, index } }));
      return isItemNeedFixed
        ? h(childField, { props: { label: value } }, childNodes ? [childNodes] : [label])
        : h(childField, { props: item }, [childNodes]);
    }
  },
  render (h) {
    const { field: { component: Field, data, scopedSlots }, fieldVDO, dataChildren, slotChildren } = this;
    if (!Field) return;
    return (
      <Field {...fieldVDO} value={this.fieldValue} scopedSlots={scopedSlots}>
        {dataChildren}
        {slotChildren}
      </Field>
    );
  }
}

