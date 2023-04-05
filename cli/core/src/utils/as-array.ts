export const asArray = <T>(data: T | T[] | undefined): T[] => {
  if (Array.isArray(data)) return data
  if (data !== undefined && data !== null) return [data]
  return []
}
