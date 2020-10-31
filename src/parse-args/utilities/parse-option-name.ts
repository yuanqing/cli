const optionNameRegex = /-{1,2}(.+)/

export function parseOptionName(arg?: string): null | string {
  if (typeof arg === 'undefined') {
    return null
  }
  const matches = arg.match(optionNameRegex)
  if (matches === null) {
    return null
  }
  return matches[1]
}
