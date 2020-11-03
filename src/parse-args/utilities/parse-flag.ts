const flagRegex = /-{1,2}(.+)/

export function parseFlag(arg?: string): null | string {
  if (typeof arg === 'undefined') {
    return null
  }
  const matches = arg.match(flagRegex)
  if (arg === '--' || matches === null) {
    return null
  }
  return matches[1]
}
