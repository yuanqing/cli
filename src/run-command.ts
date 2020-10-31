/* eslint-disable no-console */
import { createCommandHelp } from './help/create-command-help'
import { parseArgs } from './parse-args/parse-args'
import { CommandConfig } from './types'

export function runCommand(
  args: Array<string>,
  name: string,
  commandConfig: CommandConfig
): unknown {
  const firstArg = args[0]
  if (args.length === 1 && (firstArg === '--help' || firstArg === '-h')) {
    console.log(createCommandHelp(name, commandConfig))
    return
  }
  const { positionals, options, remainder } = parseArgs(
    args,
    commandConfig.positionals,
    commandConfig.options
  )
  return commandConfig.handler(positionals, options, remainder)
}
