import { OptionConfig, PositionalConfig } from '../types'
import { findOptionConfig } from './utilities/find-option-config'
import { parseNumber } from './utilities/parse-number'
import { parseOptionName } from './utilities/parse-option-name'
import { stringifyValues } from './utilities/stringify-values'

const stopParsingOptionsMarker = '--'

export function parseArgs(
  args: Array<string>,
  positionalConfigs?: Array<PositionalConfig>,
  optionConfigs?: Array<OptionConfig>
): {
  positionals: { [key: string]: unknown }
  options: { [key: string]: unknown }
  remainder: Array<string>
} {
  const positionals: { [key: string]: unknown } = {}
  const options: { [key: string]: unknown } = {}
  const remainder: Array<string> = []
  let positionalIndex = 0
  let index = -1
  let stopParsingOptions = false
  while (++index < args.length) {
    const arg = args[index]
    const optionName = parseOptionName(arg)
    if (stopParsingOptions === true || optionName === null) {
      if (
        typeof positionalConfigs === 'undefined' ||
        positionalIndex >= positionalConfigs.length
      ) {
        remainder.push(arg)
        continue
      }
      const positionalConfig = positionalConfigs[positionalIndex]
      const positionalName = positionalConfig.name
      switch (positionalConfig.type) {
        case 'boolean': {
          if (arg === 'true') {
            positionals[positionalName] = true
            positionalIndex++
            continue
          }
          if (arg === 'false') {
            positionals[positionalName] = false
            positionalIndex++
            continue
          }
          throw new Error(
            `Positional <${positionalName}> must be one of 'true' or 'false' but got '${arg}'`
          )
        }
        case 'number': {
          const number = parseNumber(arg)
          if (number === null) {
            throw new Error(
              `Positional <${positionalName}> must be a number but got '${arg}'`
            )
          }
          positionals[positionalName] = number
          positionalIndex++
          continue
        }
        case 'string': {
          positionals[positionalName] = arg
          positionalIndex++
          continue
        }
        default: {
          if (Array.isArray(positionalConfig.type)) {
            if (positionalConfig.type.indexOf(arg) === -1) {
              throw new Error(
                `Positional <${positionalName}> must be one of ${stringifyValues(
                  positionalConfig.type
                )} but got '${arg}'`
              )
            }
            positionals[positionalName] = arg
            positionalIndex++
            continue
          }
          const value = positionalConfig.type(arg)
          if (value === null) {
            throw new Error(`Invalid positional <${positionalName}>: '${arg}'`)
          }
          positionals[positionalName] = value
          positionalIndex++
          continue
        }
      }
    }
    if (arg === stopParsingOptionsMarker) {
      stopParsingOptions = true
      continue
    }
    if (typeof options[optionName] !== 'undefined') {
      throw new Error(`Duplicate option: ${optionName}`)
    }
    if (typeof optionConfigs === 'undefined') {
      throw new Error(`Unrecognized option: ${optionName}`)
    }
    const optionConfig = findOptionConfig(optionName, optionConfigs)
    if (optionConfig === null) {
      throw new Error(`Unrecognized option: ${optionName}`)
    }
    const nextArg = args[index + 1]
    const isNextArgValid =
      typeof nextArg !== 'undefined' &&
      nextArg !== stopParsingOptionsMarker &&
      parseOptionName(nextArg) === null
    switch (optionConfig.type) {
      case 'boolean': {
        options[optionName] = true
        continue
      }
      case 'number': {
        const number = parseNumber(nextArg)
        if (number === null) {
          if (isNextArgValid === false) {
            throw new Error(`Option ${arg} must be a number`)
          }
          throw new Error(`Option ${arg} must be a number but got '${nextArg}'`)
        }
        options[optionName] = number
        index++ // consume `nextArg`
        continue
      }
      case 'string': {
        if (isNextArgValid === false) {
          throw new Error(`Option ${arg} must be a string`)
        }
        options[optionName] = nextArg
        index++ // consume `nextArg`
        continue
      }
      default: {
        if (Array.isArray(optionConfig.type)) {
          if (isNextArgValid === false) {
            throw new Error(
              `Option ${arg} must be one of ${stringifyValues(
                optionConfig.type
              )}`
            )
          }
          if (optionConfig.type.indexOf(nextArg) === -1) {
            throw new Error(
              `Option ${arg} must be one of ${stringifyValues(
                optionConfig.type
              )} but got '${nextArg}'`
            )
          }
          options[optionName] = nextArg
          index++ // consume `nextArg`
          continue
        }
        const value = optionConfig.type(nextArg)
        if (value === null) {
          if (isNextArgValid === false) {
            throw new Error(`Option ${arg} expects a value`)
          }
          throw new Error(`Invalid option ${arg}: '${nextArg}'`)
        }
        options[optionName] = value
        index++ // consume `nextArg`
      }
    }
  }
  if (typeof positionalConfigs !== 'undefined') {
    for (const positionalConfig of positionalConfigs) {
      const positionalName = positionalConfig.name
      if (typeof positionals[positionalName] === 'undefined') {
        if (typeof positionalConfig.default !== 'undefined') {
          positionals[positionalName] = positionalConfig.default
          continue
        }
        if (positionalConfig.required === true) {
          throw new Error(`Positional <${positionalConfig.name}> is required`)
        }
      }
    }
  }
  if (typeof optionConfigs !== 'undefined') {
    for (const optionConfig of optionConfigs) {
      const optionName = optionConfig.name
      if (typeof options[optionName] === 'undefined') {
        if (typeof optionConfig.default !== 'undefined') {
          options[optionName] = optionConfig.default
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
