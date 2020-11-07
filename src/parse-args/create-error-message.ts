import { ArgType } from '../types'
import { stringifyEnum } from './stringify-enum'

export function createErrorMessage(type: ArgType, name: string): string {
  if (typeof type === 'function') {
    return `${name} expects a value`
  }
  if (typeof type === 'string') {
    return `${name} must be a ${type}`
  }
  return `${name} must be one of ${stringifyEnum(type)}`
}
