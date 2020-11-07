/* eslint-disable no-console */
import { parseArgs } from './parse-args/parse-args'
import { CommandConfig } from './types'

export function runCommand(
  args: Array<string>,
  commandConfig: CommandConfig
): unknown {
  const { positionals, options, remainder } = parseArgs(
    args,
    commandConfig.positionals,
    commandConfig.options,
    commandConfig.shorthands
  )
  return commandConfig.handler(positionals, options, remainder)
}
