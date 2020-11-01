import { CommandConfig, OptionConfig, PositionalConfig } from '../types'
import { stringifyCliArgs } from './utilities/stringify-cli-args'
import { stringifyExamples } from './utilities/stringify-examples'

export function createHelp(name: string, commandConfig: CommandConfig): string {
  const result = []
  result.push('')
  if (typeof commandConfig.description !== 'undefined') {
    result.push(`  ${commandConfig.description}`)
    result.push('')
  }
  result.push('  Usage:')
  result.push(
    `    $ ${stringifyCliArgs(
      name,
      commandConfig.positionals,
      typeof commandConfig.options !== 'undefined' &&
        commandConfig.options.length !== 0
    )}`
  )
  result.push('')
  if (
    typeof commandConfig.positionals !== 'undefined' &&
    commandConfig.positionals.length !== 0
  ) {
    result.push('  Arguments:')
    result.push(stringifyPositionals(commandConfig.positionals))
    result.push('')
  }
  result.push('  Options:')
  if (
    typeof commandConfig.options !== 'undefined' &&
    commandConfig.options.length !== 0
  ) {
    result.push(stringifyOptions(commandConfig.options))
  }
  result.push('    -h, --help  Print this message')
  result.push('')
  if (
    typeof commandConfig.examples !== 'undefined' &&
    commandConfig.examples.length !== 0
  ) {
    result.push('  Examples:')
    result.push(stringifyExamples(name, commandConfig.examples))
    result.push('')
  }
  return result.join('\n')
}

function stringifyPositionals(
  positionalConfigs: Array<PositionalConfig>
): string {
  const result = []
  for (const positionalConfig of positionalConfigs) {
    const line = [`    <${positionalConfig.name}>`]
    if (typeof positionalConfig.description !== 'undefined') {
      line.push(positionalConfig.description)
    }
    result.push(line.join('  '))
  }
  return result.join('\n')
}

function stringifyOptions(optionConfigs: Array<OptionConfig>): string {
  const result = []
  for (const optionConfig of optionConfigs) {
    const flags = stringifyFlags(optionConfig.name, optionConfig.shorthands)
    const line = [`    ${flags}`]
    if (typeof optionConfig.description !== 'undefined') {
      line.push(optionConfig.description)
    }
    result.push(line.join('  '))
  }
  return result.join('\n')
}

function stringifyFlags(name: string, shorthands?: Array<string>): string {
  const mainFlag = `--${name}`
  if (typeof shorthands === 'undefined') {
    return mainFlag
  }
  const result: Array<string> = []
  for (const shorthand of shorthands) {
    result.push(`-${shorthand}`)
  }
  return [result, mainFlag].join(', ')
}
