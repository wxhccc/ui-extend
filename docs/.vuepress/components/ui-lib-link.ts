
import { h, defineComponent } from 'vue'
import { version } from 'element-plus'

export default defineComponent({
  name: 'UiLibLink',
  props: {
    component: String
  },
  setup(props) {

    const docVersion = version.split('.').slice(0, 2).join('.');
    const href = `https://element.eleme.cn/${docVersion}/#/zh-CN/component/${props.component}`;
    return () => h('a', { attrs: { href, target: '_blank' } }, [
      `${props.component}(Element)`
    ])
  }
})
