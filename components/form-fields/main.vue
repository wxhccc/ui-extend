<template>
  <div class="ue-form-fields">
    <template v-for="(item, index) of handledItems" >
      <component
        v-if="item.component"
        :is="item.component"
        :ref="item.prop || item.key"
        v-bind="getCustomItemProps(item)"
        v-on="item.fieldEvents"
        :value="getValue(item.prop)"
        @input="setValue(item.prop, $event)"
        :key="getItemKey(item, index)"
      >
      </component>
      <ue-form-field-item
        v-else
        :ref="item.prop || item.key"
        v-bind="getFormFieldProps(item)"
        :value="getValue(item.prop)"
        @input="setValue(item.prop, $event)"
        :key="getItemKey(item, index)"
      >
      </ue-form-field-item>
    </template>
    <slot></slot>
  </div>
</template>

<script>
import FormFieldItem from 'Comps/form-field-item';
import { cloneDeep, pick } from 'UE/utils/lodash';

const { hasOwnProperty } = Object.prototype;
const formFieldItemProps = Object.keys(FormFieldItem.props);

export default {
  name: 'UeFormFields',
  components: {
    [FormFieldItem.name]: FormFieldItem
  },
  props: {
    items: {
      type: Array,
      default: () => ([])
    },
    value: {
      type: Object,
      default: () => ({})
    },
    delayUpdate: Boolean
  },
  data () {
    return {
      cacheValue: {},
      handledItems: this.handleFormItems()
    }
  },
  created () {
    this.watchModel();
    this.resetFieldData();
  },
  watch: {
    items () {
      this.handledItems = this.handleFormItems();
      this.watchModel();
      this.resetFieldData();
    }
  },
  $_ue_methods: ['callItemMethod'],
  methods: {
    /** public methods **/
    callItemMethod (prop, fnName, ...args) {
      this.$refs[prop] && this.$refs[prop][0] && (typeof this.$refs[prop][0][fnName] === 'function') && this.$refs[prop][0][fnName](...args);
    },
    /** utils **/
    getValue (prop) {
      return prop ? this.value[prop] : this.value;
    },
    setValue (prop, value) {
      const newValue = Object.assign({}, this.value, prop ? { [prop]: value } : value);
      this.delayUpdate ? this.setValueDelay(prop, value) : this.$emit('input', newValue);
    },
    setValueDelay (prop, value) {
      setTimeout(() => {
        this.cacheValue = Object.assign({}, this.value, prop ? { [prop]: value } : value);
        this.$emit('input', this.cacheValue);
        this.cacheValue = {};
      }, 0)
    },
    handleFormItems () {
      return cloneDeep(this.items.filter(item => (typeof item.hide === 'function' ? !item.hide() : !item.hide)));
    },
    getItemKey (item, index) {
      return item.key || item.prop || index;
    },
    getCustomItemProps (item) {
      const { props, cascadeData, cascaderHandler } = item;
      const handledProps = typeof props === 'function' ? props() : props;
      return Object.assign({}, handledProps, { cascadeData });
    },
    getFormFieldProps (item) {
      return pick(item, formFieldItemProps);
    },
    // model值动态watch
    watchModel () {
      this.handledItems.forEach(item => {
        item.cascadeModel && this.listenCascader(item);
      })
    },
    initCascaderFields () {
      this.handledItems.forEach(item => {
        item.__watchers && item.__watchers.forEach(watcher => watcher(this.value[item.prop], true));
      });
    },
    changeHandler (item, value) {
      const { __watchers } = item;
      Array.isArray(__watchers) && __watchers.forEach(watcher => watcher(value));
    },
    resetFieldData () {
      this.handledItems.forEach(item => {
        const { cascadeModel } = item;
        cascadeModel && hasOwnProperty.call(this.value, cascadeModel) && this.cascaderHandler(item, this.value[cascadeModel], true);
      })
    },
    cascaderHandler (item, value, init) {
      const { field, cascadeData, spliceStart, clearValue, prop, cascadeHandler } = item;
      const modelData = cascadeData && Array.isArray(cascadeData[value]) ? cascadeData[value] : [];
      if (typeof cascadeHandler === 'function') {
        cascadeHandler.call(this, value, prop, modelData, item);
      } else if (field) {
        let { data } = field;
        Array.isArray(data) ? data.splice(spliceStart || 0, data.length, ...modelData) : this.$set(field, 'data', modelData);
      }
      if (!init && prop && hasOwnProperty.call(this.value, prop)) {
        this.setValueDelay(prop, clearValue);
        this.changeHandler(item, this.value[prop]);
      }
    },
    // 级联数据项监听器
    listenCascader (item) {
      const { cascadeModel } = item;
      const cascaderField = this.handledItems.find(item => (item.prop === cascadeModel));
      if (!cascaderField) return;
      const changeListener = { change: this.changeHandler.bind(this, cascaderField) }
      if (cascaderField.component) {
        cascaderField.fieldEvents = Object.assign({}, cascaderField.fieldEvents, changeListener);
      } else {
        !cascaderField.field && (cascaderField.field = {});
        cascaderField.field.events = Object.assign({}, cascaderField.field.events, changeListener);
      }
      !cascaderField.__watchers && (cascaderField.__watchers = []);
      cascaderField.__watchers.push(this.cascaderHandler.bind(this, item));
    }
  }
}
</script>
