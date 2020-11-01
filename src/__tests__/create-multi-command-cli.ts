import { test } from 'tap'

import { createMultiCommandCli } from '../create-multi-command-cli'
import { CommandHandler, OptionConfig, PositionalConfig } from '../types'

const multiCommandCliConfig = {
  name: 'cli',
  version: '1.0.0'
}

function parseCustomType(value: string) {
  if (value === '-1') {
    return 'A'
  }
  if (value === '2') {
    return 'B'
  }
  return null
}

test('complex', function (t) {
  t.plan(3)
  const args: Array<string> = [
    'foo',
    'false',
    '42',
    'a',
    'x',
    '-3.142',
    '2',
    '--u',
    '--v',
    '24',
    '--w',
    'a',
    '--x',
    'x',
    '--y',
    '42',
    '--z',
    '-1',
    '--',
    'bar'
  ]
  const positionals: Array<PositionalConfig> = [
    { name: 'a', type: 'boolean' },
    { name: 'b', type: 'number' },
    { name: 'c', type: 'string' },
    { name: 'd', type: ['x', 'y'] },
    { name: 'e', type: [42, -3.142] },
    { name: 'f', type: parseCustomType }
  ]
  const options: Array<OptionConfig> = [
    { name: 'u', type: 'boolean' },
    { name: 'v', type: 'number' },
    { name: 'w', type: 'string' },
    { name: 'x', type: ['x', 'y'] },
    { name: 'y', type: [42, -3.142] },
    { name: 'z', type: parseCustomType }
  ]
  const handler: CommandHandler = function (positionals, options, remainder) {
    t.deepEqual(positionals, {
      a: false,
      b: 42,
      c: 'a',
      d: 'x',
      e: -3.142,
      f: 'B'
    })
    t.deepEqual(options, {
      u: true,
      v: 24,
      w: 'a',
      x: 'x',
      y: 42,
      z: 'A'
    })
    t.deepEqual(remainder, ['bar'])
  }
  createMultiCommandCli(args, multiCommandCliConfig, {
    foo: { handler, options, positionals }
  })
})
