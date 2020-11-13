import { CliConfig, CommandConfig, Result } from './types'
import { containsOption } from './utilities/contains-option'
import { createHelp } from './utilities/help/create-help'
import { runCommand } from './utilities/run-command'

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
