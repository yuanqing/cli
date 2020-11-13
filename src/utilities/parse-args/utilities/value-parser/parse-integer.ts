import { integerRegex } from './regexes'

export function parseInteger(arg: string, name: string): number {
  const number = parseFloat(arg)
  if (integerRegex.test(arg) === false || isNaN(number) === true) {
    throw new Error(`${name} must be an integer but got '${arg}'`)
  }
  return number
}
