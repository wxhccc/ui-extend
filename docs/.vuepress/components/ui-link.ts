import { defineComponent, h } from 'vue'


export default defineComponent({
  name: 'UiLink',
  props: {
    component: {
      type: String
    }
  },
  setup (props) {
    // const { props: { component }, parent: { $elVersion } } = context
    // if (!$elVersion) return '';
    // const docVersion = $elVersion.split('.').slice(0, 2).join('.');
    // const href = `https://element.eleme.cn/${docVersion}/#/zh-CN/component/${component}`;
    // return h('a', { attrs: { href, target: '_blank' } }, [
    //   `${component}(Element)`
    // ])
    return props.component
  }
})
