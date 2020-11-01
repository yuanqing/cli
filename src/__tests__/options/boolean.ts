import { test } from 'tap'

import { createCli } from '../../create-cli'
import { CommandHandler, OptionConfig } from '../../types'

const cliConfig = {
  name: 'cli',
  version: '1.0.0'
}

test('no `args`', function (t) {
  t.plan(3)
  const args: Array<string> = []
  const options: Array<OptionConfig> = [{ name: 'foo', type: 'boolean' }]
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
    { default: false, name: 'foo', type: 'boolean' }
  ]
  const handler: CommandHandler = function (positionals, options, remainder) {
    t.deepEqual(positionals, {})
    t.deepEqual(options, { foo: false })
    t.deepEqual(remainder, [])
  }
  createCli(args, cliConfig, { handler, options })
})

test('no `args` - required', function (t) {
  t.plan(1)
  const args: Array<string> = []
  const options: Array<OptionConfig> = [
    { name: 'foo', required: true, type: 'boolean' }
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
  const args: Array<string> = ['--foo']
  const options: Array<OptionConfig> = [{ name: 'foo', type: 'boolean' }]
  const handler: CommandHandler = function (positionals, options, remainder) {
    t.deepEqual(positionals, {})
    t.deepEqual(options, { foo: true })
    t.deepEqual(remainder, [])
  }
  createCli(args, cliConfig, { handler, options })
})

test('with `args` - default', function (t) {
  t.plan(3)
  const args: Array<string> = ['--foo']
  const options: Array<OptionConfig> = [
    { default: false, name: 'foo', type: 'boolean' }
  ]
  const handler: CommandHandler = function (positionals, options, remainder) {
    t.deepEqual(positionals, {})
    t.deepEqual(options, { foo: true })
    t.deepEqual(remainder, [])
  }
  createCli(args, cliConfig, { handler, options })
})

test('with `args` - required', function (t) {
  t.plan(3)
  const args: Array<string> = ['--foo']
  const options: Array<OptionConfig> = [
    { name: 'foo', required: true, type: 'boolean' }
  ]
  const handler: CommandHandler = function (positionals, options, remainder) {
    t.deepEqual(positionals, {})
    t.deepEqual(options, { foo: true })
    t.deepEqual(remainder, [])
  }
  createCli(args, cliConfig, { handler, options })
})

test('with `args` - flag with extra value', function (t) {
  t.plan(3)
  const args: Array<string> = ['--foo', 'bar']
  const options: Array<OptionConfig> = [{ name: 'foo', type: 'boolean' }]
  const handler: CommandHandler = function (positionals, options, remainder) {
    t.deepEqual(positionals, {})
    t.deepEqual(options, { foo: true })
    t.deepEqual(remainder, ['bar'])
  }
  createCli(args, cliConfig, { handler, options })
})
