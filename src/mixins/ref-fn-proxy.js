export default function (refKey, methodNames = [], includePrivate = false) {
  let methods = {};
  methodNames.forEach(name => {
    if (!includePrivate && name.indexOf('$_UE_') === 0) return;
    methods[name] = function(...args) {
      this.$refs[refKey] && typeof this.$refs[refKey][name] === 'function' && this.$refs[refKey][name](...args)
    }
  })
  return { methods };
}

export function pluginFnProxyMixin (instanceKey, methodNames = []) {
  let methods = {};
  methodNames.forEach(name => {
    methods[name] = function(...args) {
      this[instanceKey] && typeof this[instanceKey][name] === 'function' && this[instanceKey][name](...args);
    }
  })
  return { methods };
}
