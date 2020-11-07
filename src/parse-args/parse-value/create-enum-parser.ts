import { stringifyEnum } from '../stringify-enum'
import { falseRegex, trueRegex } from './regex'

export function createEnumParser(
  values: Array<boolean | number | string | null>
) {
  return function (
    arg: string,
    name: string
  ): boolean | number | string | null {
    for (const value of values) {
      if (value === false && falseRegex.test(arg) === true) {
        return false
      }
      if (value === true && trueRegex.test(arg) === true) {
        return true
      }
      if (value === null && arg === 'null') {
        return null
      }
      if (typeof value === 'string' && arg === value) {
        return value
      }
      if (typeof value === 'number') {
        const number = parseFloat(arg)
        if (isNaN(number) === false && number === value) {
          return number
        }
      }
    }
    throw new Error(
      `${name} must be one of ${stringifyEnum(values)} but got '${arg}'`
    )
  }
}
