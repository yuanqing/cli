/* eslint-disable no-console */
import { createHelp } from './help/create-help'
import { createMultiCommandHelp } from './help/create-multi-command-help'
import { runCommand } from './run-command'
import { CommandConfig, MultiCommandCliConfig } from './types'

export function createMultiCommandCli(
  args: Array<string>,
  multiCommandCliConfig: MultiCommandCliConfig,
  commandConfigs: { [key: string]: CommandConfig },
  defaultCommandConfig?: CommandConfig
): unknown {
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
          commandConfigs,
          multiCommandCliConfig.description,
          multiCommandCliConfig.examples
        )
      )
      return
    }
  }
  const commandConfig = commandConfigs[firstArg]
  if (typeof commandConfig === 'undefined') {
    if (typeof defaultCommandConfig === 'undefined') {
      throw new Error(`Unrecognized command: ${firstArg}`)
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
