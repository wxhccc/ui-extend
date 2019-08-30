import { FormItem, Row, Col } from 'UE/ui-comps';
import CommomField from 'Comps/common-field';
import slotsHandlerMixin from 'UE/mixins/slots-handler';
import refFnProxyMixin from 'UE/mixins/ref-fn-proxy';
import { resolveProps } from 'UE/utils/component';

export default {
  name: 'UeFormFieldItem',
  mixins: [slotsHandlerMixin, refFnProxyMixin('formItem', ['resetField', 'clearValidate'])],
  props: {
    value: null,
    props: [Object, Function],
    prop: [String, Number],
    prevProp: Array,
    text: [Boolean, String, Function],
    slots: Object,
    scopedSlots: Object,
    field: {
      type: Object,
      default: () => ({})
    },
    children: Array
  },
  computed: {
    handleValue: {
      get () {
        return this.hasChild
          ? (typeof this.value === 'object' ? this.value : {})
          : this.value;
      },
      set (val) { this.$emit('input', val) }
    },
    hasChild () {
      return Array.isArray(this.children) && this.children.length > 0;
    },
    formItemProp () {
      return this.handleFormItemProp(this.prop, this.prevProp);
    },
    formItemProps () {
      return resolveProps(this.props);
    },
    formItemSlots () {
      return this.$_mixin_slotsToVNode(this.slots, this.formItemProps.props, ['label', 'default']);
    },
    handledItemText () {
      const { prop, text, handleValue } = this;
      return this.handleItemText(text, prop, handleValue);
    },
    handledFieldContent () {
      const { prop, field, hasChild, children } = this;
      if (!field) return;
      return hasChild ? this.handleMultItems(children) : this.handleFormItemField(prop, field);
    },
    formItemContent () {
      if (this.text) return this.handledItemText;
      return this.handledFieldContent;
    }
  },
  methods: {
    handleValueChange (value, prop) {
      const newValue = this.hasChild ? { ...this.handleValue, [prop]: value } : value;
      this.$emit('input', newValue);
    },
    handleFormItemProp (prop = '', prevProp) {
      return Array.isArray(prevProp) ? prevProp.concat([prop]).join('.') : prop;
    },
    handleItemText (text, prop, value) {
      return typeof text === 'function'
        ? text(value, prop)
        : (typeof text !== 'boolean' ? text : value);
    },
    handleChildItemContent (item) {
      const { text, prop, handleValue, field } = item;
      if (text) return this.handleItemText(text, prop, handleValue[prop]);
      return this.handleFormItemField(prop, field);
    },
    handleFormItemField (prop, field) {
      const value = this.hasChild ? this.handleValue[prop] : this.handleValue;
      return (
        <CommomField class="ue-form-field" field={field} value={value} onInput={val => this.handleValueChange(val, prop)}>
        </CommomField>
      );
    },
    getChildFormItemVDO (child) {
      const { prop, props, scopedSlots } = child;
      const prevProp = Array.isArray(this.prevProp) ? this.prevProp.concat([this.prop]) : [this.prop];
      let vdo = resolveProps(props, null, { scopedSlots, ref: prop });
      vdo.props.prop = this.handleFormItemProp(prop, prevProp);
      return vdo;
    },
    handleMultItems (children) {
      const span = 24 / children.length;
      return (
        <Row type="flex" gutter={20}>
          {children.map((child, idx) => {
            const { key, prop, colProps, fields, slots } = child;
            const colKey = key || prop || idx;
            const colVdo = colProps ? resolveProps(colProps) : { props: { span } };
            const formItemVDO = this.getChildFormItemVDO(child);
            const formItemSlots = this.$_mixin_slotsToVNode(slots,  ['label', 'default']);
            const formItemContent = this.handleChildItemContent(child);
            return (
              <Col class="ue-sub-item-panel" {...colVdo} key={colKey}>
                <FormItem {...formItemVDO}>
                  {formItemContent}
                  {formItemSlots}
                </FormItem>
              </Col>
            );
          })}
        </Row>
      );
    }
  },
  render (h) {
    const { formItemProp, formItemProps, scopedSlots } = this;
    return (
      <FormItem class="ue-form-field-item" ref="formItem" {...formItemProps} prop={formItemProp} scopedSlots={scopedSlots}>
        {this.formItemContent}
        {this.formItemSlots}
      </FormItem>
    );
  }
}
