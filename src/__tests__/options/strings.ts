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
  const options: Array<OptionConfig> = [{ name: 'foo', type: ['x', 'y'] }]
  const handler: CommandHandler = async function (
    positionals,
    options,
    remainder
  ) {
    t.deepEqual({}, positionals)
    t.deepEqual({}, options)
    t.deepEqual([], remainder)
  }
  createCli(args, cliConfig, { handler, options })
})

test('no `args` - default', function (t) {
  t.plan(3)
  const args: Array<string> = []
  const options: Array<OptionConfig> = [
    { default: 'y', name: 'foo', type: ['x', 'y'] }
  ]
  const handler: CommandHandler = async function (
    positionals,
    options,
    remainder
  ) {
    t.deepEqual({}, positionals)
    t.deepEqual({ foo: 'y' }, options)
    t.deepEqual([], remainder)
  }
  createCli(args, cliConfig, { handler, options })
})

test('no `args` - required', function (t) {
  t.plan(1)
  const args: Array<string> = []
  const options: Array<OptionConfig> = [
    { name: 'foo', required: true, type: ['x', 'y'] }
  ]
  const handler: CommandHandler = async function () {
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
  const args: Array<string> = ['--foo', 'x']
  const options: Array<OptionConfig> = [{ name: 'foo', type: ['x', 'y'] }]
  const handler: CommandHandler = async function (
    positionals,
    options,
    remainder
  ) {
    t.deepEqual({}, positionals)
    t.deepEqual({ foo: 'x' }, options)
    t.deepEqual([], remainder)
  }
  createCli(args, cliConfig, { handler, options })
})

test('with `args` - default', function (t) {
  t.plan(3)
  const args: Array<string> = ['--foo', 'x']
  const options: Array<OptionConfig> = [
    { default: 'y', name: 'foo', type: ['x', 'y'] }
  ]
  const handler: CommandHandler = async function (
    positionals,
    options,
    remainder
  ) {
    t.deepEqual({}, positionals)
    t.deepEqual({ foo: 'x' }, options)
    t.deepEqual([], remainder)
  }
  createCli(args, cliConfig, { handler, options })
})

test('with `args` - required', function (t) {
  t.plan(3)
  const args: Array<string> = ['--foo', 'x']
  const options: Array<OptionConfig> = [
    { name: 'foo', required: true, type: ['x', 'y'] }
  ]
  const handler: CommandHandler = async function (
    positionals,
    options,
    remainder
  ) {
    t.deepEqual({}, positionals)
    t.deepEqual({ foo: 'x' }, options)
    t.deepEqual([], remainder)
  }
  createCli(args, cliConfig, { handler, options })
})

test('with `args` - flag without value', function (t) {
  t.plan(1)
  const args: Array<string> = ['--foo']
  const options: Array<OptionConfig> = [{ name: 'foo', type: ['x', 'y'] }]
  const handler: CommandHandler = async function () {
    t.fail()
  }
  try {
    createCli(args, cliConfig, { handler, options })
  } catch (error) {
    t.equal(error.message, "Option --foo must be one of 'x' or 'y'")
  }
})

test('with `args` - string not in pre-defined set', function (t) {
  t.plan(1)
  const args: Array<string> = ['--foo', 'bar']
  const options: Array<OptionConfig> = [{ name: 'foo', type: ['x', 'y'] }]
  const handler: CommandHandler = async function () {
    t.fail()
  }
  try {
    createCli(args, cliConfig, { handler, options })
  } catch (error) {
    t.equal(
      error.message,
      "Option --foo must be one of 'x' or 'y' but got 'bar'"
    )
  }
})
