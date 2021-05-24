import { ComponentPublicInstance, Ref } from 'vue'
import { UEStorage } from './storage'
import { AnyFunction, AnyObject } from './types'

export function useStorage(componentName: string) {
  const storage = UEStorage(componentName)

  const $_storeSession = (module: string, key: string, value?: unknown, clearKey?: boolean) => {
    if (typeof module !== 'string') return
    const data = storage.session(module) || {}
    if (typeof value !== 'undefined' || clearKey) {
      clearKey ? delete data[key] : (data[key] = value)
      storage.session(module, data)
    } else {
      return data[key]
    }
  }
  return { $_storeSession }
}

export const useProxyInstanceMethods = <
  C extends ComponentPublicInstance = ComponentPublicInstance
>(
  instanceRef: Ref<C>,
  methodNames: string[] = [],
  includePrivate = false
) => {
  const methods: Record<string, AnyFunction<any>> = {}
  methodNames.forEach(name => {
    if (!includePrivate && name.startsWith('$_UE_')) return
    methods[name] = (...args) => {
      if (!instanceRef.value) return
      const method = instanceRef.value[name as keyof C]
      return method instanceof Function ? method(...args) : undefined
    }
  })
  return methods
}

export function useProxyPluginMethods<T = AnyObject, K extends keyof T = keyof T>(
  instance: Ref<T | undefined>,
  methodNames: K[] = []
) {
  const methods = {} as Record<K, AnyFunction<any>>
  methodNames.forEach(name => {
    methods[name] = (...args) => {
      if (!instance.value) return
      const method = instance.value[name as K]
      return method instanceof Function && method.call(instance.value, ...args)
    }
  })
  return methods
}
