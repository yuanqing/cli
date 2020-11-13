import { CommandConfig, MultiCommandCliConfig, Result } from './types'
import { containsOption } from './utilities/contains-option'
import { createHelp } from './utilities/help/create-help'
import { createMultiCommandHelp } from './utilities/help/create-multi-command-help'
import { runCommand } from './utilities/run-command'

export function createMultiCommandCli(
  multiCommandCliConfig: MultiCommandCliConfig,
  commandsConfig: { [key: string]: CommandConfig },
  defaultCommandConfig?: CommandConfig
) {
  return function (args = process.argv.slice(2)): void | Result {
    if (containsOption(args, ['version', 'v']) === true) {
      // eslint-disable-next-line no-console
      console.log(multiCommandCliConfig.version)
      return
    }
    const firstArg = args[0]
    if (args.length === 1 && (firstArg === '--help' || firstArg === '-h')) {
      // eslint-disable-next-line no-console
      console.log(
        createMultiCommandHelp(
          multiCommandCliConfig.name,
          commandsConfig,
          multiCommandCliConfig.description,
          multiCommandCliConfig.examples
        )
      )
      return
    }
    const commandConfig = commandsConfig[firstArg]
    if (typeof commandConfig === 'undefined') {
      if (typeof defaultCommandConfig === 'undefined') {
        throw new Error(`Invalid command: ${firstArg}`)
      }
      return runCommand(args, defaultCommandConfig)
    }
    if (containsOption(args.slice(1), ['help', 'h']) === true) {
      // eslint-disable-next-line no-console
      console.log(
        createHelp(`${multiCommandCliConfig.name} ${firstArg}`, commandConfig)
      )
      return
    }
    return runCommand(args.slice(1), commandConfig)
  }
}
