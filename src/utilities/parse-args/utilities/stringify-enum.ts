export function stringifyEnum(
  values: Array<boolean | number | string | null>
): string {
  const strings: Array<string> = []
  for (const value of values) {
    strings.push(`'${value}'`)
  }
  return `${strings.slice(0, strings.length - 1).join(', ')} or ${
    strings[strings.length - 1]
  }`
}
