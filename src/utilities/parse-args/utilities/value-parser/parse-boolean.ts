import { falseRegex, trueRegex } from './regexes'

export function parseBoolean(arg: string, name: string): boolean {
  if (falseRegex.test(arg) === true) {
    return false
  }
  if (trueRegex.test(arg) === true) {
    return true
  }
  throw new Error(
    `${name} must be one of '0', '1', 'false', or 'true' but got '${arg}'`
  )
}
