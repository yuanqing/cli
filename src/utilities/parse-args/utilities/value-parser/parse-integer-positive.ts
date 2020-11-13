import { positiveIntegerRegex } from './regexes'

export function parseIntegerPositive(arg: string, name: string): number {
  const number = parseFloat(arg)
  if (positiveIntegerRegex.test(arg) === false || isNaN(number) === true) {
    throw new Error(`${name} must be a positive integer but got '${arg}'`)
  }
  return number
}
