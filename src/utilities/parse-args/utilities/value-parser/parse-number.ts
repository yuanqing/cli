import { integerRegex, numberRegex } from './regexes'

export function parseNumber(arg: string, name: string): number {
  const number = parseFloat(arg)
  if (
    (numberRegex.test(arg) === false && integerRegex.test(arg) === false) ||
    isNaN(number) === true
  ) {
    throw new Error(`${name} must be a number but got '${arg}'`)
  }
  return number
}
