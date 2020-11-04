import { test } from 'tap'

import { OptionConfig, PositionalConfig } from '../../types'
import { parseArgs } from '../parse-args'

function parseCustomType(value: string): string {
  if (value === '-7') {
    return 'x'
  }
  if (value === 'bar') {
    return 'y'
  }
  throw new Error()
}

test('positionals', function (t) {
  t.plan(1)
  const args = ['true', '42', 'bar', '-7', 'bar', '-7']
  const positionalConfigs: Array<PositionalConfig> = [
    { name: 'a', type: 'boolean' },
    { name: 'b', type: 'number' },
    { name: 'c', type: 'string' },
    { name: 'd', type: [42, -7] },
    { name: 'e', type: ['bar', '-z'] },
    { name: 'f', type: parseCustomType }
  ]
  const result = parseArgs(args, positionalConfigs, undefined)
  t.deepEqual(result, {
    options: {},
    positionals: { a: true, b: 42, c: 'bar', d: -7, e: 'bar', f: 'x' },
    remainder: []
  })
})

test('options', function (t) {
  t.plan(1)
  const args = [
    '--u',
    '--v',
    '42',
    '--w',
    'bar',
    '--x',
    '-7',
    '--y',
    'bar',
    '--z',
    '-7'
  ]
  const optionConfigs: Array<OptionConfig> = [
    { name: 'u', type: 'boolean' },
    { name: 'v', type: 'number' },
    { name: 'w', type: 'string' },
    { name: 'x', type: [42, -7] },
    { name: 'y', type: ['bar', '-z'] },
    { name: 'z', type: parseCustomType }
  ]
  const result = parseArgs(args, undefined, optionConfigs)
  t.deepEqual(result, {
    options: { u: true, v: 42, w: 'bar', x: -7, y: 'bar', z: 'x' },
    positionals: {},
    remainder: []
  })
})

test('options, alias', function (t) {
  t.plan(1)
  const args = ['-f']
  const optionConfigs: Array<OptionConfig> = [
    { aliases: ['f'], name: 'foo', type: 'boolean' }
  ]
  const result = parseArgs(args, undefined, optionConfigs)
  t.deepEqual(result, {
    options: { foo: true }, // key will be `name`, not the alias
    positionals: {},
    remainder: []
  })
})

test('options, duplicate', function (t) {
  t.plan(1)
  const args = ['--foo', '--foo']
  const optionConfigs: Array<OptionConfig> = [{ name: 'foo', type: 'boolean' }]
  try {
    parseArgs(args, undefined, optionConfigs)
    t.fail()
  } catch (error) {
    t.equal(error.message, 'Duplicate option: --foo')
  }
})

test('remainder args', function (t) {
  t.plan(1)
  const args = ['--foo', '--', '--beep', 'boop']
  const optionConfigs: Array<OptionConfig> = [{ name: 'foo', type: 'boolean' }]
  const result = parseArgs(args, undefined, optionConfigs)
  t.deepEqual(result, {
    options: { foo: true },
    positionals: {},
    remainder: ['--beep', 'boop']
  })
})

test('complex', function (t) {
  t.plan(1)
  const args = [
    'true',
    '42',
    'bar',
    '-7',
    'bar',
    '-7',
    '--u',
    '--v',
    '42',
    '--w',
    'bar',
    '--x',
    '-7',
    '--y',
    'bar',
    '--z',
    '-7',
    '--',
    '--beep',
    'boop'
  ]
  const positionalConfigs: Array<PositionalConfig> = [
    { name: 'a', type: 'boolean' },
    { name: 'b', type: 'number' },
    { name: 'c', type: 'string' },
    { name: 'd', type: [42, -7] },
    { name: 'e', type: ['bar', '-z'] },
    { name: 'f', type: parseCustomType }
  ]
  const optionConfigs: Array<OptionConfig> = [
    { name: 'u', type: 'boolean' },
    { name: 'v', type: 'number' },
    { name: 'w', type: 'string' },
    { name: 'x', type: [42, -7] },
    { name: 'y', type: ['bar', '-z'] },
    { name: 'z', type: parseCustomType }
  ]
  const result = parseArgs(args, positionalConfigs, optionConfigs)
  t.deepEqual(result, {
    options: { u: true, v: 42, w: 'bar', x: -7, y: 'bar', z: 'x' },
    positionals: { a: true, b: 42, c: 'bar', d: -7, e: 'bar', f: 'x' },
    remainder: ['--beep', 'boop']
  })
})
