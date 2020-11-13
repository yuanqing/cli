import { Type, ValueParser } from '../../../types'
import { createEnumParser } from './value-parser/create-enum-parser'
import { parseBoolean } from './value-parser/parse-boolean'
import { parseInteger } from './value-parser/parse-integer'
import { parseIntegerPositive } from './value-parser/parse-integer-positive'
import { parseIntegerPositiveNonZero } from './value-parser/parse-integer-positive-non-zero'
import { parseNumber } from './value-parser/parse-number'
import { parseNumberPositive } from './value-parser/parse-number-positive'
import { parseNumberPositiveNonZero } from './value-parser/parse-number-positive-non-zero'
import { parseString } from './value-parser/parse-string'

export function mapArgTypeToValueParser(type: Type): ValueParser {
  if (typeof type === 'string') {
    switch (type) {
      case 'BOOLEAN': {
        return parseBoolean
      }
      case 'NUMBER': {
        return parseNumber
      }
      case 'POSITIVE_NUMBER': {
        return parseNumberPositive
      }
      case 'NON_ZERO_POSITIVE_NUMBER': {
        return parseNumberPositiveNonZero
      }
      case 'INTEGER': {
        return parseInteger
      }
      case 'POSITIVE_INTEGER': {
        return parseIntegerPositive
      }
      case 'NON_ZERO_POSITIVE_INTEGER': {
        return parseIntegerPositiveNonZero
      }
      case 'STRING': {
        return parseString
      }
      default: {
        throw new Error('Invalid type')
      }
    }
  }
  if (typeof type === 'function') {
    return type
  }
  return createEnumParser(type)
}
