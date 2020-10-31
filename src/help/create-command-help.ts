import { CommandConfig, PositionalConfig } from '../types'

export function createCommandHelp(
  name: string,
  commandConfig: CommandConfig
): string {
  const result = []
  const positionals = stringifyPositionals(commandConfig.positionals)
  const options =
    typeof commandConfig.options === 'undefined' ? '' : '[options]'
  result.push('')
  result.push(`  ${commandConfig.description}`)
  result.push('')
  result.push('  Usage:')
  result.push(`    $ ${[name, positionals, options].join(' ')}`)
  result.push('')
  if (typeof commandConfig.positionals !== 'undefined') {
    result.push('  Arguments:')
    for (const positionalConfig of commandConfig.positionals) {
      result.push(
        `    <${positionalConfig.name}>  ${positionalConfig.description}`
      )
    }
    result.push('')
  }
  if (typeof commandConfig.options !== 'undefined') {
    result.push('  Options:')
    for (const optionConfig of commandConfig.options) {
      const flags = stringifyFlags(optionConfig.name, optionConfig.shorthands)
      result.push(`    ${flags}  ${optionConfig.description}`)
    }
    result.push('    -h, --help  Print this message')
    result.push('')
  }
  if (typeof commandConfig.examples !== 'undefined') {
    result.push('  Examples:')
    for (const example of commandConfig.examples) {
      result.push(`    $ ${name} ${example}`)
    }
    result.push('')
  }
  return result.join('\n')
}

function stringifyPositionals(
  positionalConfigs?: Array<PositionalConfig>
): string {
  if (typeof positionalConfigs === 'undefined') {
    return ''
  }
  const result: Array<string> = []
  for (const positionalConfig of positionalConfigs) {
    result.push(`<${positionalConfig.name}>`)
  }
  return result.join(' ')
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
