<template>
  <div class="ue-action-btns">
    <ue-button
      v-for="(item, index) of handleBtns"
      class="ue-action-btn"
      v-bind="propHanlde(item.props, item)"
      :type="propHanlde(item.btype, item)"
      @click="btnsClick(item)"
      :loading="loadingFlags[getLoadingKey(item, index)]"
      :key="item.btnKey || index"
    >
      {{
        propHanlde(loadingFlags[getLoadingKey(item, index)] && item.loadingText ? item.loadingText : item.text, item)
      }}
    </ue-button>
  </div>
</template>

<script>
import { Button, MessageBox } from 'UE/ui-comps'
export default {
  name: 'UeActionBtns',
  components: {
    'UeButton': Button
  },
  props: {
    data: null,
    extraArgs: {
      type: Array,
      default: () => ([])
    },
    loadingFlags: {
      type: Object,
      default: () => ({})
    },
    btns: {
      type: Array,
      default: () => ([])
    }
  },
  computed: {
    handleBtns () {
      return this.btns.filter(item => (!this.propHanlde(item.hide, item)));
    }
  },
  methods: {
    /** utils **/
    getLoadingKey (item, index) {
      return item.loadingKey || item.btnKey || `__btn${index}loading`;
    },
    propHanlde (prop, item) {
      return typeof prop === 'function' ? prop(this.data, item, ...this.extraArgs) : prop;
    },
    /** logic methods **/
    /** event handle **/
    btnsClick (item) {
      if (typeof item.click !== 'function') return;
      const { data, extraArgs } = this;
      if (item.isConfirm) {
        const confirmMsg = this.propHanlde(item.confirmMsg, item);
        MessageBox.confirm(confirmMsg || '确定执行此操作?', '系统提示', {
          type: 'warning'
        }).then(() => {
          item.click(data, item, ...extraArgs);
        }).catch((e) => {});
      } else {
        item.click(data, item, ...extraArgs);
      }
    }
  }
}
</script>
