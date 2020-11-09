import { containsOption } from './contains-option'
import { createHelp } from './help/create-help'
import { runCommand } from './run-command'
import { CliConfig, CommandConfig, Result } from './types'

export function createCli(cliConfig: CliConfig, commandConfig: CommandConfig) {
  return function (args = process.argv.slice(2)): void | Result {
    if (containsOption(args, ['version', 'v']) === true) {
      // eslint-disable-next-line no-console
      console.log(cliConfig.version)
      return
    }
    if (containsOption(args, ['help', 'h']) === true) {
      // eslint-disable-next-line no-console
      console.log(createHelp(cliConfig.name, commandConfig))
      return
    }
    return runCommand(args, commandConfig)
  }
}
