import { stopParsingOptionsArg } from '../stop-parsing-options-arg'
import { parseOption } from './parse-option'

export function insertShorthands(
  args: Array<string>,
  shorthandsConfig: { [key: string]: Array<string> }
): Array<string> {
  const result: Array<string> = []
  let stopParsingOptions = false
  for (const arg of args) {
    if (arg === stopParsingOptionsArg) {
      // stop inserting shorthand args when we encounter `stopParsingOptionsArg`
      stopParsingOptions = true
    }
    if (stopParsingOptions === true) {
      result.push(arg)
      continue
    }
    const option = parseOption(arg)
    if (
      option === null ||
      typeof shorthandsConfig[option.name] === 'undefined'
    ) {
      result.push(arg)
      continue
    }
    for (const shorthandArg of shorthandsConfig[option.name]) {
      result.push(shorthandArg)
    }
  }
  return result
}
