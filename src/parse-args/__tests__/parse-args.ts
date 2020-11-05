import { test } from 'tap'

import { optionsTestData } from '../__fixtures__/options-test-data'
import { positionalsTestData } from '../__fixtures__/positionals-test-data'
import { OptionConfig, PositionalConfig } from '../../types'
import { parseArgs } from '../parse-args'

const testData = [...positionalsTestData, ...optionsTestData]

for (const { name, optionConfigs, positionalConfigs, data } of testData) {
  for (const array of data) {
    const args = array[0] as Array<string>
    const testName = `${name} (${args.join(' ')})`
    if (array.length === 2) {
      test(testName, function (t) {
        t.plan(1)
        try {
          parseArgs(
            args,
            positionalConfigs as Array<PositionalConfig>,
            optionConfigs as Array<OptionConfig>
          )
          t.fail()
        } catch (error) {
          t.equal(error.message, array[1])
        }
      })
      continue
    }
    test(testName, function (t) {
      t.plan(3)
      const { options, positionals, remainder } = parseArgs(
        args,
        positionalConfigs as Array<PositionalConfig>,
        optionConfigs as Array<OptionConfig>
      )
      t.deepEqual(positionals, array[1])
      t.deepEqual(options, array[2])
      t.deepEqual(remainder, array[3])
    })
  }
}
