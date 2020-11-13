import { test } from 'tap'

import { parseArgsTestData } from '../__fixtures__/parse-args-test-data'
import { OptionConfig, PositionalConfig } from '../../../types'
import { parseArgs } from '../parse-args'

for (const {
  name,
  optionsConfig,
  positionalsConfig,
  tests
} of parseArgsTestData) {
  for (const testData of tests) {
    const args = testData[0] as Array<string>
    const testName = `${name} (${args.join(' ')})`
    if (testData.length === 2) {
      test(testName, function (t) {
        t.plan(1)
        try {
          parseArgs(
            args,
            typeof positionalsConfig === 'undefined'
              ? undefined
              : (positionalsConfig as Array<PositionalConfig>),
            typeof optionsConfig === 'undefined'
              ? undefined
              : (optionsConfig as Array<OptionConfig>)
          )
          t.fail()
        } catch (error) {
          t.equal(error.message, testData[1])
        }
      })
      continue
    }
    test(testName, function (t) {
      t.plan(3)
      const { options, positionals, remainder } = parseArgs(
        args,
        typeof positionalsConfig === 'undefined'
          ? undefined
          : (positionalsConfig as Array<PositionalConfig>),
        typeof optionsConfig === 'undefined'
          ? undefined
          : (optionsConfig as Array<OptionConfig>)
      )
      t.deepEqual(positionals, testData[1])
      t.deepEqual(options, testData[2])
      t.deepEqual(remainder, testData[3])
    })
  }
}
