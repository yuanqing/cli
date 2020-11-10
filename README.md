# @yuanqing/cli

## Example

<!-- ```js markdown-interpolate: cat example/single-command-cli.ts -->
```js
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
      name: 'files',
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
    console.log(positionals) //=> { files: '*' }
    console.log(options)     //=> { minify: true, output: './dist', parallel: 10 }
    console.log(remainder)   //=> [ 'foo', 'bar' ]
  }
} catch (error) {
  console.error(`my-cli: ${error.message}`)
  process.exit(1)
}
```
<!-- ``` end -->

```sh
$ my-cli '*' --minify --output './dist' --parallel 10 -- foo bar
{ files: '*' }
{ minify: true, output: './dist', parallel: 10 }
[ 'foo', 'bar' ]
```

```sh
$ my-cli --help

  Usage:
    $ my-cli <files> [options]

  Arguments:
    <files>  Glob of input files.

  Options:
    -h, --help      Print this message.
    -m, --minify    Whether to minify the output.
    -o, --output    Set the output directory. Defaults to './build'.
    -p, --parallel  Set the maximum number of files to process concurrently.
                    Defaults to '3'.
    -v, --version   Print the version.

  Examples:
    $ my-cli '*' --minify
    $ my-cli '*' --output './dist'
    $ my-cli '*' --parallel 10

```

```sh
$ my-cli --version
1.0.0
```

## Installation

```sh
$ npm install --dev @yuanqing/cli
```

## License

[MIT](/LICENSE.md)
