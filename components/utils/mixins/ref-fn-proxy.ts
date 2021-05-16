import { ComponentPublicInstance } from 'vue'

export default function (
  refKey: string,
  methodNames: string[] = [],
  includePrivate = false
) {
  const methods: Record<string, () => unknown> = {}
  methodNames.forEach(name => {
    if (!includePrivate && name.indexOf('$_UE_') === 0) return
    methods[name] = function (this: ComponentPublicInstance, ...args) {
      const refComps = this.$refs[refKey] as ComponentPublicInstance | undefined
      refComps &&
        refComps[name as keyof typeof refComps] === 'function' &&
        refComps[name as keyof typeof refComps](...args)
    }
  })
  return { methods }
}

export function pluginMethodsProxyMixin(
  instanceKey: string,
  methodNames: string[] = []
) {
  const methods: Record<string, () => unknown> = {}
  methodNames.forEach(name => {
    methods[name] = function (this: any, ...args) {
      this[instanceKey] &&
        typeof this[instanceKey][name] === 'function' &&
        this[instanceKey][name](...args)
    }
  })
  return { methods }
}
