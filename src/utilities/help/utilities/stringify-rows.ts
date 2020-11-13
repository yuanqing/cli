const spaceBetweenColumns = 2
const maxLength = 80

export function stringifyRows(rows: Array<[string, string]>): string {
  const firstColumnMaxLength = rows.reduce(function (
    maxLength: number,
    row: [string, string]
  ) {
    return row[0].length > maxLength ? row[0].length : maxLength
  },
  0)
  const firstColumnLength = firstColumnMaxLength + spaceBetweenColumns
  const result = []
  for (const row of rows) {
    const spaces = ' '.repeat(firstColumnLength - row[0].length)
    const secondColumn = wrapString(row[1], maxLength - firstColumnLength).join(
      `\n${' '.repeat(firstColumnLength)}`
    )
    result.push(`${row[0]}${spaces}${secondColumn}`)
  }
  return result.join('\n')
}

function wrapString(string: string, maxLineLength: number): Array<string> {
  const result = []
  let line = []
  let lineLength = 0
  for (const word of string.split(' ')) {
    if (lineLength + 1 + word.length < maxLineLength) {
      line.push(word)
      lineLength += 1 + word.length
      continue
    }
    if (line.length > 0) {
      result.push(line.join(' '))
      line = []
      lineLength = 0
    }
    line.push(word)
    lineLength += word.length
  }
  if (line.length > 0) {
    result.push(line.join(' '))
  }
  return result
}
