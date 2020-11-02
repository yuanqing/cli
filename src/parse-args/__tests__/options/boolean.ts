import { test } from 'tap'

import { OptionConfig } from '../../../types'
import { parseArgs } from '../../parse-args'

test('no args', function (t) {
  t.plan(1)
  const args: Array<string> = []
  const optionConfigs: Array<OptionConfig> = [{ name: 'foo', type: 'boolean' }]
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
    { default: true, name: 'foo', type: 'boolean' }
  ]
  const result = parseArgs(args, undefined, optionConfigs)
  t.deepEqual(result, {
    options: { foo: true },
    positionals: {},
    remainder: []
  })
})

test('required', function (t) {
  t.plan(1)
  const args: Array<string> = []
  const optionConfigs: Array<OptionConfig> = [
    { name: 'foo', required: true, type: 'boolean' }
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
  const args: Array<string> = ['true']
  const optionConfigs: Array<OptionConfig> = [{ name: 'foo', type: 'boolean' }]
  const result = parseArgs(args, undefined, optionConfigs)
  t.deepEqual(result, {
    options: {},
    positionals: {},
    remainder: ['true']
  })
})

test('false', function (t) {
  t.plan(1)
  const args: Array<string> = ['false']
  const optionConfigs: Array<OptionConfig> = [{ name: 'foo', type: 'boolean' }]
  const result = parseArgs(args, undefined, optionConfigs)
  t.deepEqual(result, {
    options: {},
    positionals: {},
    remainder: ['false']
  })
})

test('number', function (t) {
  t.plan(1)
  const args: Array<string> = ['42']
  const optionConfigs: Array<OptionConfig> = [{ name: 'foo', type: 'boolean' }]
  const result = parseArgs(args, undefined, optionConfigs)
  t.deepEqual(result, {
    options: {},
    positionals: {},
    remainder: ['42']
  })
})

test('negative number', function (t) {
  t.plan(1)
  const args: Array<string> = ['-7']
  const optionConfigs: Array<OptionConfig> = [{ name: 'foo', type: 'boolean' }]
  try {
    parseArgs(args, undefined, optionConfigs)
    t.fail()
  } catch (error) {
    t.equal(error.message, 'Invalid option: -7')
  }
})

test('string', function (t) {
  t.plan(1)
  const args: Array<string> = ['bar']
  const optionConfigs: Array<OptionConfig> = [{ name: 'foo', type: 'boolean' }]
  const result = parseArgs(args, undefined, optionConfigs)
  t.deepEqual(result, {
    options: {},
    positionals: {},
    remainder: ['bar']
  })
})

test('string with dash', function (t) {
  t.plan(1)
  const args: Array<string> = ['-z']
  const optionConfigs: Array<OptionConfig> = [{ name: 'foo', type: 'boolean' }]
  try {
    parseArgs(args, undefined, optionConfigs)
    t.fail()
  } catch (error) {
    t.equal(error.message, 'Invalid option: -z')
  }
})

test('double dash', function (t) {
  t.plan(1)
  const args: Array<string> = ['--']
  const optionConfigs: Array<OptionConfig> = [{ name: 'foo', type: 'boolean' }]
  const result = parseArgs(args, undefined, optionConfigs)
  t.deepEqual(result, {
    options: {},
    positionals: {},
    remainder: []
  })
})

test('flag', function (t) {
  t.plan(1)
  const args: Array<string> = ['--foo']
  const optionConfigs: Array<OptionConfig> = [{ name: 'foo', type: 'boolean' }]
  const result = parseArgs(args, undefined, optionConfigs)
  t.deepEqual(result, {
    options: { foo: true },
    positionals: {},
    remainder: []
  })
})

test('flag, true', function (t) {
  t.plan(1)
  const args: Array<string> = ['--foo', 'true']
  const optionConfigs: Array<OptionConfig> = [{ name: 'foo', type: 'boolean' }]
  const result = parseArgs(args, undefined, optionConfigs)
  t.deepEqual(result, {
    options: { foo: true },
    positionals: {},
    remainder: ['true']
  })
})

test('flag, false', function (t) {
  t.plan(1)
  const args: Array<string> = ['--foo', 'false']
  const optionConfigs: Array<OptionConfig> = [{ name: 'foo', type: 'boolean' }]
  const result = parseArgs(args, undefined, optionConfigs)
  t.deepEqual(result, {
    options: { foo: true },
    positionals: {},
    remainder: ['false']
  })
})

test('flag, number', function (t) {
  t.plan(1)
  const args: Array<string> = ['--foo', '42']
  const optionConfigs: Array<OptionConfig> = [{ name: 'foo', type: 'boolean' }]
  const result = parseArgs(args, undefined, optionConfigs)
  t.deepEqual(result, {
    options: { foo: true },
    positionals: {},
    remainder: ['42']
  })
})

test('flag, negative number', function (t) {
  t.plan(1)
  const args: Array<string> = ['--foo', '-7']
  const optionConfigs: Array<OptionConfig> = [{ name: 'foo', type: 'boolean' }]
  try {
    parseArgs(args, undefined, optionConfigs)
    t.fail()
  } catch (error) {
    t.equal(error.message, 'Invalid option: -7')
  }
})

test('flag, string', function (t) {
  t.plan(1)
  const args: Array<string> = ['--foo', 'bar']
  const optionConfigs: Array<OptionConfig> = [{ name: 'foo', type: 'boolean' }]
  const result = parseArgs(args, undefined, optionConfigs)
  t.deepEqual(result, {
    options: { foo: true },
    positionals: {},
    remainder: ['bar']
  })
})

test('flag, string with dash', function (t) {
  t.plan(1)
  const args: Array<string> = ['--foo', '-z']
  const optionConfigs: Array<OptionConfig> = [{ name: 'foo', type: 'boolean' }]
  try {
    parseArgs(args, undefined, optionConfigs)
    t.fail()
  } catch (error) {
    t.equal(error.message, 'Invalid option: -z')
  }
})

test('flag, double dash', function (t) {
  t.plan(1)
  const args: Array<string> = ['--foo', '--']
  const optionConfigs: Array<OptionConfig> = [{ name: 'foo', type: 'boolean' }]
  const result = parseArgs(args, undefined, optionConfigs)
  t.deepEqual(result, {
    options: { foo: true },
    positionals: {},
    remainder: []
  })
})
