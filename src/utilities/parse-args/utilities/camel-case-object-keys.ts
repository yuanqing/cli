export function camelCaseObjectKeys(object: {
  [key: string]: unknown
}): { [key: string]: unknown } {
  const result: { [key: string]: unknown } = {}
  for (const key of Object.keys(object)) {
    result[convertSnakeCaseToCamelCase(key)] = object[key]
  }
  return result
}

const upperCaseCharacterRegex = /-(\w)/g

function convertSnakeCaseToCamelCase(string: string): string {
  return string.replace(upperCaseCharacterRegex, function (_, character) {
    return character.toUpperCase()
  })
}
