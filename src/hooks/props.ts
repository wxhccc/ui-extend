import { ref, watch, computed } from 'vue'

export const useIgnoreWatch = (...args: Parameters<typeof watch>) => {
  const ignoreWatch = ref(false)
  const [source, cb, ...rest] = args

  watch(
    source,
    (...watchArgs) => {
      if (ignoreWatch.value) {
        ignoreWatch.value = false
        return
      }
      cb(...watchArgs)
    },
    ...rest
  )
  return { ignoreWatch }
}

export const useVModel = <P extends AnyObject, K extends Extract<keyof P, string>>(
  props: P,
  key: K,
  emit: (name: `update:${K}`, value?: P[K]) => void,
  options?: {
    beforeEmit?: AnyFunction<void>
    supportInner?: boolean
  }
) => {
  const { beforeEmit, supportInner } = { ...options }
  const innerValue = ref<P[K]>()

  return computed({
    get: () => (typeof props[key] !== undefined ? props[key] : innerValue.value),
    set: (value) => {
      if (supportInner) {
        innerValue.value = value
      }
      if (beforeEmit instanceof Function) {
        beforeEmit(value)
      }
      emit(`update:${key}`, value)
    }
  })
}
