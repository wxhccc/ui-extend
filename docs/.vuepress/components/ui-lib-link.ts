import { h, defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'UiLibLink',
  props: {
    component: String,
    lib: String
  },
  setup(props) {
    
    const linkInfo = computed(() => {
      const [, defLib] = window.location.href.match(/\/ui-extend\/([\w|-]+)\//) || []
      const { lib, component } = props
      const libName = lib || defLib
      const result = { href: '', text: '' }

      switch (libName) {
        case 'antd-vue':
          result.href = `https://www.antdv.com/components/${props.component}-cn`
          result.text = `${component}${lib ? '(ant-design-vue)' : ''}`
          break
        case 'element':
          result.href = `https://element-plus.gitee.io/zh-CN/component/${props.component}`
          result.text = `${component}${lib ? '(element-plus)' : ''}`
          break
        default:
          break
      }
      return result
    })

    return () => h('a', { href: linkInfo.value.href, target: '_blank' }, linkInfo.value.text)
  }
})
