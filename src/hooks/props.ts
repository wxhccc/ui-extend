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

export const useVModel = <
  P extends AnyObject,
  K extends Extract<keyof P, string>,
  E extends (name: `update:${K}`, value?: P[K]) => void
>(
  props: P,
  key: K,
  emit?: E,
  options?: {
    noEmit?: boolean
    beforeEmit?: AnyFunction<void>
    supportInner?: boolean
    initValue?: P[K]
  }
) => {
  const { beforeEmit, supportInner, initValue, noEmit } = { ...options }
  const innerValue = ref<P[K]>()

  if (initValue) {
    innerValue.value = initValue
  }

  return computed({
    get: () => (props && typeof props[key] !== undefined ? props[key] : innerValue.value),
    set: (value) => {
      if (supportInner) {
        innerValue.value = value
      }
      if (beforeEmit instanceof Function) {
        beforeEmit(value)
      }
      if (!noEmit && emit) {
        emit(`update:${key}`, value)
      }
    }
  })
}
