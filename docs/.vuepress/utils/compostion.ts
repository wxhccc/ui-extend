import { computed } from 'vue'
import { useRoute } from 'vue-router'

export function useComponentName() {
  return computed(() => {
    const { path } = useRoute()
    return path.indexOf('/component/') >= 0 ? (path.split('/').pop() as string).split('.').shift() as string : ''
  })
}