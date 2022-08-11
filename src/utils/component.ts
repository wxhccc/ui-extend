import { PropType } from 'vue'
import { FORM_ITEM_NAME } from './const'

export function resolveProps<T extends Record<string, any> = Record<string, any>>(
  props: T | AnyFunction<T>,
  ...args: typeof props extends AnyFunction<T> ? Parameters<typeof props> : any[]
) {
  return props instanceof Function ? props(...args) : props
}
type BaseType = number | string | boolean | symbol

export const vueTypeProp = <T>(
  type: unknown,
  value?: T extends BaseType ? T : AnyFunction<T>,
  required?: boolean
) => ({
  type: type as PropType<T>,
  default: value,
  ...(required ? { required: true } : {})
})

export const getFormItemName = <T extends { name?: NamePath; prop?: NamePath }>(item: T) => {
  return item[FORM_ITEM_NAME]
}
