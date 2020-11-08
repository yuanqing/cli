import { Type, ValueParser } from '../types'
import { createEnumParser } from './parse-value/create-enum-parser'
import { parseBoolean } from './parse-value/parse-boolean'
import { parseInteger } from './parse-value/parse-integer'
import { parseIntegerPositive } from './parse-value/parse-integer-positive'
import { parseIntegerPositiveNonZero } from './parse-value/parse-integer-positive-non-zero'
import { parseNumber } from './parse-value/parse-number'
import { parseNumberPositive } from './parse-value/parse-number-positive'
import { parseNumberPositiveNonZero } from './parse-value/parse-number-positive-non-zero'
import { parseString } from './parse-value/parse-string'

export function mapArgTypeToValueParser(type: Type): ValueParser {
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
  }
  if (typeof type === 'function') {
    return type
  }
  return createEnumParser(type)
}
