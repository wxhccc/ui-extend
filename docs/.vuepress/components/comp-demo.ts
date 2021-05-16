import { defineComponent, computed, h, resolveComponent, DefineComponent } from 'vue'
import { useComponentName } from '../utils/compostion'

export default defineComponent({
  name: 'CompDemo',
  props: {
    name: {
      type: String,
      default: 'Base'
    }
  },
  setup(props, { slots }) {
    const compName = useComponentName()
    const componentName = computed(() => `demo-${compName.value}-${props.name}`)
    
    const Source =  resolveComponent(componentName.value)
    const childSlots = {
      source: () => h(Source),
      ...(slots.default ? { highlight: slots.default } : {}),
      ...(slots.description ? { description: slots.description }: {})
    }
    
    const DemoBlock = resolveComponent('demo-block') as DefineComponent

    return () => h(DemoBlock, { class: ['component-demo-block', `${componentName.value}-demo`] }, childSlots)
  }
})

