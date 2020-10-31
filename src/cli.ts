/* eslint-disable no-console */
import { createHelp } from './create-help'
import { parseArgs } from './parse-args/parse-args'
import { CliConfig, CommandConfig } from './types'

export function cli(
  args: Array<string>,
  cliConfig: CliConfig,
  mainCommandConfig?: CommandConfig,
  subCommandConfigs?: { [key: string]: CommandConfig }
): unknown {
  const firstArg = args[0]
  if (args.length === 1) {
    if (firstArg === '--version' || firstArg === '-v') {
      console.log(cliConfig.version)
      return
    }
    if (firstArg === '--help' || firstArg === '-h') {
      console.log(createHelp(cliConfig.name, mainCommandConfig))
      return
    }
  }
  if (
    typeof subCommandConfigs === 'undefined' ||
    typeof subCommandConfigs[firstArg] === 'undefined'
  ) {
    if (typeof mainCommandConfig === 'undefined') {
      throw new Error('`mainCommandConfig` not defined')
    }
    return runCommand(args, cliConfig.name, mainCommandConfig)
  }
  return runCommand(
    args.slice(1),
    `${cliConfig.name} ${firstArg}`,
    subCommandConfigs[firstArg]
  )
}

function runCommand(
  args: Array<string>,
  name: string,
  commandConfig: CommandConfig
): unknown {
  const firstArg = args[0]
  console.log(firstArg)
  if (args.length === 1 && (firstArg === '--help' || firstArg === '-h')) {
    console.log(createHelp(name, commandConfig))
    return
  }
  const { positionals, options, remainder } = parseArgs(
    args,
    commandConfig.positionals,
    commandConfig.options
  )
  return commandConfig.handler(positionals, options, remainder)
}
