import { OptionConfig, PositionalConfig } from '../types'
import { createErrorMessage } from './create-error-message'
import { findOptionConfig } from './find-option-config'
import { mapArgTypeToValueParser } from './map-arg-type-to-value-parser'
import { parseOptionFlag } from './parse-option-flag'
import { parseBoolean } from './parse-value/parse-boolean'
import { sortObjectByKey } from './sort-object-by-key'

const stopParsingOptionsArg = '--' // stop parsing options when we see this

export function parseArgs(
  args: Array<string>,
  positionalConfigs?: Array<PositionalConfig>,
  optionConfigs?: Array<OptionConfig>,
  shorthands?: { [key: string]: Array<string> }
): {
  positionals: { [key: string]: unknown }
  options: { [key: string]: unknown }
  remainder: Array<string>
} {
  const argsCopy =
    typeof shorthands === 'undefined'
      ? args.slice()
      : insertShorthands(args, shorthands)
  const positionals: { [key: string]: unknown } = {}
  const options: { [key: string]: unknown } = {}
  const remainder: Array<string> = []
  let stopParsingOptions = false
  let positionalIndex = 0
  let index = -1
  while (++index < argsCopy.length) {
    const arg = argsCopy[index]
    const option = parseOptionFlag(arg)
    if (stopParsingOptions === false) {
      // try to parse `arg` as an option
      if (arg === stopParsingOptionsArg) {
        stopParsingOptions = true
        continue
      }
      if (option !== null && typeof optionConfigs !== 'undefined') {
        if (option.value !== null) {
          // insert `value` after `argCopy[index]`
          argsCopy.splice(index + 1, 0, option.value)
        }
        const optionConfig = findOptionConfig(option.name, optionConfigs)
        if (optionConfig !== null) {
          if (typeof options[optionConfig.name] !== 'undefined') {
            throw new Error(`Duplicate option: ${arg}`)
          }
          const nextArg = argsCopy[index + 1]
          const nextArgOption = parseOptionFlag(nextArg)
          const isNextArgUndefined =
            typeof nextArg === 'undefined' || nextArg === stopParsingOptionsArg
          if (optionConfig.type === 'boolean') {
            options[optionConfig.name] = true
            if (isNextArgUndefined === false && nextArgOption === null) {
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
            throw new Error(
              createErrorMessage(optionConfig.type, `Option ${arg}`)
            )
          }
          try {
            const valueParser = mapArgTypeToValueParser(optionConfig.type)
            const value = valueParser(nextArg, `Option ${arg}`)
            options[optionConfig.name] = value
            index++ // consume `nextArg`
            continue
          } catch (error) {
            if (nextArgOption !== null) {
              if (typeof optionConfig.type !== 'function') {
                // if `optionConfig.type` _isn't_ a function: assume no value was specified
                throw new Error(
                  createErrorMessage(optionConfig.type, `Option ${arg}`)
                )
              }
              // if `optionConfig.type` _is_ a function: assume no value was specified iff
              // `nextArg` is actually a valid option name that was specified in `optionConfigs`
              const nextArgOptionConfig = findOptionConfig(
                nextArgOption.name,
                optionConfigs
              )
              if (nextArgOptionConfig !== null) {
                throw new Error(
                  createErrorMessage(optionConfig.type, `Option ${arg}`)
                )
              }
            }
            if (error.message === '') {
              throw new Error(`Invalid value for option ${arg}: '${nextArg}'`)
            }
            throw error
          }
        }
      }
    }
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
  // resolve `defaults` and `required`
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
  return {
    options: sortObjectByKey(options),
    positionals: sortObjectByKey(positionals),
    remainder
  }
}

function insertShorthands(
  args: Array<string>,
  shorthands: { [key: string]: Array<string> }
): Array<string> {
  const result: Array<string> = []
  let stopParsingOptions = false
  for (const arg of args) {
    if (arg === stopParsingOptionsArg) {
      // stop inserting shorthand args when we encounter `stopParsingOptionsArg`
      stopParsingOptions = true
    }
    if (stopParsingOptions === true) {
      result.push(arg)
      continue
    }
    const option = parseOptionFlag(arg)
    if (option === null || typeof shorthands[option.name] === 'undefined') {
      result.push(arg)
      continue
    }
    for (const shorthandArg of shorthands[option.name]) {
      result.push(shorthandArg)
    }
  }
  return result
}
