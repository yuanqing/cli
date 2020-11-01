import { test } from 'tap'

import { createCli } from '../../create-cli'
import { CommandHandler, OptionConfig } from '../../types'

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

test('no `args`', function (t) {
  t.plan(3)
  const args: Array<string> = []
  const options: Array<OptionConfig> = [{ name: 'foo', type: parseCustomType }]
  const handler: CommandHandler = function (positionals, options, remainder) {
    t.deepEqual(positionals, {})
    t.deepEqual(options, {})
    t.deepEqual(remainder, [])
  }
  createCli(args, cliConfig, { handler, options })
})

test('no `args` - default', function (t) {
  t.plan(3)
  const args: Array<string> = []
  const options: Array<OptionConfig> = [
    { default: 'B', name: 'foo', type: parseCustomType }
  ]
  const handler: CommandHandler = function (positionals, options, remainder) {
    t.deepEqual(positionals, {})
    t.deepEqual(options, { foo: 'B' })
    t.deepEqual(remainder, [])
  }
  createCli(args, cliConfig, { handler, options })
})

test('no `args` - required', function (t) {
  t.plan(1)
  const args: Array<string> = []
  const options: Array<OptionConfig> = [
    { name: 'foo', required: true, type: parseCustomType }
  ]
  const handler: CommandHandler = function () {
    t.fail()
  }
  try {
    createCli(args, cliConfig, { handler, options })
  } catch (error) {
    t.equal(error.message, 'Option --foo is required')
  }
})

test('with `args`', function (t) {
  t.plan(3)
  const args: Array<string> = ['--foo', '2']
  const options: Array<OptionConfig> = [{ name: 'foo', type: parseCustomType }]
  const handler: CommandHandler = function (positionals, options, remainder) {
    t.deepEqual(positionals, {})
    t.deepEqual(options, { foo: 'B' })
    t.deepEqual(remainder, [])
  }
  createCli(args, cliConfig, { handler, options })
})

test('with `args` - dash prefix', function (t) {
  t.plan(3)
  const args: Array<string> = ['--foo', '-1']
  const options: Array<OptionConfig> = [{ name: 'foo', type: parseCustomType }]
  const handler: CommandHandler = function (positionals, options, remainder) {
    t.deepEqual(positionals, {})
    t.deepEqual(options, { foo: 'A' })
    t.deepEqual(remainder, [])
  }
  createCli(args, cliConfig, { handler, options })
})

test('with `args` - default', function (t) {
  t.plan(3)
  const args: Array<string> = ['--foo', '-1']
  const options: Array<OptionConfig> = [
    { default: 'B', name: 'foo', type: parseCustomType }
  ]
  const handler: CommandHandler = function (positionals, options, remainder) {
    t.deepEqual(positionals, {})
    t.deepEqual(options, { foo: 'A' })
    t.deepEqual(remainder, [])
  }
  createCli(args, cliConfig, { handler, options })
})

test('with `args` - required', function (t) {
  t.plan(3)
  const args: Array<string> = ['--foo', '-1']
  const options: Array<OptionConfig> = [
    { name: 'foo', required: true, type: parseCustomType }
  ]
  const handler: CommandHandler = function (positionals, options, remainder) {
    t.deepEqual(positionals, {})
    t.deepEqual(options, { foo: 'A' })
    t.deepEqual(remainder, [])
  }
  createCli(args, cliConfig, { handler, options })
})

test('with `args` - flag without value', function (t) {
  t.plan(1)
  const args: Array<string> = ['--foo']
  const options: Array<OptionConfig> = [{ name: 'foo', type: parseCustomType }]
  const handler: CommandHandler = function () {
    t.fail()
  }
  try {
    createCli(args, cliConfig, { handler, options })
  } catch (error) {
    t.equal(error.message, 'Option --foo expects a value')
  }
})

test('with `args` - invalid value', function (t) {
  t.plan(1)
  const args: Array<string> = ['--foo', 'bar']
  const options: Array<OptionConfig> = [{ name: 'foo', type: parseCustomType }]
  const handler: CommandHandler = function () {
    t.fail()
  }
  try {
    createCli(args, cliConfig, { handler, options })
  } catch (error) {
    t.equal(error.message, "Invalid option --foo: 'bar'")
  }
})
