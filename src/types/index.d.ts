type StrOrNum = string | number

type AnyObject = Record<string, any>

type AnyFunction<T = void> = (...args: any[]) => T
/** 选项类型 */
interface Option {
  label: number | string
  value: number | string | boolean
}
/** 只将给定字段修改为非必须 */
type PartailSome<P, RK extends keyof P> = Partial<Pick<P, RK>> & Omit<P, RK>
/** 将给定的字段修改为必须 */
type RequiredSome<P, RK extends keyof P> = Required<Pick<P, RK>> & Omit<P, RK>
/**  */
type PartailPick<P, RK extends keyof P> = Partial<Pick<P, RK>>

/** 可以用函数返回的值 */
type Functional<T> = T | AnyFunction<T>

interface Size {
  width?: number
  height?: number
}
/** 将对象函数类型转换成重载函数 */
type KeyCallMethod<T extends { [x: string]: any }> = <M extends keyof T>(
  methodName: M,
  ...args: Parameters<T[M]>
) => ReturnType<T[M]>
