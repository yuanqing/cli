import { stopParsingOptionsArg } from './constants'

export function containsOption(
  args: Array<string>,
  optionNames: Array<string>
): boolean {
  for (const arg of args) {
    if (arg === stopParsingOptionsArg) {
      return false
    }
    for (const optionName of optionNames) {
      if (arg === `-${optionName}` || arg === `--${optionName}`) {
        return true
      }
    }
  }
  return false
}
