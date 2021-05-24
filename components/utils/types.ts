export type AnyObject = Record<string, any>

export type AnyFunction<T> = (...args: any[]) => T

export type PartialReturnType<T extends (...args: unknown[]) => unknown> = Partial<ReturnType<T>>

export type FunctionalType<T> = T | AnyFunction<T>

export type PropPath = string | string[]

export type StrOrNum = string | number

export type NamePath = StrOrNum
