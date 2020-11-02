import { test } from 'tap'

import { PositionalConfig } from '../../../types'
import { parseArgs } from '../../parse-args'

test('no args', function (t) {
  t.plan(1)
  const args: Array<string> = []
  const positionalConfigs: Array<PositionalConfig> = [
    { name: 'foo', type: [42, -7] }
  ]
  const result = parseArgs(args, positionalConfigs, undefined)
  t.deepEqual(result, {
    options: {},
    positionals: {},
    remainder: []
  })
})

test('default', function (t) {
  t.plan(1)
  const args: Array<string> = []
  const positionalConfigs: Array<PositionalConfig> = [
    { default: 42, name: 'foo', type: [42, -7] }
  ]
  const result = parseArgs(args, positionalConfigs, undefined)
  t.deepEqual(result, {
    options: {},
    positionals: { foo: 42 },
    remainder: []
  })
})

test('required', function (t) {
  t.plan(1)
  const args: Array<string> = []
  const positionalConfigs: Array<PositionalConfig> = [
    { name: 'foo', required: true, type: [42, -7] }
  ]
  try {
    parseArgs(args, positionalConfigs, undefined)
    t.fail()
  } catch (error) {
    t.equal(error.message, 'Argument <foo> is required')
  }
})

test('true', function (t) {
  t.plan(1)
  const args: Array<string> = ['true']
  const positionalConfigs: Array<PositionalConfig> = [
    { name: 'foo', type: [42, -7] }
  ]
  try {
    parseArgs(args, positionalConfigs, undefined)
    t.fail()
  } catch (error) {
    t.equal(
      error.message,
      "Argument <foo> must be one of '42' or '-7' but got 'true'"
    )
  }
})

test('false', function (t) {
  t.plan(1)
  const args: Array<string> = ['false']
  const positionalConfigs: Array<PositionalConfig> = [
    { name: 'foo', type: [42, -7] }
  ]
  try {
    parseArgs(args, positionalConfigs, undefined)
    t.fail()
  } catch (error) {
    t.equal(
      error.message,
      "Argument <foo> must be one of '42' or '-7' but got 'false'"
    )
  }
})

test('number', function (t) {
  t.plan(1)
  const args: Array<string> = ['42']
  const positionalConfigs: Array<PositionalConfig> = [
    { name: 'foo', type: [42, -7] }
  ]
  const result = parseArgs(args, positionalConfigs, undefined)
  t.deepEqual(result, {
    options: {},
    positionals: { foo: 42 },
    remainder: []
  })
})

test('negative number', function (t) {
  t.plan(1)
  const args: Array<string> = ['-7']
  const positionalConfigs: Array<PositionalConfig> = [
    { name: 'foo', type: [42, -7] }
  ]
  const result = parseArgs(args, positionalConfigs, undefined)
  t.deepEqual(result, {
    options: {},
    positionals: { foo: -7 },
    remainder: []
  })
})

test('string', function (t) {
  t.plan(1)
  const args: Array<string> = ['bar']
  const positionalConfigs: Array<PositionalConfig> = [
    { name: 'foo', type: [42, -7] }
  ]
  try {
    parseArgs(args, positionalConfigs, undefined)
    t.fail()
  } catch (error) {
    t.equal(
      error.message,
      "Argument <foo> must be one of '42' or '-7' but got 'bar'"
    )
  }
})

test('string with dash', function (t) {
  t.plan(1)
  const args: Array<string> = ['-z']
  const positionalConfigs: Array<PositionalConfig> = [
    { name: 'foo', type: [42, -7] }
  ]
  try {
    parseArgs(args, positionalConfigs, undefined)
    t.fail()
  } catch (error) {
    t.equal(error.message, 'Invalid option: -z')
  }
})

test('double dash', function (t) {
  t.plan(1)
  const args: Array<string> = ['--']
  const positionalConfigs: Array<PositionalConfig> = [
    { name: 'foo', type: [42, -7] }
  ]
  const result = parseArgs(args, positionalConfigs, undefined)
  t.deepEqual(result, {
    options: {},
    positionals: {},
    remainder: []
  })
})

test('flag', function (t) {
  t.plan(1)
  const args: Array<string> = ['--foo']
  const positionalConfigs: Array<PositionalConfig> = [
    { name: 'foo', type: [42, -7] }
  ]
  try {
    parseArgs(args, positionalConfigs, undefined)
    t.fail()
  } catch (error) {
    t.equal(error.message, 'Invalid option: --foo')
  }
})

test('flag, true', function (t) {
  t.plan(1)
  const args: Array<string> = ['--foo', 'true']
  const positionalConfigs: Array<PositionalConfig> = [
    { name: 'foo', type: [42, -7] }
  ]
  try {
    parseArgs(args, positionalConfigs, undefined)
    t.fail()
  } catch (error) {
    t.equal(error.message, 'Invalid option: --foo')
  }
})

test('flag, false', function (t) {
  t.plan(1)
  const args: Array<string> = ['--foo', 'false']
  const positionalConfigs: Array<PositionalConfig> = [
    { name: 'foo', type: [42, -7] }
  ]
  try {
    parseArgs(args, positionalConfigs, undefined)
    t.fail()
  } catch (error) {
    t.equal(error.message, 'Invalid option: --foo')
  }
})

test('flag, number', function (t) {
  t.plan(1)
  const args: Array<string> = ['--foo', '42']
  const positionalConfigs: Array<PositionalConfig> = [
    { name: 'foo', type: [42, -7] }
  ]
  try {
    parseArgs(args, positionalConfigs, undefined)
    t.fail()
  } catch (error) {
    t.equal(error.message, 'Invalid option: --foo')
  }
})

test('flag, negative number', function (t) {
  t.plan(1)
  const args: Array<string> = ['--foo', '-7']
  const positionalConfigs: Array<PositionalConfig> = [
    { name: 'foo', type: [42, -7] }
  ]
  try {
    parseArgs(args, positionalConfigs, undefined)
    t.fail()
  } catch (error) {
    t.equal(error.message, 'Invalid option: --foo')
  }
})

test('flag, string', function (t) {
  t.plan(1)
  const args: Array<string> = ['--foo', 'bar']
  const positionalConfigs: Array<PositionalConfig> = [
    { name: 'foo', type: [42, -7] }
  ]
  try {
    parseArgs(args, positionalConfigs, undefined)
    t.fail()
  } catch (error) {
    t.equal(error.message, 'Invalid option: --foo')
  }
})

test('flag, string with dash', function (t) {
  t.plan(1)
  const args: Array<string> = ['--foo', '-z']
  const positionalConfigs: Array<PositionalConfig> = [
    { name: 'foo', type: [42, -7] }
  ]
  try {
    parseArgs(args, positionalConfigs, undefined)
    t.fail()
  } catch (error) {
    t.equal(error.message, 'Invalid option: --foo')
  }
})

test('flag, double dash', function (t) {
  t.plan(1)
  const args: Array<string> = ['--foo', '--']
  const positionalConfigs: Array<PositionalConfig> = [
    { name: 'foo', type: [42, -7] }
  ]
  try {
    parseArgs(args, positionalConfigs, undefined)
    t.fail()
  } catch (error) {
    t.equal(error.message, 'Invalid option: --foo')
  }
})
