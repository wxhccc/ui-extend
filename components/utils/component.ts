import { App, PropType } from 'vue'
import refMethodsProxyMixin from './mixins/ref-fn-proxy'
import { AnyFunction } from './types'

export function getPublicMethodNames(...components: UE.Component[]) {
  return components.reduce(
    (acc: string[], cur) =>
      cur && Array.isArray(cur.$_ue_methods) ? acc.concat(cur.$_ue_methods) : acc,
    []
  )
}

export function resolveProps<T extends Record<string, any> = Record<string, any>>(
  props: T | AnyFunction<T>,
  ...args: typeof props extends AnyFunction<T> ? Parameters<typeof props> : any[]
) {
  return props instanceof Function ? props(...args) : props
}

export const defaultProp = <T>(type: unknown, value?: unknown) => ({
  type: type as PropType<T>,
  default: value
})

export function getComponentFnProxy(component: UE.Component, ref: string) {
  return refMethodsProxyMixin(ref || component.name, component.$_ue_methods)
}

export const wrapperInstall = (component: UE.UnpluginComponent) => {
  const c = component as any
  c.install = function (app: App) {
    app.component(component.name, component)
  }
  return c as UE.Component
}
