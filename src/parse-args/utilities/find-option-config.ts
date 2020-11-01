import { OptionConfig } from '../../types'

export function findOptionConfig(
  name: null | string,
  optionConfigs?: Array<OptionConfig>
): null | OptionConfig {
  if (name === null || typeof optionConfigs === 'undefined') {
    return null
  }
  for (const optionConfig of optionConfigs) {
    if (
      optionConfig.name === name ||
      (typeof optionConfig.shorthands !== 'undefined' &&
        optionConfig.shorthands.indexOf(name) !== -1)
    ) {
      return optionConfig
    }
  }
  return null
}
