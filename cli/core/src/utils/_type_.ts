/**
 * Unknown abject type.
 */
export type Obj<T = any> = Record<string, T>

/**
 * Make some of the optional arguments required.
 */
export type RequireSome<T, K extends keyof T> = T & Required<Pick<T, K>>

/**
 * Make all of the arguments optional, but keep some required.
 */
export type RequireOnly<T, K extends keyof T> = Partial<Omit<T, K>> &
  Required<Pick<T, K>>

/**
 * Make some of the arguments optional.
 */
export type PartialSome<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

/**
 * The value can be single or array.
 */
export type SingleOrArray<T> = T | T[]

/**
 * Keyof that returns only string keys.
 */
export type StringKeyof<T> = Extract<keyof T, string>

/**
 * Replace the type of a property, but keep the JS docs.
 */
export type ReplacePropertyType<T, K extends keyof T, R = any> = {
  [T in K]: R
}

/**
 * Add a discriminator type.
 */
export type Type<K extends string> = {
  /**
   * Internal discriminator type.
   */
  _type: K
}

/**
 * Remove the `_type` property.
 */
export type OmitType<T extends Type<any>> = Omit<T, '_type'>
