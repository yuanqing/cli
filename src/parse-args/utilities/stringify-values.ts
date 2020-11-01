export function stringifyValues<T extends string | number>(
  values: Array<T>
): string {
  const quotedValues: Array<string> = values.map(function (value: T) {
    return `'${value}'`
  })
  if (quotedValues.length === 1) {
    return `${quotedValues[0]}`
  }
  return `${quotedValues.slice(0, quotedValues.length - 1).join(', ')} or ${
    quotedValues[quotedValues.length - 1]
  }`
}
