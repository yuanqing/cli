import { ArgType } from '../types'
import { createEnumParser } from './parse-value/create-enum-parser'
import { parseBoolean } from './parse-value/parse-boolean'
import { parseInteger } from './parse-value/parse-integer'
import { parseIntegerPositive } from './parse-value/parse-integer-positive'
import { parseIntegerPositiveNonZero } from './parse-value/parse-integer-positive-non-zero'
import { parseNumber } from './parse-value/parse-number'
import { parseNumberPositive } from './parse-value/parse-number-positive'
import { parseNumberPositiveNonZero } from './parse-value/parse-number-positive-non-zero'
import { parseString } from './parse-value/parse-string'

export function mapArgTypeToValueParser(
  type: ArgType
): (arg: string, name: string) => unknown {
  if (typeof type === 'function') {
    return type
  }
  if (typeof type === 'string') {
    switch (type) {
      case 'boolean': {
        return parseBoolean
      }
      case 'number': {
        return parseNumber
      }
      case 'positive number': {
        return parseNumberPositive
      }
      case 'non-zero positive number': {
        return parseNumberPositiveNonZero
      }
      case 'integer': {
        return parseInteger
      }
      case 'positive integer': {
        return parseIntegerPositive
      }
      case 'non-zero positive integer': {
        return parseIntegerPositiveNonZero
      }
      case 'string': {
        return parseString
      }
    }
  }
  return createEnumParser(type)
}
