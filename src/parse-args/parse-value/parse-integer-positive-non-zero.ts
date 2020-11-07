import { positiveIntegerRegex, zeroRegex } from './regex'

export function parseIntegerPositiveNonZero(arg: string, name: string): number {
  const number = parseFloat(arg)
  if (
    zeroRegex.test(arg) === true ||
    positiveIntegerRegex.test(arg) === false ||
    isNaN(number) === true
  ) {
    throw new Error(
      `${name} must be a non-zero positive integer but got '${arg}'`
    )
  }
  return number
}
