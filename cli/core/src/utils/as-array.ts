import { SingleOrArray } from './_type_'

/**
 * Enforce single/array/undefined value to be an array.
 */
export const asArray = <T>(data: SingleOrArray<T> | undefined): T[] => {
  if (Array.isArray(data)) {
    return data
  }

  if (data !== undefined && data !== null) {
    return [data]
  }

  return []
}
