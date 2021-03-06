#!/usr/bin/env node

import { createCli } from '@yuanqing/cli'

const config = {
  name: 'my-cli',
  version: '1.0.0'
}
const commandConfig = {
  positionals: [
    {
      type: 'STRING',
      name: 'glob-pattern',
      description: 'Glob of input files.',
      required: true,
    }
  ],
  options: [
    {
      type: 'BOOLEAN',
      name: 'minify',
      aliases: ['m'],
      description: 'Whether to minify the output.',
      default: false
    },
    {
      type: 'STRING',
      name: 'output',
      aliases: ['o'],
      description: "Set the output directory. Defaults to './build'.",
      default: './build'
    },
    {
      type: 'NON_ZERO_POSITIVE_INTEGER',
      name: 'parallel',
      aliases: ['p'],
      description: "Set the maximum number of files to process concurrently. Defaults to '3'.",
      default: 3
    }
  ],
  examples: [
    "'*' --minify",
    "'*' --output './dist'",
    "'*' --parallel 10"
  ]
}

try {
  const result = createCli(config, commandConfig)(process.argv.slice(2))
  if (typeof result !== 'undefined') {
    const { positionals, options, remainder } = result
    console.log(positionals)
    console.log(options)
    console.log(remainder)
  }
} catch (error) {
  console.error(error.message)
  process.exit(1)
}
