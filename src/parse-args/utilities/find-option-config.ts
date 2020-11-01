import { OptionConfig } from '../../types'

export function findOptionConfig(
  name: null | string,
  optionConfigs?: Array<OptionConfig>
): null | OptionConfig {
  if (name === null || typeof optionConfigs === 'undefined') {
    return null
  }
  for (const optionConfig of optionConfigs) {
    if (optionConfig.name === name) {
      return optionConfig
    }
  }
  return null
}
