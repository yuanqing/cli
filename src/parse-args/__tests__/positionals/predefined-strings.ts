import { test } from 'tap'

import { PositionalConfig } from '../../../types'
import { parseArgs } from '../../parse-args'

test('no args', function (t) {
  t.plan(1)
  const args: Array<string> = []
  const positionalConfigs: Array<PositionalConfig> = [
    { name: 'foo', type: ['bar', '-z'] }
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
    { default: 'bar', name: 'foo', type: ['bar', '-z'] }
  ]
  const result = parseArgs(args, positionalConfigs, undefined)
  t.deepEqual(result, {
    options: {},
    positionals: { foo: 'bar' },
    remainder: []
  })
})

test('required', function (t) {
  t.plan(1)
  const args: Array<string> = []
  const positionalConfigs: Array<PositionalConfig> = [
    { name: 'foo', required: true, type: ['bar', '-z'] }
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
  const args = ['true']
  const positionalConfigs: Array<PositionalConfig> = [
    { name: 'foo', type: ['bar', '-z'] }
  ]
  try {
    parseArgs(args, positionalConfigs, undefined)
    t.fail()
  } catch (error) {
    t.equal(
      error.message,
      "Argument <foo> must be one of 'bar' or '-z' but got 'true'"
    )
  }
})

test('false', function (t) {
  t.plan(1)
  const args = ['false']
  const positionalConfigs: Array<PositionalConfig> = [
    { name: 'foo', type: ['bar', '-z'] }
  ]
  try {
    parseArgs(args, positionalConfigs, undefined)
    t.fail()
  } catch (error) {
    t.equal(
      error.message,
      "Argument <foo> must be one of 'bar' or '-z' but got 'false'"
    )
  }
})

test('number', function (t) {
  t.plan(1)
  const args = ['42']
  const positionalConfigs: Array<PositionalConfig> = [
    { name: 'foo', type: ['bar', '-z'] }
  ]
  try {
    parseArgs(args, positionalConfigs, undefined)
    t.fail()
  } catch (error) {
    t.equal(
      error.message,
      "Argument <foo> must be one of 'bar' or '-z' but got '42'"
    )
  }
})

test('negative number', function (t) {
  t.plan(1)
  const args = ['-7']
  const positionalConfigs: Array<PositionalConfig> = [
    { name: 'foo', type: ['bar', '-z'] }
  ]
  try {
    parseArgs(args, positionalConfigs, undefined)
    t.fail()
  } catch (error) {
    t.equal(error.message, 'Invalid option: -7')
  }
})

test('string', function (t) {
  t.plan(1)
  const args = ['bar']
  const positionalConfigs: Array<PositionalConfig> = [
    { name: 'foo', type: ['bar', '-z'] }
  ]
  const result = parseArgs(args, positionalConfigs, undefined)
  t.deepEqual(result, {
    options: {},
    positionals: { foo: 'bar' },
    remainder: []
  })
})

test('string with dash', function (t) {
  t.plan(1)
  const args = ['-z']
  const positionalConfigs: Array<PositionalConfig> = [
    { name: 'foo', type: ['bar', '-z'] }
  ]
  const result = parseArgs(args, positionalConfigs, undefined)
  t.deepEqual(result, {
    options: {},
    positionals: { foo: '-z' },
    remainder: []
  })
})

test('double dash', function (t) {
  t.plan(1)
  const args = ['--']
  const positionalConfigs: Array<PositionalConfig> = [
    { name: 'foo', type: ['bar', '-z'] }
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
  const args = ['--foo']
  const positionalConfigs: Array<PositionalConfig> = [
    { name: 'foo', type: ['bar', '-z'] }
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
  const args = ['--foo', 'true']
  const positionalConfigs: Array<PositionalConfig> = [
    { name: 'foo', type: ['bar', '-z'] }
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
  const args = ['--foo', 'false']
  const positionalConfigs: Array<PositionalConfig> = [
    { name: 'foo', type: ['bar', '-z'] }
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
  const args = ['--foo', '42']
  const positionalConfigs: Array<PositionalConfig> = [
    { name: 'foo', type: ['bar', '-z'] }
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
  const args = ['--foo', '-7']
  const positionalConfigs: Array<PositionalConfig> = [
    { name: 'foo', type: ['bar', '-z'] }
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
  const args = ['--foo', 'bar']
  const positionalConfigs: Array<PositionalConfig> = [
    { name: 'foo', type: ['bar', '-z'] }
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
  const args = ['--foo', '-z']
  const positionalConfigs: Array<PositionalConfig> = [
    { name: 'foo', type: ['bar', '-z'] }
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
  const args = ['--foo', '--']
  const positionalConfigs: Array<PositionalConfig> = [
    { name: 'foo', type: ['bar', '-z'] }
  ]
  try {
    parseArgs(args, positionalConfigs, undefined)
    t.fail()
  } catch (error) {
    t.equal(error.message, 'Invalid option: --foo')
  }
})
