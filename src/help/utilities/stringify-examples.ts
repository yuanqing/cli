export function stringifyExamples(
  name: string,
  examples: Array<string>
): string {
  const result = []
  for (const example of examples) {
    result.push(`    $ ${name} ${example}`)
  }
  return result.join('\n')
}
