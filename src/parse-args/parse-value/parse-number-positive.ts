import { positiveIntegerRegex, positiveNumberRegex } from './regex'

export function parseNumberPositive(arg: string, name: string): number {
  const number = parseFloat(arg)
  if (
    (positiveNumberRegex.test(arg) === false &&
      positiveIntegerRegex.test(arg) === false) ||
    isNaN(number) === true
  ) {
    throw new Error(`${name} must be a positive number but got '${arg}'`)
  }
  return number
}
