/* eslint-disable no-console */
import { createHelp } from './help/create-help'
import { runCommand } from './run-command'
import { CliConfig, CommandConfig, Result } from './types'

export function createCli(cliConfig: CliConfig, commandConfig: CommandConfig) {
  return function (args = process.argv.slice(2)): void | Result {
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
    return runCommand(args, commandConfig)
  }
}
