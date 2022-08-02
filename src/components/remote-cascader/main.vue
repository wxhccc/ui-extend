<template>
  <ue-cascader
    :options="options"
    v-model="handleValue"
    v-bind="$attrs"
    v-on="listeners"
    :props="props"
    :disabled="initLoading"
  ></ue-cascader>
</template>
<script>
import { Cascader } from "UE/ui-comps";
export default {
  name: "UeRemoteCascader",
  components: {
    UeCascader: Cascader
  },
  props: {
    load: {
      type: Function,
      required: true
    },
    value: {
      type: Array,
      default: () => []
    },
    initFirstChange: Boolean,
    initValue: Array,
    initInOrder: Boolean,
    isResolve: Boolean
  },
  data() {
    return {
      rootFetch: null,
      initLoading: false,
      options: [],
      listeners: Object.assign({}, this.$listeners, (!this.isResolve ? { 'active-item-change': this.handleItemChange } : {}), { change: this.getFullValue })
    };
  },
  created() {
    this.initFirstChange && this.$once('value-init', this.fetchInitValue);
    !this.isResolve && (this.value.length ? this.fetchInitValue(this.value) : this.handleItemChange(this.value));
  },
  computed: {
    handleValue: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      }
    },
    props () {
      return Object.assign({ value: 'value', label: 'label', children: 'children' }, this.$attrs.props, this.isResolve ? { lazy: true, lazyLoad: this.lazyLoad } : {});
    }
  },
  watch: {
    value (newVal) {
      this.$emit('value-init', newVal)
    },
    initValue (newVal) {
      if (Array.isArray(newVal)) {
        this.fetchInitValue(newVal);
        this.handleValue = newVal;
      }
    }
  },
  methods: {
    async handleItemChange (value) {
      !this.options.length && (this.options = await this.getRootList());
      let lastItem = this.options;
      const { value: valueProp, label, children } = this.props;
      if (Array.isArray(value)) {
        for (let i = 0; i < value.length; i++) {
          const val = value[i];
          let curItem = lastItem && lastItem.find(item => item[valueProp] === val);
          curItem && curItem[children] && !curItem[children].length && (curItem[children] = await this.fetchReturnHandle(i + 1, val, value, curItem));
          lastItem = curItem && curItem[children];
        }
      }
    },
    getRootList () {
      this.rootFetch = this.fetchReturnHandle(0);
      return this.rootFetch;
    },
    async lazyLoad (node, resolve) {
      const { level, value, path, data } = node;
      const result = await this.fetchReturnHandle(level, value, path, data, node);
      resolve(Array.isArray(result) ? result : [])
    },
    async fetchReturnHandle (...args) {
      const value = await this.load(...args);
      return Array.isArray(value) ? value : [];
    },
    fetchInitValue (originValues) {
      const values = originValues.slice(0);
      if (!Array.isArray(values) || !values.length) return;
      if (this.isResolve) {
        this.initLoading = true;
      }
      if (this.initInOrder) {
        this.handleItemChange(values).finally(this.resoveReady);
      } else {
        this.fetchAtSomeTime(values)
      }
    },
    fetchAtSomeTime (values) {
      const fetchQueue = values.map((val, index) => {
        return index === 0 && this.rootFetch ? this.rootFetch : this.fetchReturnHandle(index, val, values)
      });
      return Promise.all(fetchQueue).then(results => {
        const { value, label, children } = this.props;
        !this.options.length && Array.isArray(results[0]) && (this.options = results[0]);
        let parentNode = this.options;
        values.forEach((val, index) => {
          const curNode = parentNode.find(item => item[value] === val)
          curNode &&
            curNode[children] &&
            !curNode[children].length &&
            results[index + 1] &&
            (curNode[children] = results[index + 1]);
          parentNode = curNode && curNode[children];
        });
      }).catch(() => {}).finally(this.resoveReady)
    },
    resoveReady () {
      this.initLoading = false;
    },
    getFullValue (value) {
      this.$emit('change', value);
      let lastItem = this.options;
      const fullValues = value.map((val, index) => {
        const curItem = lastItem.find(item => item.value === val);
        lastItem = curItem ? curItem.children : [];
        return curItem;
      });
      this.$emit("on-change", fullValues);
    },
    modifyOptions (handler) {
      typeof handler === 'function' && handler(this.options);
    }
  }
};
</script>
