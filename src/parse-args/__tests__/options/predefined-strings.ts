import { test } from 'tap'

import { OptionConfig } from '../../../types'
import { parseArgs } from '../../parse-args'

test('no args', function (t) {
  t.plan(1)
  const args: Array<string> = []
  const optionConfigs: Array<OptionConfig> = [
    { name: 'foo', type: ['bar', '-z'] }
  ]
  const result = parseArgs(args, undefined, optionConfigs)
  t.deepEqual(result, {
    options: {},
    positionals: {},
    remainder: []
  })
})

test('default', function (t) {
  t.plan(1)
  const args: Array<string> = []
  const optionConfigs: Array<OptionConfig> = [
    { default: 'bar', name: 'foo', type: ['bar', '-z'] }
  ]
  const result = parseArgs(args, undefined, optionConfigs)
  t.deepEqual(result, {
    options: { foo: 'bar' },
    positionals: {},
    remainder: []
  })
})

test('required', function (t) {
  t.plan(1)
  const args: Array<string> = []
  const optionConfigs: Array<OptionConfig> = [
    { name: 'foo', required: true, type: ['bar', '-z'] }
  ]
  try {
    parseArgs(args, undefined, optionConfigs)
    t.fail()
  } catch (error) {
    t.equal(error.message, 'Option --foo is required')
  }
})

test('true', function (t) {
  t.plan(1)
  const args = ['true']
  const optionConfigs: Array<OptionConfig> = [
    { name: 'foo', type: ['bar', '-z'] }
  ]
  const result = parseArgs(args, undefined, optionConfigs)
  t.deepEqual(result, {
    options: {},
    positionals: {},
    remainder: ['true']
  })
})

test('false', function (t) {
  t.plan(1)
  const args = ['false']
  const optionConfigs: Array<OptionConfig> = [
    { name: 'foo', type: ['bar', '-z'] }
  ]
  const result = parseArgs(args, undefined, optionConfigs)
  t.deepEqual(result, {
    options: {},
    positionals: {},
    remainder: ['false']
  })
})

test('number', function (t) {
  t.plan(1)
  const args = ['42']
  const optionConfigs: Array<OptionConfig> = [
    { name: 'foo', type: ['bar', '-z'] }
  ]
  const result = parseArgs(args, undefined, optionConfigs)
  t.deepEqual(result, {
    options: {},
    positionals: {},
    remainder: ['42']
  })
})

test('negative number', function (t) {
  t.plan(1)
  const args = ['-7']
  const optionConfigs: Array<OptionConfig> = [
    { name: 'foo', type: ['bar', '-z'] }
  ]
  try {
    parseArgs(args, undefined, optionConfigs)
    t.fail()
  } catch (error) {
    t.equal(error.message, 'Invalid option: -7')
  }
})

test('string', function (t) {
  t.plan(1)
  const args = ['bar']
  const optionConfigs: Array<OptionConfig> = [
    { name: 'foo', type: ['bar', '-z'] }
  ]
  const result = parseArgs(args, undefined, optionConfigs)
  t.deepEqual(result, {
    options: {},
    positionals: {},
    remainder: ['bar']
  })
})

test('string with dash', function (t) {
  t.plan(1)
  const args = ['-z']
  const optionConfigs: Array<OptionConfig> = [
    { name: 'foo', type: ['bar', '-z'] }
  ]
  try {
    parseArgs(args, undefined, optionConfigs)
    t.fail()
  } catch (error) {
    t.equal(error.message, 'Invalid option: -z')
  }
})

test('double dash', function (t) {
  t.plan(1)
  const args = ['--']
  const optionConfigs: Array<OptionConfig> = [
    { name: 'foo', type: ['bar', '-z'] }
  ]
  const result = parseArgs(args, undefined, optionConfigs)
  t.deepEqual(result, {
    options: {},
    positionals: {},
    remainder: []
  })
})

test('flag', function (t) {
  t.plan(1)
  const args = ['--foo']
  const optionConfigs: Array<OptionConfig> = [
    { name: 'foo', type: ['bar', '-z'] }
  ]
  try {
    parseArgs(args, undefined, optionConfigs)
    t.fail()
  } catch (error) {
    t.equal(error.message, "Option --foo must be one of 'bar' or '-z'")
  }
})

test('flag, true', function (t) {
  t.plan(1)
  const args = ['--foo', 'true']
  const optionConfigs: Array<OptionConfig> = [
    { name: 'foo', type: ['bar', '-z'] }
  ]
  try {
    parseArgs(args, undefined, optionConfigs)
    t.fail()
  } catch (error) {
    t.equal(
      error.message,
      "Option --foo must be one of 'bar' or '-z' but got 'true'"
    )
  }
})

test('flag, false', function (t) {
  t.plan(1)
  const args = ['--foo', 'false']
  const optionConfigs: Array<OptionConfig> = [
    { name: 'foo', type: ['bar', '-z'] }
  ]
  try {
    parseArgs(args, undefined, optionConfigs)
    t.fail()
  } catch (error) {
    t.equal(
      error.message,
      "Option --foo must be one of 'bar' or '-z' but got 'false'"
    )
  }
})

test('flag, number', function (t) {
  t.plan(1)
  const args = ['--foo', '42']
  const optionConfigs: Array<OptionConfig> = [
    { name: 'foo', type: ['bar', '-z'] }
  ]
  try {
    parseArgs(args, undefined, optionConfigs)
    t.fail()
  } catch (error) {
    t.equal(
      error.message,
      "Option --foo must be one of 'bar' or '-z' but got '42'"
    )
  }
})

test('flag, negative number', function (t) {
  t.plan(1)
  const args = ['--foo', '-7']
  const optionConfigs: Array<OptionConfig> = [
    { name: 'foo', type: ['bar', '-z'] }
  ]
  try {
    parseArgs(args, undefined, optionConfigs)
    t.fail()
  } catch (error) {
    t.equal(error.message, "Option --foo must be one of 'bar' or '-z'")
  }
})

test('flag, string', function (t) {
  t.plan(1)
  const args = ['--foo', 'bar']
  const optionConfigs: Array<OptionConfig> = [
    { name: 'foo', type: ['bar', '-z'] }
  ]
  const result = parseArgs(args, undefined, optionConfigs)
  t.deepEqual(result, {
    options: { foo: 'bar' },
    positionals: {},
    remainder: []
  })
})

test('flag, string with dash', function (t) {
  t.plan(1)
  const args = ['--foo', '-z']
  const optionConfigs: Array<OptionConfig> = [
    { name: 'foo', type: ['bar', '-z'] }
  ]
  const result = parseArgs(args, undefined, optionConfigs)
  t.deepEqual(result, {
    options: { foo: '-z' },
    positionals: {},
    remainder: []
  })
})

test('flag, double dash', function (t) {
  t.plan(1)
  const args = ['--foo', '--']
  const optionConfigs: Array<OptionConfig> = [
    { name: 'foo', type: ['bar', '-z'] }
  ]
  try {
    parseArgs(args, undefined, optionConfigs)
    t.fail()
  } catch (error) {
    t.equal(error.message, "Option --foo must be one of 'bar' or '-z'")
  }
})
