import { PropType, Prop } from 'vue'
import { isFunction, mapKeys, camelCase } from 'lodash-es'

export function resolveProps<T extends Record<string, any> = Record<string, any>>(
  props: T | AnyFunction<T>,
  ...args: typeof props extends AnyFunction<T> ? Parameters<typeof props> : any[]
) {
  return isFunction(props) ? props(...args) : props
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

export const attrsToProps = <T extends AnyObject = AnyObject>(attrs: AnyObject) => mapKeys(attrs, (_v, key) => {
  if (!key.includes(':')) {
    return camelCase(key)
  }
  const [onStr, prop] = key.split(':')
  return `${onStr}:${camelCase(prop)}`
}) as Partial<T>

export type PropsTypeToDefine<Props> = Required<{ [K in keyof Props]: Prop<Props[K]> }>