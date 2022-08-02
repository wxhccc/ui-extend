import { onMounted, Ref, watch, onBeforeUnmount } from 'vue'
import { createRAFTimer, TimerCallback, TimerInstance } from '@wxhccc/es-util'
import { CompStorage } from '@/utils/storage'
import { IOCallback, useIntersectionObserver } from './observers'

export * from './observers'

export type LazyLoadMode = 'none' | 'static' | 'dynamic'
/**
 * 对给定容器内的媒体元素绑定懒加载逻辑
 * @param root
 * @param selector
 */
export const useMediaLazyLoad = (
  root: Ref<undefined | Element>,
  mode: Ref<LazyLoadMode>,
  selector?: string
) => {
  const callback: IOCallback = (entry) => {
    const { target, intersectionRatio } = entry
    if (intersectionRatio <= 0) {
      return
    }
    const src = target.getAttribute('data-src')
    const curSrc = target.getAttribute('src')
    if (src && src !== curSrc) {
      target.setAttribute('src', src)
    }
  }

  const { startObserve, observe, unobserve, disconnect } = useIntersectionObserver(callback)

  const lazyObserve = (target: undefined | string | Element = selector) =>
    window.setTimeout(() => observe(target))

  onMounted(() => {
    if (mode.value !== 'none') {
      startObserve(root ? root.value : null)
    }
    if (mode.value === 'static' && selector) {
      lazyObserve(selector)
    }
  })

  watch(mode, (value) => {
    if (value === 'static') {
      lazyObserve(selector)
    } else if (value === 'none') {
      disconnect()
    }
  })

  return { startObserve, lazyObserve, unobserve, disconnect }
}

export type MediaLazyObserver = ReturnType<typeof useMediaLazyLoad>

let globalTimer: TimerInstance

export const getGlobalTimer = () => {
  if (!globalTimer) {
    globalTimer = createRAFTimer()
  }
  return globalTimer
}

/** 使用requestAnimationFrame实现的任务计时器 */
export const useRAFTimer = () => {
  const timer = getGlobalTimer()
  const localTasks: TimerCallback[] = []

  /**
   * 添加一个只执行一次的延迟任务，等同于window.setTimeout
   * @param callback 回调函数
   * @param interval 延迟时间
   */
  const addOnceTask = (callback: TimerCallback, interval: number) => {
    timer.addTask(callback, interval, 1)
  }
  /** 添加钩子所在组件生命周期内的任务，在组件销毁时会自动移除任务 */
  const addLoclTask: TimerInstance['addTask'] = (...args) => {
    const [callback] = args
    if (callback instanceof Function) {
      timer.addTask(...args)
      localTasks.push(args[0])
    }
  }

  onBeforeUnmount(() => {
    localTasks.forEach((task) => timer.removeTask(task))
  })
  return { timer, addOnceTask, addLoclTask }
}

export function useStorage(componentName: string) {
  const storage = CompStorage(componentName)

  return (module: string, key: string, value?: unknown, clearKey?: boolean) => {
    if (typeof module !== 'string') {
      return
    }
    const data = storage.session(module) || {}
    if (typeof value !== 'undefined' || clearKey) {
      clearKey ? delete data[key] : (data[key] = value)
      storage.session(module, data)
    } else {
      return data[key]
    }
  }
}
