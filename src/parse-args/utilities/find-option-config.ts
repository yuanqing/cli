import { OptionConfig } from '../../types'
import { parseFlag } from './parse-flag'

export function findOptionConfig(
  arg: string,
  optionConfigs?: Array<OptionConfig>
): null | OptionConfig {
  if (typeof optionConfigs === 'undefined') {
    return null
  }
  const flag = parseFlag(arg)
  if (flag === null) {
    return null
  }
  for (const optionConfig of optionConfigs) {
    if (
      optionConfig.name === flag ||
      (typeof optionConfig.aliases !== 'undefined' &&
        optionConfig.aliases.indexOf(flag) !== -1)
    ) {
      return optionConfig
    }
  }
  return null
}
