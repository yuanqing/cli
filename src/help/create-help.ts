import { CommandConfig, OptionConfig, PositionalConfig } from '../types'
import { stringifyCliArgs } from './utilities/stringify-cli-args'
import { stringifyExamples } from './utilities/stringify-examples'
import { stringifyRows } from './utilities/stringify-rows'

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
    result.push(stringifyRows(createPositionalRows(commandConfig.positionals)))
    result.push('')
  }
  result.push('  Options:')
  result.push(stringifyRows(createOptionRows(commandConfig.options)))
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

function createPositionalRows(
  positionalConfigs: Array<PositionalConfig>
): Array<[string, string]> {
  const result: Array<[string, string]> = []
  for (const positionalConfig of positionalConfigs) {
    result.push([
      `    <${positionalConfig.name}>`,
      typeof positionalConfig.description === 'undefined'
        ? ''
        : positionalConfig.description
    ])
  }
  return result
}

function createOptionRows(
  optionConfigs?: Array<OptionConfig>
): Array<[string, string]> {
  const result: Array<[string, string, string]> = [
    ['help', `    -h, --help`, 'Print this message.'],
    ['version', `    -v, --version`, 'Print the version.']
  ]
  if (typeof optionConfigs !== 'undefined') {
    for (const optionConfig of optionConfigs) {
      result.push([
        optionConfig.name,
        `    ${stringifyFlags(optionConfig.name, optionConfig.aliases)}`,
        typeof optionConfig.description === 'undefined'
          ? ''
          : optionConfig.description
      ])
    }
  }
  return result
    .sort(function (x, y) {
      return x[0].localeCompare(y[0])
    })
    .map(function (row) {
      return [row[1], row[2]]
    })
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
