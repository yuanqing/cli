import { PositionalConfig } from '../../../types'

export function stringifyCliArgs(
  name: string,
  positionalsConfig: undefined | Array<PositionalConfig>,
  hasOptions: boolean
): string {
  const result = [name]
  if (
    typeof positionalsConfig !== 'undefined' &&
    positionalsConfig.length !== 0
  ) {
    for (const positionalConfig of positionalsConfig) {
      result.push(`<${positionalConfig.name}>`)
    }
  }
  if (hasOptions === true) {
    result.push('[options]')
  }
  return result.join(' ')
}
