/* eslint-disable no-console */
import { createCommandsHelp } from './help/create-commands-help'
import { createHelp } from './help/create-help'
import { runCommand } from './run-command'
import { CliConfig, CommandConfig } from './types'

export function createCommandsCli(
  args: Array<string>,
  cliConfig: CliConfig,
  commandConfigs: { [key: string]: CommandConfig }
): unknown {
  const firstArg = args[0]
  if (args.length === 1) {
    if (firstArg === '--version' || firstArg === '-v') {
      console.log(cliConfig.version)
      return
    }
    if (firstArg === '--help' || firstArg === '-h') {
      console.log(
        createCommandsHelp(
          cliConfig.name,
          cliConfig.description,
          commandConfigs,
          cliConfig.examples
        )
      )
      return
    }
  }
  const commandConfig = commandConfigs[firstArg]
  if (typeof commandConfig === 'undefined') {
    throw new Error(`Unrecognized command: ${firstArg}`)
  }
  const secondArg = args[1]
  if (secondArg === '--help' || secondArg === '-h') {
    console.log(createHelp(cliConfig.name, commandConfig))
    return
  }
  return runCommand(
    args.slice(1),
    `${cliConfig.name} ${firstArg}`,
    commandConfig
  )
}
