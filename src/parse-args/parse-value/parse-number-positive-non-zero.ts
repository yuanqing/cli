import { positiveIntegerRegex, positiveNumberRegex, zeroRegex } from './regex'

export function parseNumberPositiveNonZero(arg: string, name: string): number {
  const number = parseFloat(arg)
  if (
    zeroRegex.test(arg) === true ||
    (positiveNumberRegex.test(arg) === false &&
      positiveIntegerRegex.test(arg) === false) ||
    isNaN(number) === true
  ) {
    throw new Error(
      `${name} must be a non-zero positive number but got '${arg}'`
    )
  }
  return number
}
