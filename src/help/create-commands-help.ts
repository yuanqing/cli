import { CommandConfig } from '../types'

export function createCommandsHelp(
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
  result.push(`    $ ${name} [command] [options]`)
  result.push('')
  result.push('  Commands:')
  for (const name in commandConfigs) {
    const commandConfig = commandConfigs[name]
    result.push(`    ${name}  ${commandConfig.description}`)
  }
  result.push('')
  result.push('  Options:')
  result.push('    -h, --help  Print this message')
  result.push('    -v, --version  Print the version number')
  result.push('')
  if (typeof examples !== 'undefined' && examples.length !== 0) {
    result.push('  Examples:')
    for (const example of examples) {
      result.push(`    $ ${name} ${example}`)
    }
    result.push('')
  }
  return result.join('\n')
}
