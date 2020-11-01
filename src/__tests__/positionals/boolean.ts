import { test } from 'tap'

import { createCli } from '../../create-cli'
import { CommandHandler, PositionalConfig } from '../../types'

const cliConfig = {
  name: 'cli',
  version: '1.0.0'
}

test('no `args`', function (t) {
  t.plan(3)
  const args: Array<string> = []
  const positionals: Array<PositionalConfig> = [
    { name: 'foo', type: 'boolean' }
  ]
  const handler: CommandHandler = function (positionals, options, remainder) {
    t.deepEqual(positionals, {})
    t.deepEqual(options, {})
    t.deepEqual(remainder, [])
  }
  createCli(args, cliConfig, { handler, positionals })
})

test('no `args` - default', function (t) {
  t.plan(3)
  const args: Array<string> = []
  const positionals: Array<PositionalConfig> = [
    { default: false, name: 'foo', type: 'boolean' }
  ]
  const handler: CommandHandler = function (positionals, options, remainder) {
    t.deepEqual(positionals, { foo: false })
    t.deepEqual(options, {})
    t.deepEqual(remainder, [])
  }
  createCli(args, cliConfig, { handler, positionals })
})

test('no `args` - required', function (t) {
  t.plan(1)
  const args: Array<string> = []
  const positionals: Array<PositionalConfig> = [
    { name: 'foo', required: true, type: 'boolean' }
  ]
  const handler: CommandHandler = function () {
    t.fail()
  }
  try {
    createCli(args, cliConfig, { handler, positionals })
  } catch (error) {
    t.equal(error.message, 'Argument <foo> is required')
  }
})

test('with `args`', function (t) {
  t.plan(3)
  const args: Array<string> = ['true']
  const positionals: Array<PositionalConfig> = [
    { name: 'foo', type: 'boolean' }
  ]
  const handler: CommandHandler = function (positionals, options, remainder) {
    t.deepEqual(positionals, { foo: true })
    t.deepEqual(options, {})
    t.deepEqual(remainder, [])
  }
  createCli(args, cliConfig, { handler, positionals })
})

test('with `args` - false', function (t) {
  t.plan(3)
  const args: Array<string> = ['false']
  const positionals: Array<PositionalConfig> = [
    { name: 'foo', type: 'boolean' }
  ]
  const handler: CommandHandler = function (positionals, options, remainder) {
    t.deepEqual(positionals, { foo: false })
    t.deepEqual(options, {})
    t.deepEqual(remainder, [])
  }
  createCli(args, cliConfig, { handler, positionals })
})

test('with `args` - default', function (t) {
  t.plan(3)
  const args: Array<string> = ['true']
  const positionals: Array<PositionalConfig> = [
    { default: false, name: 'foo', type: 'boolean' }
  ]
  const handler: CommandHandler = function (positionals, options, remainder) {
    t.deepEqual(positionals, { foo: true })
    t.deepEqual(options, {})
    t.deepEqual(remainder, [])
  }
  createCli(args, cliConfig, { handler, positionals })
})

test('with `args` - required', function (t) {
  t.plan(3)
  const args: Array<string> = ['true']
  const positionals: Array<PositionalConfig> = [
    { name: 'foo', required: true, type: 'boolean' }
  ]
  const handler: CommandHandler = function (positionals, options, remainder) {
    t.deepEqual(positionals, { foo: true })
    t.deepEqual(options, {})
    t.deepEqual(remainder, [])
  }
  createCli(args, cliConfig, { handler, positionals })
})

test('with `args` - invalid boolean', function (t) {
  t.plan(1)
  const args: Array<string> = ['bar']
  const positionals: Array<PositionalConfig> = [
    { name: 'foo', type: 'boolean' }
  ]
  const handler: CommandHandler = function () {
    t.fail()
  }
  try {
    createCli(args, cliConfig, { handler, positionals })
  } catch (error) {
    t.equal(
      error.message,
      "Argument <foo> must be one of 'true' or 'false' but got 'bar'"
    )
  }
})
