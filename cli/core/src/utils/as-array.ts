import { SingleOrArray } from './_type_'

/**
 * Enforce single/array/undefined value to be an array.
 */
export const asArray = <T>(data: SingleOrArray<T> | undefined): T[] => {
  if (Array.isArray(data)) {
    console.log(32)
    console.log(32)
    console.log(32)
    console.log(32)

    return data
  }

  if (data !== undefined && data !== null) {
    console.log(32)
    console.log(32)
    console.log(32)
    console.log(32)
    console.log(32)

    return [data]
  }

  return []
}
