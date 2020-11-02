const flagRegex = /-{1,2}(.+)/

export function parseFlag(arg: string): null | string {
  const matches = arg.match(flagRegex)
  if (matches === null) {
    return null
  }
  return matches[1]
}
