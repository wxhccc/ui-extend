import { ComponentInternalInstance, defineComponent, getCurrentInstance, h } from 'vue'

export default defineComponent({
  name: 'UiLink',
  props: {
    component: {
      type: String
    }
  },

  render () {
    if (!this.$uiVersion) return this.component;
    const docVersion = this.$uiVersion.split('.').slice(0, 2).join('.');
    const href = `https://element.eleme.cn/${docVersion}/#/zh-CN/component/${this.component}`;
    return h('a', { attrs: { href, target: '_blank' } }, [
      `${this.component}(Element)`
    ])
  }
})
