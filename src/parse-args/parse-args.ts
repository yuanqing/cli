import { stopParsingOptionsArg } from '../stop-parsing-options-arg'
import { OptionConfig, PositionalConfig, Result } from '../types'
import { camelCaseObjectKeys } from './camel-case-object-keys'
import { findOptionConfig } from './find-option-config'
import { insertShorthands } from './insert-shorthands'
import { mapArgTypeToErrorMessage } from './map-arg-type-to-error-message'
import { mapArgTypeToValueParser } from './map-arg-type-to-value-parser'
import { parseOption } from './parse-option'
import { parseBoolean } from './parse-value/parse-boolean'
import { sortObjectByKey } from './sort-object-by-key'

export function parseArgs(
  args: Array<string>,
  positionalsConfig?: Array<PositionalConfig>,
  optionsConfig?: Array<OptionConfig>,
  shorthandsConfig?: { [key: string]: Array<string> }
): Result {
  const argsCopy =
    typeof shorthandsConfig === 'undefined'
      ? args.slice()
      : insertShorthands(args, shorthandsConfig)
  const positionals: { [key: string]: unknown } = {}
  const options: { [key: string]: unknown } = {}
  const remainder: Array<string> = []
  let stopParsingOptions = false
  let positionalCount = 0 // number of positionals encountered
  let index = -1
  while (++index < argsCopy.length) {
    const currentArg = argsCopy[index]
    const currentOption = parseOption(currentArg)
    if (stopParsingOptions === false) {
      // try to parse `arg` as an option
      if (currentArg === stopParsingOptionsArg) {
        stopParsingOptions = true
        continue
      }
      if (currentOption !== null && typeof optionsConfig !== 'undefined') {
        const currentOptionConfig = findOptionConfig(
          currentOption.name,
          optionsConfig
        )
        if (currentOption.value !== null) {
          // `currentArg` contains a value
          const flag = currentArg.slice(0, currentArg.indexOf('='))
          if (currentOptionConfig === null) {
            throw new Error(`Invalid option: ${flag}`)
          }
          if (typeof options[currentOptionConfig.name] !== 'undefined') {
            throw new Error(`Duplicate option: ${flag}`)
          }
          try {
            if (currentOptionConfig.type === 'STRING') {
              options[currentOptionConfig.name] = currentOption.value
              index++ // consume `nextArg`
              continue
            }
            const parseValue = mapArgTypeToValueParser(currentOptionConfig.type)
            const value = parseValue(currentOption.value, `Option ${flag}`)
            options[currentOptionConfig.name] = value
            index++ // consume `nextArg`
            continue
          } catch (error) {
            if (error.message === '') {
              throw new Error(
                `Invalid value for option ${flag}: '${currentOption.value}'`
              )
            }
            throw error
          }
        }
        if (currentOptionConfig !== null) {
          if (typeof options[currentOptionConfig.name] !== 'undefined') {
            throw new Error(`Duplicate option: ${currentArg}`)
          }
          const nextArg = argsCopy[index + 1]
          if (currentOptionConfig.type === 'BOOLEAN') {
            options[currentOptionConfig.name] = true
            try {
              const boolean = parseBoolean(nextArg, `${currentArg}`)
              options[currentOptionConfig.name] = boolean
              index++ // consume `nextArg`
              continue
            } catch {
              continue // don't consume `nextArg`
            }
          }
          if (
            typeof nextArg === 'undefined' ||
            nextArg === stopParsingOptionsArg
          ) {
            // non-boolean options require a value
            throw new Error(
              mapArgTypeToErrorMessage(
                currentOptionConfig.type,
                `Option ${currentArg}`
              )
            )
          }
          const nextOption = parseOption(nextArg)
          if (nextOption !== null) {
            const nextOptionConfig = findOptionConfig(
              nextOption.name,
              optionsConfig
            )
            if (nextOptionConfig !== null) {
              // `nextArg` is a valid option, so assume that no value was specified
              // for the `currentOption`
              throw new Error(
                mapArgTypeToErrorMessage(
                  currentOptionConfig.type,
                  `Option ${currentArg}`
                )
              )
            }
          }
          try {
            const parseValue = mapArgTypeToValueParser(currentOptionConfig.type)
            const value = parseValue(nextArg, `Option ${currentArg}`)
            options[currentOptionConfig.name] = value
            index++ // consume `nextArg`
            continue
          } catch (error) {
            if (
              nextOption !== null &&
              typeof currentOptionConfig.type !== 'function'
            ) {
              // `nextOption` looks like an option, so assume that no value
              // was specified for the `currentOption`
              throw new Error(
                mapArgTypeToErrorMessage(
                  currentOptionConfig.type,
                  `Option ${currentArg}`
                )
              )
            }
            if (error.message === '') {
              throw new Error(
                `Invalid value for option ${currentArg}: '${nextArg}'`
              )
            }
            throw error
          }
        }
      }
    }
    const isInvalidOption =
      currentOption !== null && stopParsingOptions === false
    if (
      typeof positionalsConfig === 'undefined' ||
      positionalCount >= positionalsConfig.length
    ) {
      if (isInvalidOption === true) {
        throw new Error(`Invalid option: ${currentArg}`)
      }
      remainder.push(currentArg)
      continue
    }
    const positionalConfig = positionalsConfig[positionalCount]
    const positionalName = positionalConfig.name
    try {
      const parseValue = mapArgTypeToValueParser(positionalConfig.type)
      const value = parseValue(currentArg, `Argument <${positionalName}>`)
      positionals[positionalName] = value
      positionalCount++
      continue
    } catch (error) {
      if (isInvalidOption === true) {
        throw new Error(`Invalid option: ${currentArg}`)
      }
      if (error.message === '') {
        throw new Error(
          `Invalid value for argument <${positionalName}>: '${currentArg}'`
        )
      }
      throw error
    }
  }
  // resolve `defaults` and `required`
  if (typeof positionalsConfig !== 'undefined') {
    for (const positionalConfig of positionalsConfig) {
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
  if (typeof optionsConfig !== 'undefined') {
    for (const optionConfig of optionsConfig) {
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
  return {
    options: sortObjectByKey(camelCaseObjectKeys(options)),
    positionals: sortObjectByKey(camelCaseObjectKeys(positionals)),
    remainder
  }
}
