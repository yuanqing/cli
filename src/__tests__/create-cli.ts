import { test } from 'tap'

import { createCli } from '../create-cli'
import { CommandHandler, OptionConfig, PositionalConfig } from '../types'

const cliConfig = {
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

test('invalid option', function (t) {
  t.plan(1)
  const args: Array<string> = ['--bar']
  const positionals: Array<PositionalConfig> = [
    { name: 'foo', type: 'boolean' }
  ]
  const handler: CommandHandler = function () {
    t.fail()
  }
  try {
    createCli(args, cliConfig, { handler, positionals })
  } catch (error) {
    t.equal(error.message, 'Invalid option: --bar')
  }
})

test('duplicate option', function (t) {
  t.plan(1)
  const args: Array<string> = ['--foo', '--foo']
  const options: Array<OptionConfig> = [{ name: 'foo', type: 'boolean' }]
  const handler: CommandHandler = function () {
    t.fail()
  }
  try {
    createCli(args, cliConfig, { handler, options })
  } catch (error) {
    t.equal(error.message, 'Duplicate option: --foo')
  }
})

test('stop parsing options after `--`', function (t) {
  t.plan(3)
  const args: Array<string> = ['--foo', '--', '--foo', '--bar']
  const options: Array<OptionConfig> = [{ name: 'foo', type: 'boolean' }]
  const handler: CommandHandler = function (positionals, options, remainder) {
    t.deepEqual(positionals, {})
    t.deepEqual(options, { foo: true })
    t.deepEqual(remainder, ['--foo', '--bar'])
  }
  createCli(args, cliConfig, { handler, options })
})

test('option shorthands', function (t) {
  t.plan(3)
  const args: Array<string> = ['-f', '-b', '42', '--baz', 'a']
  const options: Array<OptionConfig> = [
    { name: 'foo', shorthands: ['f'], type: 'boolean' },
    { name: 'bar', shorthands: ['b'], type: 'number' },
    { name: 'baz', type: 'string' }
  ]
  const handler: CommandHandler = function (positionals, options, remainder) {
    t.deepEqual(positionals, {})
    t.deepEqual(options, { bar: 42, baz: 'a', foo: true })
    t.deepEqual(remainder, [])
  }
  createCli(args, cliConfig, { handler, options })
})

test('multiple positionals', function (t) {
  t.plan(3)
  const args: Array<string> = ['false', '42', 'a', 'x', '-3.142', '2']
  const positionals: Array<PositionalConfig> = [
    { name: 'a', type: 'boolean' },
    { name: 'b', type: 'number' },
    { name: 'c', type: 'string' },
    { name: 'd', type: ['x', 'y'] },
    { name: 'e', type: [42, -3.142] },
    { name: 'f', type: parseCustomType }
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
    t.deepEqual(options, {})
    t.deepEqual(remainder, [])
  }
  createCli(args, cliConfig, { handler, positionals })
})

test('multiple options', function (t) {
  t.plan(3)
  const args: Array<string> = [
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
    '-1'
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
    t.deepEqual(positionals, {})
    t.deepEqual(options, {
      u: true,
      v: 24,
      w: 'a',
      x: 'x',
      y: 42,
      z: 'A'
    })
    t.deepEqual(remainder, [])
  }
  createCli(args, cliConfig, { handler, options })
})

test('complex', function (t) {
  t.plan(3)
  const args: Array<string> = [
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
  createCli(args, cliConfig, { handler, options, positionals })
})
