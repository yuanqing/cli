/* eslint-disable no-console */
import { createHelp } from './help/create-help'
import { runCommand } from './run-command'
import { CliConfig, CommandConfig } from './types'

export function createCli(
  args: Array<string>,
  cliConfig: CliConfig,
  commandConfig: CommandConfig
): unknown {
  const firstArg = args[0]
  if (args.length === 1) {
    if (firstArg === '--version' || firstArg === '-v') {
      console.log(cliConfig.version)
      return
    }
    if (firstArg === '--help' || firstArg === '-h') {
      console.log(createHelp(cliConfig.name, commandConfig))
      return
    }
  }
  return runCommand(args, cliConfig.name, commandConfig)
}
