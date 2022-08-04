import { isFunction } from 'lodash-es'

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
