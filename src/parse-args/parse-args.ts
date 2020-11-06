import { OptionConfig, PositionalConfig } from '../types'
import { findOptionConfig } from './utilities/find-option-config'
import { parseFlag } from './utilities/parse-flag'
import { parseNumber } from './utilities/parse-number'
import { stringifyValues } from './utilities/stringify-values'

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
  const positionals: { [key: string]: unknown } = {}
  const options: { [key: string]: unknown } = {}
  const remainder: Array<string> = []
  let positionalIndex = 0
  let index = -1
  let stopParsingOptions = false
  while (++index < args.length) {
    const arg = args[index]
    if (stopParsingOptions === false && arg === stopParsingOptionsArg) {
      stopParsingOptions = true
      continue
    }
    const optionConfig = findOptionConfig(arg, optionConfigs)
    if (stopParsingOptions === true || optionConfig === null) {
      const isArgFlag = parseFlag(arg) !== null && stopParsingOptions === false
      if (
        typeof positionalConfigs === 'undefined' ||
        positionalIndex >= positionalConfigs.length
      ) {
        if (isArgFlag === true) {
          throw new Error(`Invalid option: ${arg}`)
        }
        remainder.push(arg)
        continue
      }
      const positionalConfig = positionalConfigs[positionalIndex]
      const positionalName = positionalConfig.name
      switch (positionalConfig.type) {
        case 'boolean': {
          if (arg === 'true' || arg === '1') {
            positionals[positionalName] = true
            positionalIndex++
            continue
          }
          if (arg === 'false' || arg === '0') {
            positionals[positionalName] = false
            positionalIndex++
            continue
          }
          if (isArgFlag === true) {
            throw new Error(`Invalid option: ${arg}`)
          }
          throw new Error(
            `Argument <${positionalName}> must be one of 'true' or 'false' but got '${arg}'`
          )
        }
        case 'number': {
          const number = parseNumber(arg)
          if (number === null) {
            if (isArgFlag === true) {
              throw new Error(`Invalid option: ${arg}`)
            }
            throw new Error(
              `Argument <${positionalName}> must be a number but got '${arg}'`
            )
          }
          positionals[positionalName] = number
          positionalIndex++
          continue
        }
        case 'string': {
          if (isArgFlag === true) {
            throw new Error(`Invalid option: ${arg}`)
          }
          positionals[positionalName] = arg
          positionalIndex++
          continue
        }
        default: {
          if (Array.isArray(positionalConfig.type)) {
            if (isNumberArray(positionalConfig.type)) {
              // `positionalConfig.type` is Array<number>
              const number = parseNumber(arg)
              if (
                number === null ||
                positionalConfig.type.indexOf(number) === -1
              ) {
                if (isArgFlag === true) {
                  throw new Error(`Invalid option: ${arg}`)
                }
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
            // `positionalConfig.type` is Array<string>
            if (positionalConfig.type.indexOf(arg) === -1) {
              if (isArgFlag === true) {
                throw new Error(`Invalid option: ${arg}`)
              }
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
          // `positionalConfig.type` is a function
          try {
            const value = positionalConfig.type(arg)
            positionals[positionalName] = value
            positionalIndex++
            continue
          } catch (error) {
            if (isArgFlag === true) {
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
      }
    }
    if (typeof options[optionConfig.name] !== 'undefined') {
      throw new Error(`Duplicate option: ${arg}`)
    }
    const nextArg: undefined | string = args[index + 1]
    const isNextArgUndefined = typeof nextArg === 'undefined'
    const isNextArgFlag =
      parseFlag(nextArg) !== null || nextArg === stopParsingOptionsArg
    switch (optionConfig.type) {
      case 'boolean': {
        options[optionConfig.name] = true
        if (nextArg === 'true' || nextArg === '1') {
          index++ // consume `nextArg`
          continue
        }
        if (nextArg === 'false' || nextArg === '0') {
          options[optionConfig.name] = false
          index++ // consume `nextArg`
          continue
        }
        continue
      }
      case 'number': {
        if (isNextArgUndefined === true) {
          throw new Error(`Option ${arg} must be a number`)
        }
        const number = parseNumber(nextArg)
        if (number === null) {
          if (isNextArgFlag === true) {
            throw new Error(`Option ${arg} must be a number`)
          }
          throw new Error(`Option ${arg} must be a number but got '${nextArg}'`)
        }
        options[optionConfig.name] = number
        index++ // consume `nextArg`
        continue
      }
      case 'string': {
        if (isNextArgUndefined === true || isNextArgFlag === true) {
          throw new Error(`Option ${arg} expects a value`)
        }
        options[optionConfig.name] = nextArg
        index++ // consume `nextArg`
        continue
      }
      default: {
        if (Array.isArray(optionConfig.type)) {
          if (isNextArgUndefined === true) {
            throw new Error(
              `Option ${arg} must be one of ${stringifyValues<number | string>(
                optionConfig.type
              )}`
            )
          }
          if (isNumberArray(optionConfig.type)) {
            // `optionConfig.type` is Array<number>
            const number = parseNumber(nextArg)
            if (number === null || optionConfig.type.indexOf(number) === -1) {
              if (isNextArgFlag === true) {
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
          // `optionConfig.type` is Array<string>
          if (optionConfig.type.indexOf(nextArg) === -1) {
            if (isNextArgFlag === true) {
              // `nextArg` is a valid option flag
              throw new Error(
                `Option ${arg} must be one of ${stringifyValues<string>(
                  optionConfig.type
                )}`
              )
            }
            // `nextArg` is not an option flag
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
        // `optionConfig.type` is a function
        if (isNextArgUndefined === true || nextArg === stopParsingOptionsArg) {
          throw new Error(`Option ${arg} expects a value`)
        }
        try {
          const value = optionConfig.type(nextArg)
          options[optionConfig.name] = value
          index++ // consume `nextArg`
          continue
        } catch (error) {
          if (isNextArgFlag === true) {
            throw new Error(`Option ${arg} expects a value`)
          }
          throw new Error(`Invalid value for option ${arg}: '${nextArg}'`)
        }
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
