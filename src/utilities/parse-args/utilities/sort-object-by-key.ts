export function sortObjectByKey(object: {
  [key: string]: unknown
}): { [key: string]: unknown } {
  const result: { [key: string]: unknown } = {}
  for (const key of Object.keys(object).sort()) {
    result[key] = object[key]
  }
  return result
}
