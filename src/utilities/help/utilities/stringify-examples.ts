export function stringifyExamples(
  name: string,
  examples: Array<string>
): string {
  const result = []
  for (const example of examples) {
    if (example === '') {
      result.push(`    $ ${name}`)
      continue
    }
    result.push(`    $ ${name} ${example}`)
  }
  return result.join('\n')
}
