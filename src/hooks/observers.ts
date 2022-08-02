import { computed, onBeforeUnmount, onMounted, Ref, ref, shallowRef, watch } from 'vue'
import { eventTargetEmitter } from '@wxhccc/es-util'
import { debounce } from 'lodash-es'

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
export const useResizeObserve = (
  root: Ref<undefined | Element>,
  active?: Ref<boolean>,
  callback?: (size: Size) => void
) => {
  const size = ref<Size>({ width: 0, height: 0 })
  const observer = shallowRef<ResizeObserver>()
  const nextFrameCallback = computed(() => (callback ? debounce(callback, 50) : undefined))

  const sizeChangeWatcher = (entries: ResizeObserverEntry[]) => {
    const [el] = entries
    const { width = -1, height = -1 } = el ? el.contentRect : ({} as Size)
    if (width > 0 && height > 0 && nextFrameCallback.value) {
      nextFrameCallback.value({ width, height })
    }
  }

  // 获取容器的尺寸
  const getSize = () => {
    if (root.value) {
      size.value = { width: root.value.clientWidth, height: root.value.clientHeight }
    }
  }

  onMounted(() => {
    if ((!active || active.value) && root.value) {
      observer.value = new ResizeObserver(sizeChangeWatcher)
      observer.value.observe(root.value)
      getSize()
    }
  })

  watch(
    () => active?.value,
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

  return { size }
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
