import { test } from 'tap'

import { createCli } from '../../create-cli'
import { CommandHandler, PositionalConfig } from '../../types'

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
  const positionals: Array<PositionalConfig> = [
    { name: 'foo', type: parseCustomType }
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
    { default: 'B', name: 'foo', type: parseCustomType }
  ]
  const handler: CommandHandler = function (positionals, options, remainder) {
    t.deepEqual(positionals, { foo: 'B' })
    t.deepEqual(options, {})
    t.deepEqual(remainder, [])
  }
  createCli(args, cliConfig, { handler, positionals })
})

test('no `args` - required', function (t) {
  t.plan(1)
  const args: Array<string> = []
  const positionals: Array<PositionalConfig> = [
    { name: 'foo', required: true, type: parseCustomType }
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
  const args: Array<string> = ['2']
  const positionals: Array<PositionalConfig> = [
    { name: 'foo', type: parseCustomType }
  ]
  const handler: CommandHandler = function (positionals, options, remainder) {
    t.deepEqual(positionals, { foo: 'B' })
    t.deepEqual(options, {})
    t.deepEqual(remainder, [])
  }
  createCli(args, cliConfig, { handler, positionals })
})

test('with `args` - dash prefix', function (t) {
  t.plan(3)
  const args: Array<string> = ['-1']
  const positionals: Array<PositionalConfig> = [
    { name: 'foo', type: parseCustomType }
  ]
  const handler: CommandHandler = function (positionals, options, remainder) {
    t.deepEqual(positionals, { foo: 'A' })
    t.deepEqual(options, {})
    t.deepEqual(remainder, [])
  }
  createCli(args, cliConfig, { handler, positionals })
})

test('with `args` - default', function (t) {
  t.plan(3)
  const args: Array<string> = ['-1']
  const positionals: Array<PositionalConfig> = [
    { default: 'B', name: 'foo', type: parseCustomType }
  ]
  const handler: CommandHandler = function (positionals, options, remainder) {
    t.deepEqual(positionals, { foo: 'A' })
    t.deepEqual(options, {})
    t.deepEqual(remainder, [])
  }
  createCli(args, cliConfig, { handler, positionals })
})

test('with `args` - required', function (t) {
  t.plan(3)
  const args: Array<string> = ['-1']
  const positionals: Array<PositionalConfig> = [
    { name: 'foo', required: true, type: parseCustomType }
  ]
  const handler: CommandHandler = function (positionals, options, remainder) {
    t.deepEqual(positionals, { foo: 'A' })
    t.deepEqual(options, {})
    t.deepEqual(remainder, [])
  }
  createCli(args, cliConfig, { handler, positionals })
})

test('with `args` - invalid value', function (t) {
  t.plan(1)
  const args: Array<string> = ['bar']
  const positionals: Array<PositionalConfig> = [
    { name: 'foo', type: parseCustomType }
  ]
  const handler: CommandHandler = function () {
    t.fail()
  }
  try {
    createCli(args, cliConfig, { handler, positionals })
  } catch (error) {
    t.equal(error.message, "Invalid argument <foo>: 'bar'")
  }
})
