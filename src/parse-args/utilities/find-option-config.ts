import { OptionConfig } from '../../types'

export function findOptionConfig(
  arg: string,
  optionConfigs?: Array<OptionConfig>
): null | OptionConfig {
  if (typeof optionConfigs === 'undefined') {
    return null
  }
  for (const optionConfig of optionConfigs) {
    if (
      optionConfig.name === arg ||
      (typeof optionConfig.aliases !== 'undefined' &&
        optionConfig.aliases.indexOf(arg) !== -1)
    ) {
      return optionConfig
    }
  }
  return null
}
