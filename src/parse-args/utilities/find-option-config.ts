import { OptionConfig } from '../../types'

export function findOptionConfig(
  name: string,
  optionConfigs: Array<OptionConfig>
): null | OptionConfig {
  for (const optionConfig of optionConfigs) {
    if (optionConfig.name === name) {
      return optionConfig
    }
  }
  return null
}
