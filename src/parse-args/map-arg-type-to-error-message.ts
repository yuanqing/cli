import { Type } from '../types'
import { stringifyEnum } from './stringify-enum'

export function mapArgTypeToErrorMessage(type: Type, name: string): string {
  switch (type) {
    case 'BOOLEAN': {
      return `${name} must be one one of 'false', 'true', '0', or '1'`
    }
    case 'NUMBER': {
      return `${name} must be a number`
    }
    case 'POSITIVE_NUMBER': {
      return `${name} must be a positive number`
    }
    case 'NON_ZERO_POSITIVE_NUMBER': {
      return `${name} must be a non-zero positive number`
    }
    case 'INTEGER': {
      return `${name} must be an integer`
    }
    case 'POSITIVE_INTEGER': {
      return `${name} must be a postive integer`
    }
    case 'NON_ZERO_POSITIVE_INTEGER': {
      return `${name} must be a non-zero positive integer`
    }
    case 'STRING': {
      return `${name} must be a string`
    }
  }
  if (typeof type === 'function') {
    return `${name} expects a value`
  }
  return `${name} must be one of ${stringifyEnum(type)}`
}
