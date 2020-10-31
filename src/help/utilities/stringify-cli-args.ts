import { PositionalConfig } from '../../types'

export function stringifyCliArgs(
  name: string,
  positionalConfigs: undefined | Array<PositionalConfig>,
  hasOptions: boolean
): string {
  const result = [name]
  if (
    typeof positionalConfigs !== 'undefined' &&
    positionalConfigs.length !== 0
  ) {
    for (const positionalConfig of positionalConfigs) {
      result.push(`<${positionalConfig.name}>`)
    }
  }
  if (hasOptions === true) {
    result.push('[options]')
  }
  return result.join(' ')
}
