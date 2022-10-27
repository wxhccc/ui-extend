import { computed, onBeforeUnmount, onMounted, Ref, ref, shallowRef, unref, watch } from 'vue'
import { eventTargetEmitter } from '@wxhccc/es-util'
import { debounce, isFunction } from 'lodash-es'

export type MayBeRef<T> = T | Ref<T>

export interface IOCallback {
  (entry: IntersectionObserverEntry): any
}
/**
 * 监听元素在指定元素或页面内的可见状态
 * @param callback
 * @param options
 * @returns
 */
export const useIntersectionObserver = (
  callback: IOCallback,
  options?: IntersectionObserverInit
) => {
  const observer = shallowRef<IntersectionObserver>()

  const handleOptions = computed(() => {
    return { rootMargin: '0px', ...options }
  })

  const obsCallback: IntersectionObserverCallback = (entries) => {
    entries.forEach(callback)
  }

  const startObserve = (root: IntersectionObserverInit['root']) => {
    observer.value = new IntersectionObserver(obsCallback, { ...handleOptions.value, root })
  }

  let eles = [] as unknown as NodeListOf<Element>
  const observe = (target?: string | Element) => {
    if (!observer.value || !target) {
      return
    }
    if (typeof target === 'string') {
      if (!observer.value.root) {
        return
      }

      if (eles.length) {
        eles.forEach((item) => observer.value?.unobserve(item))
        return
      }
      eles = observer.value.root.querySelectorAll(target)
      eles.forEach((item) => observe(item))
      return
    }
    if (target) {
      observer.value.observe(target)
    }
  }

  const unobserve = (source: Element) => {
    if (!observer.value) {
      return
    }
    observer.value.unobserve(source)
  }

  const disconnect = () => {
    if (!observer.value) {
      return
    }
    observer.value.disconnect()
  }

  return { instance: observer, startObserve, observe, unobserve, disconnect }
}
/**
 * 监听容器尺寸变化
 * @param root 待监听的dom元素的ref对象
 * @param active 监听状态是否激活，
 * @param callback 尺寸变化时的回调函数
 * @returns
 */
export const useResizeObserver = (
  root: Ref<Element | undefined>,
  active?: MayBeRef<boolean>,
  callback?: (size: Size, entries?: ResizeObserverEntry[]) => void
) => {
  const size = ref<Required<Size>>({ width: 0, height: 0 })
  const observer = shallowRef<ResizeObserver>()
  const isActive = computed(() => unref(active))

  // 获取容器的尺寸
  const resetSize = () => {
    // 设置初始尺寸
    const { offsetWidth: width = 0, offsetHeight: height = 0 } = (root.value || {}) as HTMLElement
    if (width && height) {
      size.value = { width, height }
    }
  }

  const onContainerResize = (entries: ResizeObserverEntry[]) => {
    const entry = entries[0]
    const { width = 0, height = 0 } = entry.contentRect
    // 元素隐藏时可能会得到两个0值，此时不更新
    if (width || height) {
      size.value = { width, height }
    }
    if (isFunction(callback)) {
      callback(size.value, entries)
    }
  }

  const initResizeObserver = () => {
    if (!root.value) {
      return
    }
    try {
      const callback = debounce(onContainerResize, 20)
      observer.value = new ResizeObserver(callback)
      observer.value.observe(root.value)
    } catch (e) {
      console.log('resizeObserver not supports', e)
    }
  }

  watch(root, (value) => {
    if (value && isActive.value && !observer.value) {
      resetSize()
      initResizeObserver()
    }
  }, { immediate: true })

  watch(
    isActive,
    (newVal) => {
      if (!root.value || !observer.value) {
        return
      }
      if (newVal) {
        observer.value.observe(root.value)
      } else {
        observer.value.unobserve(root.value)
      }
    }
  )

  onMounted(resetSize)

  onBeforeUnmount(() => {
    if (observer.value && root.value) {
      observer.value.unobserve(root.value)
      observer.value = undefined
    }
  })

  return { size, resetSize }
}

let visibilityOberser: ReturnType<typeof eventTargetEmitter>
/**
 * 注册页面显隐监听事件
 */
export const useVisibilityChange = (limitFrom?: string) => {
  if (!visibilityOberser) {
    visibilityOberser = eventTargetEmitter({ name: 'pageVisibilityOberser' })
    const { emit } = visibilityOberser
    document.addEventListener('visibilitychange', () => {
      const state = document.visibilityState
      emit(state)
      emit('change', state === 'visible')
    })
  }

  const { on, off } = visibilityOberser

  const namespace = `${+new Date()}${Math.random() * 100000000}`

  const nsOn = (event: 'visible' | 'hidden' | 'change', listener: (state?: boolean) => any) => {
    on(event, listener, { limitFrom, namespace })
  }
  const nsOff = (event: 'visible' | 'hidden' | 'change', listener: (state?: boolean) => any) => {
    off(event, listener, { limitFrom, namespace })
  }

  onBeforeUnmount(() => {
    off('', undefined, { namespace })
  })
  return { nsOn, nsOff }
}
