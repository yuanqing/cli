const floatRegex = /-?(?:\d+)?\.(?:\d+)/
const integerRegex = /-?(?:\d+)\.?/

export function parseNumber(arg?: string): null | number {
  if (
    typeof arg === 'undefined' ||
    (floatRegex.test(arg) === false && integerRegex.test(arg) === false)
  ) {
    return null
  }
  const number = parseFloat(arg)
  if (isNaN(number) === true) {
    return null
  }
  return number
}
