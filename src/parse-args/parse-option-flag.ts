const optionFlagRegex = /--?([^-].*)/

export function parseOptionFlag(
  arg?: string
): null | { name: string; value: null | string } {
  if (typeof arg === 'undefined') {
    return null
  }
  const matches = arg.match(optionFlagRegex)
  if (arg === '--' || matches === null) {
    return null
  }
  const equalsIndex = matches[1].indexOf('=')
  if (equalsIndex === -1) {
    return {
      name: matches[1],
      value: null
    }
  }
  const value = matches[1].slice(equalsIndex + 1)
  return {
    name: matches[1].slice(0, equalsIndex),
    value: value.length === 0 ? null : value
  }
}
