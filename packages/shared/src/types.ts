export type StrOrNum = string | number

export type AnyObject = Record<string, any>

export type AnyFunction<T = void> = (...args: any[]) => T
/** 选项类型 */
export interface Option {
  label: number | string
  value: number | string | boolean
  [x: string]: any
}
/** 下拉组建的类型 */
export interface SelectOption extends Option {
  value: number | string
}
/** 只将给定字段修改为非必须 */
export type PartailSome<P, RK extends keyof P> = Partial<Pick<P, RK>> & Omit<P, RK>
/** 将给定的字段修改为必须 */
export type RequiredSome<P, RK extends keyof P> = Required<Pick<P, RK>> & Omit<P, RK>
/**  */
export type PartailPick<P, RK extends keyof P> = Partial<Pick<P, RK>>

/** 可以用函数返回的值 */
export type Functional<T> = T | AnyFunction<T>

export interface Size {
  width?: number
  height?: number
}
/** 将对象函数类型转换成重载函数 */
export type KeyCallMethod<T extends { [x: string]: any }> = <M extends keyof T>(
  methodName: M,
  ...args: Parameters<T[M]>
) => ReturnType<T[M]>

/** 可用作路径key的内容 */
export type NamePath = string | number
