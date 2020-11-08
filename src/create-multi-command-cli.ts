/* eslint-disable no-console */
import { createHelp } from './help/create-help'
import { createMultiCommandHelp } from './help/create-multi-command-help'
import { runCommand } from './run-command'
import { CommandConfig, MultiCommandCliConfig, Result } from './types'

export function createMultiCommandCli(
  multiCommandCliConfig: MultiCommandCliConfig,
  commandsConfig: { [key: string]: CommandConfig },
  defaultCommandConfig?: CommandConfig
) {
  return function (args = process.argv.slice(2)): void | Result {
    const firstArg = args[0]
    if (args.length === 1) {
      if (firstArg === '--version' || firstArg === '-v') {
        console.log(multiCommandCliConfig.version)
        return
      }
      if (firstArg === '--help' || firstArg === '-h') {
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
    }
    const commandConfig = commandsConfig[firstArg]
    if (typeof commandConfig === 'undefined') {
      if (typeof defaultCommandConfig === 'undefined') {
        throw new Error(`Invalid command: ${firstArg}`)
      }
      return runCommand(args, defaultCommandConfig)
    }
    const secondArg = args[1]
    if (secondArg === '--help' || secondArg === '-h') {
      console.log(
        createHelp(`${multiCommandCliConfig.name} ${firstArg}`, commandConfig)
      )
      return
    }
    return runCommand(args.slice(1), commandConfig)
  }
}
