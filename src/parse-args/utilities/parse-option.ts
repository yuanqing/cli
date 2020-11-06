const flagRegex = /-{1,2}(.+)/

export function parseOption(
  arg?: string
): null | { optionName: string; value: null | string } {
  if (typeof arg === 'undefined') {
    return null
  }
  const matches = arg.match(flagRegex)
  if (arg === '--' || matches === null) {
    return null
  }
  const equalsIndex = matches[1].indexOf('=')
  if (equalsIndex === -1) {
    return {
      optionName: matches[1],
      value: null
    }
  }
  const value = matches[1].slice(equalsIndex + 1)
  return {
    optionName: matches[1].slice(0, equalsIndex),
    value: value.length === 0 ? null : value
  }
}
