import { isRef, Ref } from 'vue'
import { BoolRef, formParamsSwitchCreator, wp, WpOptions } from '@wxhccc/es-util'
import { isFunction, mergeWith } from 'lodash-es'
import { dateFormat } from './formatter'

export * from './storage'
export * from './formatter'
export * from './component'
export * from './tree-utils'

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

type VwpLock = WpOptions<BoolRef>['lock'] | Ref<boolean>
/**
 * wrapPromise 包裹promise对象
 * @param promise
 * @param lock
 * @returns
 */
export function vwp<T>(promise: Promise<T>, lock?: VwpLock): Promise<[null, T] | [Error, undefined]>
export function vwp<T>(promise: () => Promise<T>, lock?: VwpLock): Promise<[null, T | undefined] | [Error, undefined]>
export function vwp<T>(promise: Promise<T> | (() => Promise<T>), lock?: VwpLock) {
  return wp<T>(promise, { wrap: true, ...(lock ? { lock: isRef(lock) ? [lock, 'value'] : lock } : {}) } as any)
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

/**
 * 将搜素条件里的数组字段转换为其他格式，通常用于搜索表单的字段转换
 * @param formData 传入参数
 * @param maps 转换的映射关系，eg：{ date: ['startTime', 'endTime'] }
 */
 export const searchFormDateSwitch = formParamsSwitchCreator(dateFormat)