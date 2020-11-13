import { OptionConfig } from '../../../types'

export function findOptionConfig(
  arg: string,
  optionsConfig: Array<OptionConfig>
): null | OptionConfig {
  for (const optionConfig of optionsConfig) {
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
