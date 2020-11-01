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
    { name: 'foo', type: [3.142, 42] }
  ]
  const handler: CommandHandler = async function (
    positionals,
    options,
    remainder
  ) {
    t.deepEqual({}, positionals)
    t.deepEqual({}, options)
    t.deepEqual([], remainder)
  }
  createCli(args, cliConfig, { handler, positionals })
})

test('no `args` - default', function (t) {
  t.plan(3)
  const args: Array<string> = []
  const positionals: Array<PositionalConfig> = [
    { default: 42, name: 'foo', type: [3.142, 42] }
  ]
  const handler: CommandHandler = async function (
    positionals,
    options,
    remainder
  ) {
    t.deepEqual({ foo: 42 }, positionals)
    t.deepEqual({}, options)
    t.deepEqual([], remainder)
  }
  createCli(args, cliConfig, { handler, positionals })
})

test('no `args` - required', function (t) {
  t.plan(1)
  const args: Array<string> = []
  const positionals: Array<PositionalConfig> = [
    { name: 'foo', required: true, type: [3.142, 42] }
  ]
  const handler: CommandHandler = async function () {
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
  const args: Array<string> = ['3.142']
  const positionals: Array<PositionalConfig> = [
    { name: 'foo', type: [3.142, 42] }
  ]
  const handler: CommandHandler = async function (
    positionals,
    options,
    remainder
  ) {
    t.deepEqual({ foo: 3.142 }, positionals)
    t.deepEqual({}, options)
    t.deepEqual([], remainder)
  }
  createCli(args, cliConfig, { handler, positionals })
})

test('with `args` - default', function (t) {
  t.plan(3)
  const args: Array<string> = ['3.142']
  const positionals: Array<PositionalConfig> = [
    { default: 42, name: 'foo', type: [3.142, 42] }
  ]
  const handler: CommandHandler = async function (
    positionals,
    options,
    remainder
  ) {
    t.deepEqual({ foo: 3.142 }, positionals)
    t.deepEqual({}, options)
    t.deepEqual([], remainder)
  }
  createCli(args, cliConfig, { handler, positionals })
})

test('with `args` - required', function (t) {
  t.plan(3)
  const args: Array<string> = ['3.142']
  const positionals: Array<PositionalConfig> = [
    { name: 'foo', required: true, type: [3.142, 42] }
  ]
  const handler: CommandHandler = async function (
    positionals,
    options,
    remainder
  ) {
    t.deepEqual({ foo: 3.142 }, positionals)
    t.deepEqual({}, options)
    t.deepEqual([], remainder)
  }
  createCli(args, cliConfig, { handler, positionals })
})

test('with `args` - invalid number', function (t) {
  t.plan(1)
  const args: Array<string> = ['bar']
  const positionals: Array<PositionalConfig> = [
    { name: 'foo', type: [3.142, 42] }
  ]
  const handler: CommandHandler = async function () {
    t.fail()
  }
  try {
    createCli(args, cliConfig, { handler, positionals })
  } catch (error) {
    t.equal(
      error.message,
      "Argument <foo> must be one of '3.142' or '42' but got 'bar'"
    )
  }
})

test('with `args` - number not in pre-defined set', function (t) {
  t.plan(1)
  const args: Array<string> = ['1']
  const positionals: Array<PositionalConfig> = [
    { name: 'foo', type: [3.142, 42] }
  ]
  const handler: CommandHandler = async function () {
    t.fail()
  }
  try {
    createCli(args, cliConfig, { handler, positionals })
  } catch (error) {
    t.equal(
      error.message,
      "Argument <foo> must be one of '3.142' or '42' but got '1'"
    )
  }
})
