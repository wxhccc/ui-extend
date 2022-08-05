import { isRef, Ref } from 'vue'
import { LockRefHandle, wp, WpOptions } from '@wxhccc/es-util'
import { isFunction, mergeWith } from 'lodash-es'

export * from './formatter'

/***
 ** 动态加载远程js脚本
 * {string} url 远程js脚本地址
 ** 返回值: promise 对象
 ***/
export function loadjs(url: string) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = url
    document.body.appendChild(script)
    script.onload = resolve
    script.onerror = reject
  })
}

/**
 * 解析可能是函数形式的变量的数据
 * @param value 变量
 * @param args 可能的参数
 * @returns 返回数据
 */
export function resolveFunctional<R, F extends AnyFunction<R> = AnyFunction<R>>(
  value: R | F,
  ...args: Parameters<F>
): R {
  return isFunction(value) ? value(...args) : value
}

/**
 * wrapPromise 包裹promise对象
 * @param promise
 * @param lock
 * @returns
 */
export function vwp<T>(promise: Promise<T>, lock?: WpOptions['lock'] | Ref<boolean>) {
  const handleLock = isRef(lock) ? ([lock, 'value'] as unknown as LockRefHandle) : lock
  return wp(promise, { wrap: true, lock: handleLock })
}

export type VueWrapPromise = typeof vwp

/***
 ** 使用lodash的mergeWith合并对象,规则为数组自动拼接
 * {object list} args 需要合并的对象序列或数组
 ** 返回值: {object} 合并后的新对象
 ***/
export function mergeObj(...args: Parameters<typeof mergeWith>) {
  return mergeWith(...args, (objValue: unknown, srcValue: unknown) => {
    if (Array.isArray(objValue)) {
      return objValue.concat(srcValue)
    }
  })
}
