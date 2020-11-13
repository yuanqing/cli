import { CommandConfig, Result } from '../types'
import { parseArgs } from './parse-args/parse-args'

export function runCommand(
  args: Array<string>,
  commandConfig: CommandConfig
): void | Result {
  const result = parseArgs(
    args,
    commandConfig.positionals,
    commandConfig.options,
    commandConfig.shorthands
  )
  if (typeof commandConfig.handler === 'undefined') {
    return result
  }
  commandConfig.handler(result)
}
