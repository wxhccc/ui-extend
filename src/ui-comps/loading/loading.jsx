import Vue from 'vue';
import { Loading } from 'element-ui';

export default {
  name: 'UeLoading',
  props: {
    body: Boolean,
    text: String,
    spinner: String,
    lock: Boolean,
    background: String
  },
  data () {
    return {
      $loadingInstance: null
    }
  },
  created () {
    const { body, _props } = this;
    this.$loadingInstance = Loading.service({
      target: body ? document.body : this.$parent.$el,
      ..._props
    });
  },
  beforeDestroy () {
    this.$loadingInstance.close();
  },
  render (h) {
    return ''
  }
}
