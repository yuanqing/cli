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
  const options: Array<OptionConfig> = [{ name: 'foo', type: [3.142, 42] }]
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
    { default: 42, name: 'foo', type: [3.142, 42] }
  ]
  const handler: CommandHandler = async function (
    positionals,
    options,
    remainder
  ) {
    t.deepEqual({}, positionals)
    t.deepEqual({ foo: 42 }, options)
    t.deepEqual([], remainder)
  }
  createCli(args, cliConfig, { handler, options })
})

test('no `args` - required', function (t) {
  t.plan(1)
  const args: Array<string> = []
  const options: Array<OptionConfig> = [
    { name: 'foo', required: true, type: [3.142, 42] }
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
  const args: Array<string> = ['--foo', '3.142']
  const options: Array<OptionConfig> = [{ name: 'foo', type: [3.142, 42] }]
  const handler: CommandHandler = async function (
    positionals,
    options,
    remainder
  ) {
    t.deepEqual({}, positionals)
    t.deepEqual({ foo: 3.142 }, options)
    t.deepEqual([], remainder)
  }
  createCli(args, cliConfig, { handler, options })
})

test('with `args` - default', function (t) {
  t.plan(3)
  const args: Array<string> = ['--foo', '3.142']
  const options: Array<OptionConfig> = [
    { default: 42, name: 'foo', type: [3.142, 42] }
  ]
  const handler: CommandHandler = async function (
    positionals,
    options,
    remainder
  ) {
    t.deepEqual({}, positionals)
    t.deepEqual({ foo: 3.142 }, options)
    t.deepEqual([], remainder)
  }
  createCli(args, cliConfig, { handler, options })
})

test('with `args` - required', function (t) {
  t.plan(3)
  const args: Array<string> = ['--foo', '3.142']
  const options: Array<OptionConfig> = [
    { name: 'foo', required: true, type: [3.142, 42] }
  ]
  const handler: CommandHandler = async function (
    positionals,
    options,
    remainder
  ) {
    t.deepEqual({}, positionals)
    t.deepEqual({ foo: 3.142 }, options)
    t.deepEqual([], remainder)
  }
  createCli(args, cliConfig, { handler, options })
})

test('with `args` - flag without value', function (t) {
  t.plan(1)
  const args: Array<string> = ['--foo']
  const options: Array<OptionConfig> = [{ name: 'foo', type: [3.142, 42] }]
  const handler: CommandHandler = async function () {
    t.fail()
  }
  try {
    createCli(args, cliConfig, { handler, options })
  } catch (error) {
    t.equal(error.message, "Option --foo must be one of '3.142' or '42'")
  }
})

test('with `args` - invalid number', function (t) {
  t.plan(1)
  const args: Array<string> = ['--foo', 'bar']
  const options: Array<OptionConfig> = [{ name: 'foo', type: [3.142, 42] }]
  const handler: CommandHandler = async function () {
    t.fail()
  }
  try {
    createCli(args, cliConfig, { handler, options })
  } catch (error) {
    t.equal(
      error.message,
      "Option --foo must be one of '3.142' or '42' but got 'bar'"
    )
  }
})

test('with `args` - number not in pre-set', function (t) {
  t.plan(1)
  const args: Array<string> = ['--foo', '1']
  const options: Array<OptionConfig> = [{ name: 'foo', type: [3.142, 42] }]
  const handler: CommandHandler = async function () {
    t.fail()
  }
  try {
    createCli(args, cliConfig, { handler, options })
  } catch (error) {
    t.equal(
      error.message,
      "Option --foo must be one of '3.142' or '42' but got '1'"
    )
  }
})
