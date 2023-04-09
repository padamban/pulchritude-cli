/**
 * Unknown abject type.
 */
export type Obj<T = any> = Record<string, T>

/**
 * Make some of the optional arguments required.
 */
export type RequireSome<T, K extends keyof T> = T & Required<Pick<T, K>>

/**
 * The value can be single or array.
 */
export type SingleOrArray<T> = T | T[]
