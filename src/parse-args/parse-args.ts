import { OptionConfig, PositionalConfig } from '../types'
import { createErrorMessage } from './create-error-message'
import { findOptionConfig } from './find-option-config'
import { mapArgTypeToValueParser } from './map-arg-type-to-value-parser'
import { parseOptionFlag } from './parse-option-flag'
import { parseBoolean } from './parse-value/parse-boolean'

const stopParsingOptionsArg = '--'

export function parseArgs(
  args: Array<string>,
  positionalConfigs?: Array<PositionalConfig>,
  optionConfigs?: Array<OptionConfig>
): {
  positionals: { [key: string]: unknown }
  options: { [key: string]: unknown }
  remainder: Array<string>
} {
  const argsCopy = args.slice()
  const positionals: { [key: string]: unknown } = {}
  const options: { [key: string]: unknown } = {}
  const remainder: Array<string> = []
  let positionalIndex = 0
  let index = -1
  let stopParsingOptions = false
  while (++index < argsCopy.length) {
    const arg = argsCopy[index]
    if (stopParsingOptions === false && arg === stopParsingOptionsArg) {
      stopParsingOptions = true
      continue
    }
    const option = parseOptionFlag(arg)
    let optionConfig = null
    if (option !== null) {
      optionConfig = findOptionConfig(option.name, optionConfigs)
      if (option.value !== null) {
        // Insert `value` after `index`
        argsCopy.splice(index + 1, 0, option.value)
      }
    }
    if (optionConfig === null || stopParsingOptions === true) {
      const isArgOptionFlag = option !== null && stopParsingOptions === false
      if (
        typeof positionalConfigs === 'undefined' ||
        positionalIndex >= positionalConfigs.length
      ) {
        if (isArgOptionFlag === true) {
          throw new Error(`Invalid option: ${arg}`)
        }
        remainder.push(arg)
        continue
      }
      const positionalConfig = positionalConfigs[positionalIndex]
      const positionalName = positionalConfig.name
      try {
        const valueParser = mapArgTypeToValueParser(positionalConfig.type)
        const value = valueParser(arg, `Argument <${positionalName}>`)
        positionals[positionalName] = value
        positionalIndex++
        continue
      } catch (error) {
        if (isArgOptionFlag === true) {
          throw new Error(`Invalid option: ${arg}`)
        }
        if (error.message === '') {
          throw new Error(
            `Invalid value for argument <${positionalName}>: '${arg}'`
          )
        }
        throw error
      }
    }
    if (typeof options[optionConfig.name] !== 'undefined') {
      throw new Error(`Duplicate option: ${arg}`)
    }
    const nextArg: undefined | string = argsCopy[index + 1]
    const isNextArgUndefined =
      typeof nextArg === 'undefined' || nextArg === stopParsingOptionsArg
    const isNextArgOptionFlag = parseOptionFlag(nextArg) !== null
    if (optionConfig.type === 'boolean') {
      options[optionConfig.name] = true
      if (isNextArgUndefined === false && isNextArgOptionFlag === false) {
        try {
          const boolean = parseBoolean(nextArg, `${arg}`)
          options[optionConfig.name] = boolean
          index++ // consume `nextArg`
        } catch {
          continue // don't consume `nextArg`
        }
      }
      continue
    }
    if (isNextArgUndefined === true) {
      throw new Error(createErrorMessage(optionConfig.type, `Option ${arg}`))
    }
    try {
      const valueParser = mapArgTypeToValueParser(optionConfig.type)
      const value = valueParser(nextArg, `Option ${arg}`)
      options[optionConfig.name] = value
      index++ // consume `nextArg`
      continue
    } catch (error) {
      if (isNextArgOptionFlag === true) {
        throw new Error(createErrorMessage(optionConfig.type, `Option ${arg}`))
      }
      if (error.message === '') {
        throw new Error(`Invalid value for option ${arg}: '${nextArg}'`)
      }
      throw error
    }
  }
  if (typeof positionalConfigs !== 'undefined') {
    for (const positionalConfig of positionalConfigs) {
      if (typeof positionals[positionalConfig.name] === 'undefined') {
        if (typeof positionalConfig.default !== 'undefined') {
          positionals[positionalConfig.name] = positionalConfig.default
          continue
        }
        if (positionalConfig.required === true) {
          throw new Error(`Argument <${positionalConfig.name}> is required`)
        }
      }
    }
  }
  if (typeof optionConfigs !== 'undefined') {
    for (const optionConfig of optionConfigs) {
      if (typeof options[optionConfig.name] === 'undefined') {
        if (typeof optionConfig.default !== 'undefined') {
          options[optionConfig.name] = optionConfig.default
          continue
        }
        if (optionConfig.required === true) {
          throw new Error(`Option --${optionConfig.name} is required`)
        }
      }
    }
  }
  return { options, positionals, remainder }
}
