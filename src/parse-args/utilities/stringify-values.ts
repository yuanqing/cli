export function stringifyValues(values: Array<string>): string {
  const quotedValues = values.map(function (value: string) {
    return `'${value}'`
  })
  if (quotedValues.length === 1) {
    return `${quotedValues[0]}`
  }
  return `${quotedValues.slice(0, quotedValues.length - 1).join(', ')} or ${
    quotedValues[quotedValues.length - 1]
  }`
}
