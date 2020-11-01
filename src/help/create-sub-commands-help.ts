import { CommandConfig } from '../types'
import { stringifyExamples } from './utilities/stringify-examples'

export function createSubCommandsHelp(
  name: string,
  description: string,
  commandConfigs: { [key: string]: CommandConfig },
  examples?: Array<string>
): string {
  const result = []
  result.push('')
  result.push(`  ${description}`)
  result.push('')
  result.push('  Usage:')
  result.push(`    $ ${name} <command> [options]`)
  result.push('')
  result.push('  Commands:')
  result.push(stringifyCommands(commandConfigs))
  result.push('')
  result.push('  Options:')
  result.push('    -h, --help  Print this message')
  result.push('    -v, --version  Print the version number')
  result.push('')
  if (typeof examples !== 'undefined' && examples.length !== 0) {
    result.push('  Examples:')
    result.push(stringifyExamples(name, examples))
    result.push('')
  }
  return result.join('\n')
}

function stringifyCommands(commandConfigs: {
  [key: string]: CommandConfig
}): string {
  const result = []
  for (const commandName in commandConfigs) {
    const commandConfig = commandConfigs[commandName]
    result.push(`    ${commandName}  ${commandConfig.description}`)
  }
  return result.join('\n')
}
