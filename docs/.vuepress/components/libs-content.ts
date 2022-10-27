import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LibsContent',
  setup(props, { slots }) {
    return () => {
      const slot = slots[__CURRENT_LIB__]
      return typeof slot === 'function' ? slot() : null
    }
  }
})
