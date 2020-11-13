import { optionFlagRegex } from './regexes'

export function parseString(arg: string): string {
  if (optionFlagRegex.test(arg) === true) {
    throw new Error(`Invalid option: ${arg}`)
  }
  return arg
}
