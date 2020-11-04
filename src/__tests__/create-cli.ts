import { test } from 'tap'

import { createCli } from '../create-cli'

const cliConfig = {
  name: 'cli',
  version: '1.0.0'
}

test('valid option', function (t) {
  t.plan(3)
  const args = ['--foo']
  const cli = createCli(cliConfig, {
    handler: function (positionals, options, remainder) {
      t.deepEqual(positionals, {})
      t.deepEqual(options, { foo: true })
      t.deepEqual(remainder, [])
    },
    options: [{ name: 'foo', type: 'boolean' }]
  })
  cli(args)
})

test('invalid option', function (t) {
  t.plan(1)
  const args = ['--bar']
  const cli = createCli(cliConfig, {
    handler: function () {
      t.fail()
    },
    options: [{ name: 'foo', type: 'boolean' }]
  })
  try {
    cli(args)
    t.fail()
  } catch (error) {
    t.equal(error.message, 'Invalid option: --bar')
  }
})
