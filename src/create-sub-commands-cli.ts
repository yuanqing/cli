/* eslint-disable no-console */
import { createHelp } from './help/create-help'
import { createSubCommandsHelp } from './help/create-sub-commands-help'
import { runCommand } from './run-command'
import { CliConfig, CommandConfig } from './types'

export function createSubCommandsCli(
  args: Array<string>,
  cliConfig: CliConfig,
  subCommandConfigs: { [key: string]: CommandConfig }
): unknown {
  const firstArg = args[0]
  if (args.length === 1) {
    if (firstArg === '--version' || firstArg === '-v') {
      console.log(cliConfig.version)
      return
    }
    if (firstArg === '--help' || firstArg === '-h') {
      console.log(
        createSubCommandsHelp(
          cliConfig.name,
          cliConfig.description,
          subCommandConfigs,
          cliConfig.examples
        )
      )
      return
    }
  }
  const subCommandConfig = subCommandConfigs[firstArg]
  if (typeof subCommandConfig === 'undefined') {
    throw new Error(`Unrecognized command: ${firstArg}`)
  }
  const secondArg = args[1]
  if (secondArg === '--help' || secondArg === '-h') {
    console.log(createHelp(`${cliConfig.name} ${firstArg}`, subCommandConfig))
    return
  }
  return runCommand(args.slice(1), subCommandConfig)
}
