import { test } from 'tap'

import { createMultiCommandCli } from '../create-multi-command-cli'

const cliConfig = {
  name: 'cli',
  version: '1.0.0'
}

test('valid command', function (t) {
  t.plan(3)
  const args = ['biz', '--foo']
  const cli = createMultiCommandCli(cliConfig, {
    baz: {
      handler: function () {
        t.fail()
      }
    },
    biz: {
      handler: function (positionals, options, remainder) {
        t.deepEqual(positionals, {})
        t.deepEqual(options, { foo: true })
        t.deepEqual(remainder, [])
      },
      options: [{ name: 'foo', type: 'boolean' }]
    }
  })
  cli(args)
})

test('invalid command', function (t) {
  t.plan(1)
  const args = ['qux', '--foo']
  const cli = createMultiCommandCli(cliConfig, {
    baz: {
      handler: function () {
        t.fail()
      }
    },
    biz: {
      handler: function () {
        t.fail()
      }
    }
  })
  try {
    cli(args)
    t.fail()
  } catch (error) {
    t.equal(error.message, 'Invalid command: qux')
  }
})
