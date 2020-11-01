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
            `Argument <${positionalName}> must be one of 'true' or 'false' but got '${arg}'`
          )
        }
        case 'number': {
          const number = parseNumber(arg)
          if (number === null) {
            throw new Error(
              `Argument <${positionalName}> must be a number but got '${arg}'`
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
            if (isNumberArray(positionalConfig.type)) {
              const number = parseNumber(arg)
              if (
                number === null ||
                positionalConfig.type.indexOf(number) === -1
              ) {
                throw new Error(
                  `Argument <${positionalName}> must be one of ${stringifyValues<
                    number
                  >(positionalConfig.type)} but got '${arg}'`
                )
              }
              positionals[positionalName] = number
              positionalIndex++
              continue
            }
            if (positionalConfig.type.indexOf(arg) === -1) {
              throw new Error(
                `Argument <${positionalName}> must be one of ${stringifyValues<
                  string
                >(positionalConfig.type)} but got '${arg}'`
              )
            }
            positionals[positionalName] = arg
            positionalIndex++
            continue
          }
          const value = positionalConfig.type(arg)
          if (value === null) {
            throw new Error(`Invalid argument <${positionalName}>: '${arg}'`)
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
    const optionConfig = findOptionConfig(optionName, optionConfigs)
    if (typeof optionConfigs === 'undefined' || optionConfig === null) {
      // Try to parse `arg` as a negative number for a positional argument
      if (typeof positionalConfigs !== 'undefined') {
        const positionalConfig = positionalConfigs[positionalIndex]
        if (typeof positionalConfig !== 'undefined') {
          const positionalName = positionalConfig.name
          if (typeof positionalConfig.type === 'function') {
            const value = positionalConfig.type(arg)
            if (value !== null) {
              positionals[positionalName] = value
              positionalIndex++
              continue
            }
          } else {
            const number = parseNumber(arg)
            if (number !== null) {
              if (
                positionalConfig.type === 'number' ||
                (Array.isArray(positionalConfig.type) &&
                  isNumberArray(positionalConfig.type) &&
                  positionalConfig.type.indexOf(number) !== -1)
              ) {
                positionals[positionalName] = number
                positionalIndex++
                continue
              }
            }
          }
        }
      }
      throw new Error(`Invalid option: ${arg}`)
    }
    if (typeof options[optionName] !== 'undefined') {
      throw new Error(`Duplicate option: ${arg}`)
    }
    const nextArg = args[index + 1]
    const isNextArgValid =
      typeof nextArg !== 'undefined' &&
      nextArg !== stopParsingOptionsMarker &&
      parseOptionName(nextArg) === null
    switch (optionConfig.type) {
      case 'boolean': {
        options[optionConfig.name] = true
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
        options[optionConfig.name] = number
        index++ // consume `nextArg`
        continue
      }
      case 'string': {
        if (isNextArgValid === false) {
          throw new Error(`Option ${arg} must be a string`)
        }
        options[optionConfig.name] = nextArg
        index++ // consume `nextArg`
        continue
      }
      default: {
        if (Array.isArray(optionConfig.type)) {
          if (isNumberArray(optionConfig.type)) {
            const number = parseNumber(nextArg)
            if (number === null || optionConfig.type.indexOf(number) === -1) {
              if (typeof nextArg === 'undefined') {
                throw new Error(
                  `Option ${arg} must be one of ${stringifyValues<number>(
                    optionConfig.type
                  )}`
                )
              }
              throw new Error(
                `Option ${arg} must be one of ${stringifyValues<number>(
                  optionConfig.type
                )} but got '${nextArg}'`
              )
            }
            options[optionConfig.name] = number
            index++ // consume `nextArg`
            continue
          }
          if (isNextArgValid === false) {
            throw new Error(
              `Option ${arg} must be one of ${stringifyValues<string>(
                optionConfig.type
              )}`
            )
          }
          if (optionConfig.type.indexOf(nextArg) === -1) {
            throw new Error(
              `Option ${arg} must be one of ${stringifyValues<string>(
                optionConfig.type
              )} but got '${nextArg}'`
            )
          }
          options[optionConfig.name] = nextArg
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
        options[optionConfig.name] = value
        index++ // consume `nextArg`
      }
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

function isNumberArray(
  array: Array<number> | Array<string>
): array is Array<number> {
  for (const value of array) {
    if (typeof value !== 'number') {
      return false
    }
  }
  return true
}
