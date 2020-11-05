export const optionsTestData = [
  {
    data: [
      [[], {}, {}, []],
      [['false'], {}, {}, ['false']],
      [['true'], {}, {}, ['true']],
      [['0'], {}, {}, ['0']],
      [['1'], {}, {}, ['1']],
      [['42'], {}, {}, ['42']],
      [['-7'], 'Invalid option: -7'],
      [['.5'], {}, {}, ['.5']],
      [['-.5'], 'Invalid option: -.5'],
      [['3.142'], {}, {}, ['3.142']],
      [['-3.142'], 'Invalid option: -3.142'],
      [['bar'], {}, {}, ['bar']],
      [['-baz'], 'Invalid option: -baz'],
      [['--qux'], 'Invalid option: --qux'],
      [['--'], {}, {}, []],
      [['--foo'], {}, { foo: true }, []],
      [['--foo', 'false'], {}, { foo: false }, []],
      [['--foo', 'true'], {}, { foo: true }, []],
      [['--foo', '0'], {}, { foo: false }, []],
      [['--foo', '1'], {}, { foo: true }, []],
      [['--foo', '42'], {}, { foo: true }, ['42']],
      [['--foo', '-7'], 'Invalid option: -7'],
      [['--foo', '.5'], {}, { foo: true }, ['.5']],
      [['--foo', '-.5'], 'Invalid option: -.5'],
      [['--foo', '3.142'], {}, { foo: true }, ['3.142']],
      [['--foo', '-3.142'], 'Invalid option: -3.142'],
      [['--foo', 'bar'], {}, { foo: true }, ['bar']],
      [['--foo', '-baz'], 'Invalid option: -baz'],
      [['--foo', '--qux'], 'Invalid option: --qux'],
      [['--foo', '--'], {}, { foo: true }, []]
    ],
    name: 'option - boolean',
    optionConfigs: [{ name: 'foo', type: 'boolean' }],
    positionalConfigs: []
  },
  {
    data: [
      [[], {}, {}, []],
      [['false'], {}, {}, ['false']],
      [['true'], {}, {}, ['true']],
      [['0'], {}, {}, ['0']],
      [['1'], {}, {}, ['1']],
      [['42'], {}, {}, ['42']],
      [['-7'], 'Invalid option: -7'],
      [['.5'], {}, {}, ['.5']],
      [['-.5'], 'Invalid option: -.5'],
      [['3.142'], {}, {}, ['3.142']],
      [['-3.142'], 'Invalid option: -3.142'],
      [['bar'], {}, {}, ['bar']],
      [['-baz'], 'Invalid option: -baz'],
      [['--qux'], 'Invalid option: --qux'],
      [['--'], {}, {}, []],
      [['--foo'], 'Option --foo must be a number'],
      [['--foo', 'false'], "Option --foo must be a number but got 'false'"],
      [['--foo', 'true'], "Option --foo must be a number but got 'true'"],
      [['--foo', '0'], {}, { foo: 0 }, []],
      [['--foo', '1'], {}, { foo: 1 }, []],
      [['--foo', '42'], {}, { foo: 42 }, []],
      [['--foo', '-7'], {}, { foo: -7 }, []],
      [['--foo', '.5'], {}, { foo: 0.5 }, []],
      [['--foo', '-.5'], {}, { foo: -0.5 }, []],
      [['--foo', '3.142'], {}, { foo: 3.142 }, []],
      [['--foo', '-3.142'], {}, { foo: -3.142 }, []],
      [['--foo', 'bar'], "Option --foo must be a number but got 'bar'"],
      [['--foo', '-qux'], 'Option --foo must be a number'],
      [['--foo', '--qux'], 'Option --foo must be a number'],
      [['--foo', '--'], 'Option --foo must be a number']
    ],
    name: 'option - number',
    optionConfigs: [{ name: 'foo', type: 'number' }],
    positionalConfigs: []
  },
  {
    data: [
      [[], {}, {}, []],
      [['false'], {}, {}, ['false']],
      [['true'], {}, {}, ['true']],
      [['0'], {}, {}, ['0']],
      [['1'], {}, {}, ['1']],
      [['42'], {}, {}, ['42']],
      [['-7'], 'Invalid option: -7'],
      [['.5'], {}, {}, ['.5']],
      [['-.5'], 'Invalid option: -.5'],
      [['3.142'], {}, {}, ['3.142']],
      [['-3.142'], 'Invalid option: -3.142'],
      [['bar'], {}, {}, ['bar']],
      [['-baz'], 'Invalid option: -baz'],
      [['--qux'], 'Invalid option: --qux'],
      [['--'], {}, {}, []],
      [['--foo'], 'Option --foo expects a value'],
      [['--foo', 'false'], {}, { foo: 'false' }, []],
      [['--foo', 'true'], {}, { foo: 'true' }, []],
      [['--foo', '0'], {}, { foo: '0' }, []],
      [['--foo', '1'], {}, { foo: '1' }, []],
      [['--foo', '42'], {}, { foo: '42' }, []],
      [['--foo', '-7'], 'Option --foo expects a value'],
      [['--foo', '.5'], {}, { foo: '.5' }, []],
      [['--foo', '-.5'], 'Option --foo expects a value'],
      [['--foo', '3.142'], {}, { foo: '3.142' }, []],
      [['--foo', '-3.142'], 'Option --foo expects a value'],
      [['--foo', 'bar'], {}, { foo: 'bar' }, []],
      [['--foo', '-baz'], 'Option --foo expects a value'],
      [['--foo', '--qux'], 'Option --foo expects a value'],
      [['--foo', '--'], 'Option --foo expects a value']
    ],
    name: 'option - string',
    optionConfigs: [{ name: 'foo', type: 'string' }],
    positionalConfigs: []
  },
  {
    data: [
      [[], {}, {}, []],
      [['false'], {}, {}, ['false']],
      [['true'], {}, {}, ['true']],
      [['0'], {}, {}, ['0']],
      [['1'], {}, {}, ['1']],
      [['42'], {}, {}, ['42']],
      [['-7'], 'Invalid option: -7'],
      [['.5'], {}, {}, ['.5']],
      [['-.5'], 'Invalid option: -.5'],
      [['3.142'], {}, {}, ['3.142']],
      [['-3.142'], 'Invalid option: -3.142'],
      [['bar'], {}, {}, ['bar']],
      [['-baz'], 'Invalid option: -baz'],
      [['--qux'], 'Invalid option: --qux'],
      [['--'], {}, {}, []],
      [['--foo'], "Option --foo must be one of '42' or '-3.142'"],
      [
        ['--foo', 'false'],
        "Option --foo must be one of '42' or '-3.142' but got 'false'"
      ],
      [
        ['--foo', 'true'],
        "Option --foo must be one of '42' or '-3.142' but got 'true'"
      ],
      [
        ['--foo', '0'],
        "Option --foo must be one of '42' or '-3.142' but got '0'"
      ],
      [
        ['--foo', '1'],
        "Option --foo must be one of '42' or '-3.142' but got '1'"
      ],
      [['--foo', '42'], {}, { foo: 42 }, []],
      [['--foo', '-7'], "Option --foo must be one of '42' or '-3.142'"],
      [
        ['--foo', '.5'],
        "Option --foo must be one of '42' or '-3.142' but got '.5'"
      ],
      [['--foo', '-.5'], "Option --foo must be one of '42' or '-3.142'"],
      [
        ['--foo', '3.142'],
        "Option --foo must be one of '42' or '-3.142' but got '3.142'"
      ],
      [['--foo', '-3.142'], {}, { foo: -3.142 }, []],
      [
        ['--foo', 'bar'],
        "Option --foo must be one of '42' or '-3.142' but got 'bar'"
      ],
      [['--foo', '-baz'], "Option --foo must be one of '42' or '-3.142'"],
      [['--foo', '--qux'], "Option --foo must be one of '42' or '-3.142'"],
      [['--foo', '--'], "Option --foo must be one of '42' or '-3.142'"]
    ],
    name: 'option - pre-defined number',
    optionConfigs: [{ name: 'foo', type: [42, -3.142] }],
    positionalConfigs: []
  },
  {
    data: [
      [[], {}, {}, []],
      [['false'], {}, {}, ['false']],
      [['true'], {}, {}, ['true']],
      [['0'], {}, {}, ['0']],
      [['1'], {}, {}, ['1']],
      [['42'], {}, {}, ['42']],
      [['-7'], 'Invalid option: -7'],
      [['.5'], {}, {}, ['.5']],
      [['-.5'], 'Invalid option: -.5'],
      [['3.142'], {}, {}, ['3.142']],
      [['-3.142'], 'Invalid option: -3.142'],
      [['bar'], {}, {}, ['bar']],
      [['-baz'], 'Invalid option: -baz'],
      [['--qux'], 'Invalid option: --qux'],
      [['--'], {}, {}, []],
      [['--foo'], "Option --foo must be one of 'bar' or '-baz'"],
      [
        ['--foo', 'false'],
        "Option --foo must be one of 'bar' or '-baz' but got 'false'"
      ],
      [
        ['--foo', 'true'],
        "Option --foo must be one of 'bar' or '-baz' but got 'true'"
      ],
      [
        ['--foo', '0'],
        "Option --foo must be one of 'bar' or '-baz' but got '0'"
      ],
      [
        ['--foo', '1'],
        "Option --foo must be one of 'bar' or '-baz' but got '1'"
      ],
      [
        ['--foo', '42'],
        "Option --foo must be one of 'bar' or '-baz' but got '42'"
      ],
      [['--foo', '-7'], "Option --foo must be one of 'bar' or '-baz'"],
      [
        ['--foo', '.5'],
        "Option --foo must be one of 'bar' or '-baz' but got '.5'"
      ],
      [['--foo', '-.5'], "Option --foo must be one of 'bar' or '-baz'"],
      [
        ['--foo', '3.142'],
        "Option --foo must be one of 'bar' or '-baz' but got '3.142'"
      ],
      [['--foo', '-3.142'], "Option --foo must be one of 'bar' or '-baz'"],
      [['--foo', 'bar'], {}, { foo: 'bar' }, []],
      [['--foo', '-baz'], {}, { foo: '-baz' }, []],
      [['--foo', '--qux'], "Option --foo must be one of 'bar' or '-baz'"],
      [['--foo', '--'], "Option --foo must be one of 'bar' or '-baz'"]
    ],
    name: 'option - pre-defined string',
    optionConfigs: [{ name: 'foo', type: ['bar', '-baz'] }],
    positionalConfigs: []
  },
  {
    data: [
      [[], {}, {}, []],
      [['false'], {}, {}, ['false']],
      [['true'], {}, {}, ['true']],
      [['0'], {}, {}, ['0']],
      [['1'], {}, {}, ['1']],
      [['42'], {}, {}, ['42']],
      [['-7'], 'Invalid option: -7'],
      [['.5'], {}, {}, ['.5']],
      [['-.5'], 'Invalid option: -.5'],
      [['3.142'], {}, {}, ['3.142']],
      [['-3.142'], 'Invalid option: -3.142'],
      [['bar'], {}, {}, ['bar']],
      [['-baz'], 'Invalid option: -baz'],
      [['--qux'], 'Invalid option: --qux'],
      [['--'], {}, {}, []],
      [['--foo'], 'Option --foo expects a value'],
      [['--foo', 'false'], "Invalid value for option --foo: 'false'"],
      [['--foo', 'true'], "Invalid value for option --foo: 'true'"],
      [['--foo', '0'], "Invalid value for option --foo: '0'"],
      [['--foo', '1'], "Invalid value for option --foo: '1'"],
      [['--foo', '42'], "Invalid value for option --foo: '42'"],
      [['--foo', '-7'], {}, { foo: 'A' }, []],
      [['--foo', '.5'], "Invalid value for option --foo: '.5'"],
      [['--foo', '-.5'], 'Option --foo expects a value'],
      [['--foo', '3.142'], "Invalid value for option --foo: '3.142'"],
      [['--foo', '-3.142'], 'Option --foo expects a value'],
      [['--foo', 'bar'], {}, { foo: 'B' }, []],
      [['--foo', '-baz'], 'Option --foo expects a value'],
      [['--foo', '--qux'], 'Option --foo expects a value'],
      [['--foo', '--'], 'Option --foo expects a value']
    ],
    name: 'option - custom type',
    optionConfigs: [
      {
        name: 'foo',
        type: function (value: string): string {
          if (value === '-7') {
            return 'A'
          }
          if (value === 'bar') {
            return 'B'
          }
          throw new Error()
        }
      }
    ],
    positionalConfigs: []
  }
]
