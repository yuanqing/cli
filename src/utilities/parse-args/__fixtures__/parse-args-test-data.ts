export const parseArgsTestData = [
  {
    name: 'option - default',
    optionsConfig: [{ default: 42, name: 'foo', type: 'NUMBER' }],
    tests: [
      [[], {}, { foo: 42 }, []],
      [['--foo'], 'Option --foo must be a number'],
      [['--foo', '1'], {}, { foo: 1 }, []],
      [['--foo', '42'], {}, { foo: 42 }, []]
    ]
  },
  {
    name: 'option - required',
    optionsConfig: [{ name: 'foo', required: true, type: 'NUMBER' }],
    tests: [
      [[], 'Option --foo is required'],
      [['--foo'], 'Option --foo must be a number'],
      [['--foo', '42'], {}, { foo: 42 }, []]
    ]
  },
  {
    name: 'option - duplicated',
    optionsConfig: [{ name: 'foo', type: 'NUMBER' }],
    tests: [
      [['--foo', '42', '--foo'], 'Duplicate option: --foo'],
      [['--foo', '42', '--foo', '1'], 'Duplicate option: --foo']
    ]
  },
  {
    name: 'option - single-dash option',
    optionsConfig: [{ name: 'foo', type: 'NUMBER' }],
    tests: [
      [['-foo'], 'Option -foo must be a number'],
      [['-foo', '42'], {}, { foo: 42 }, []]
    ]
  },
  {
    name: 'option - alias',
    optionsConfig: [{ aliases: ['f'], name: 'foo', type: 'NUMBER' }],
    tests: [
      [[], {}, {}, []],
      [['-f'], 'Option -f must be a number'],
      [['-f', '42'], {}, { foo: 42 }, []],
      [['--f'], 'Option --f must be a number'],
      [['--f', '42'], {}, { foo: 42 }, []]
    ]
  },
  {
    name: 'option - boolean',
    optionsConfig: [{ name: 'foo', type: 'BOOLEAN' }],
    tests: [
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
    ]
  },
  {
    name: 'option - number',
    optionsConfig: [{ name: 'foo', type: 'NUMBER' }],
    tests: [
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
    ]
  },
  {
    name: 'option - string',
    optionsConfig: [{ name: 'foo', type: 'STRING' }],
    tests: [
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
      [['--foo'], 'Option --foo must be a string'],
      [['--foo', 'false'], {}, { foo: 'false' }, []],
      [['--foo', 'true'], {}, { foo: 'true' }, []],
      [['--foo', '0'], {}, { foo: '0' }, []],
      [['--foo', '1'], {}, { foo: '1' }, []],
      [['--foo', '42'], {}, { foo: '42' }, []],
      [['--foo', '-7'], 'Option --foo must be a string'],
      [['--foo', '.5'], {}, { foo: '.5' }, []],
      [['--foo', '-.5'], 'Option --foo must be a string'],
      [['--foo', '3.142'], {}, { foo: '3.142' }, []],
      [['--foo', '-3.142'], 'Option --foo must be a string'],
      [['--foo', 'bar'], {}, { foo: 'bar' }, []],
      [['--foo', '-baz'], 'Option --foo must be a string'],
      [['--foo', '--qux'], 'Option --foo must be a string'],
      [['--foo', '--'], 'Option --foo must be a string']
    ]
  },
  {
    name: 'option - pre-defined number',
    optionsConfig: [{ name: 'foo', type: [42, -3.142] }],
    tests: [
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
    ]
  },
  {
    name: 'option - pre-defined string',
    optionsConfig: [{ name: 'foo', type: ['bar', '-baz'] }],
    tests: [
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
    ]
  },
  {
    name: 'option - custom type',
    optionsConfig: [
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
    tests: [
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
      [['--foo', '-.5'], "Invalid value for option --foo: '-.5'"],
      [['--foo', '3.142'], "Invalid value for option --foo: '3.142'"],
      [['--foo', '-3.142'], "Invalid value for option --foo: '-3.142'"],
      [['--foo', 'bar'], {}, { foo: 'B' }, []],
      [['--foo', '-baz'], "Invalid value for option --foo: '-baz'"],
      [['--foo', '--qux'], "Invalid value for option --foo: '--qux'"],
      [['--foo', '--'], 'Option --foo expects a value']
    ]
  },
  {
    name: 'positional - default',
    positionalsConfig: [{ default: 42, name: 'foo', type: 'NUMBER' }],
    tests: [
      [[], { foo: 42 }, {}, []],
      [['bar'], "Argument <foo> must be a number but got 'bar'"],
      [['1'], { foo: 1 }, {}, []],
      [['42'], { foo: 42 }, {}, []]
    ]
  },
  {
    name: 'positional - required',
    positionalsConfig: [{ name: 'foo', required: true, type: 'NUMBER' }],
    tests: [
      [[], 'Argument <foo> is required'],
      [['bar'], "Argument <foo> must be a number but got 'bar'"],
      [['1'], { foo: 1 }, {}, []],
      [['42'], { foo: 42 }, {}, []]
    ]
  },
  {
    name: 'positional - boolean',
    positionalsConfig: [{ name: 'foo', type: 'BOOLEAN' }],
    tests: [
      [[], {}, {}, []],
      [['false'], { foo: false }, {}, []],
      [['true'], { foo: true }, {}, []],
      [['0'], { foo: false }, {}, []],
      [['1'], { foo: true }, {}, []],
      [
        ['42'],
        "Argument <foo> must be one of '0', '1', 'false', or 'true' but got '42'"
      ],
      [['-7'], 'Invalid option: -7'],
      [
        ['.5'],
        "Argument <foo> must be one of '0', '1', 'false', or 'true' but got '.5'"
      ],
      [['-.5'], 'Invalid option: -.5'],
      [
        ['3.142'],
        "Argument <foo> must be one of '0', '1', 'false', or 'true' but got '3.142'"
      ],
      [['-3.142'], 'Invalid option: -3.142'],
      [
        ['bar'],
        "Argument <foo> must be one of '0', '1', 'false', or 'true' but got 'bar'"
      ],
      [['-baz'], 'Invalid option: -baz'],
      [['--qux'], 'Invalid option: --qux'],
      [['--'], {}, {}, []],
      [['--foo'], 'Invalid option: --foo'],
      [['--foo', 'false'], 'Invalid option: --foo'],
      [['--foo', 'true'], 'Invalid option: --foo'],
      [['--foo', '0'], 'Invalid option: --foo'],
      [['--foo', '1'], 'Invalid option: --foo'],
      [['--foo', '42'], 'Invalid option: --foo'],
      [['--foo', '-7'], 'Invalid option: --foo'],
      [['--foo', '.5'], 'Invalid option: --foo'],
      [['--foo', '-.5'], 'Invalid option: --foo'],
      [['--foo', '3.142'], 'Invalid option: --foo'],
      [['--foo', '-3.142'], 'Invalid option: --foo'],
      [['--foo', 'bar'], 'Invalid option: --foo'],
      [['--foo', '-baz'], 'Invalid option: --foo'],
      [['--foo', '--qux'], 'Invalid option: --foo'],
      [['--foo', '--'], 'Invalid option: --foo']
    ]
  },
  {
    name: 'positional - number',
    positionalsConfig: [{ name: 'foo', type: 'NUMBER' }],
    tests: [
      [[], {}, {}, []],
      [['false'], "Argument <foo> must be a number but got 'false'"],
      [['true'], "Argument <foo> must be a number but got 'true'"],
      [['0'], { foo: 0 }, {}, []],
      [['1'], { foo: 1 }, {}, []],
      [['42'], { foo: 42 }, {}, []],
      [['-7'], { foo: -7 }, {}, []],
      [['.5'], { foo: 0.5 }, {}, []],
      [['-.5'], { foo: -0.5 }, {}, []],
      [['3.142'], { foo: 3.142 }, {}, []],
      [['-3.142'], { foo: -3.142 }, {}, []],
      [['bar'], "Argument <foo> must be a number but got 'bar'"],
      [['-baz'], 'Invalid option: -baz'],
      [['--qux'], 'Invalid option: --qux'],
      [['--'], {}, {}, []],
      [['--foo'], 'Invalid option: --foo'],
      [['--foo', 'false'], 'Invalid option: --foo'],
      [['--foo', 'true'], 'Invalid option: --foo'],
      [['--foo', '0'], 'Invalid option: --foo'],
      [['--foo', '1'], 'Invalid option: --foo'],
      [['--foo', '42'], 'Invalid option: --foo'],
      [['--foo', '-7'], 'Invalid option: --foo'],
      [['--foo', '.5'], 'Invalid option: --foo'],
      [['--foo', '-.5'], 'Invalid option: --foo'],
      [['--foo', '3.142'], 'Invalid option: --foo'],
      [['--foo', '-3.142'], 'Invalid option: --foo'],
      [['--foo', 'bar'], 'Invalid option: --foo'],
      [['--foo', '-baz'], 'Invalid option: --foo'],
      [['--foo', '--qux'], 'Invalid option: --foo'],
      [['--foo', '--'], 'Invalid option: --foo']
    ]
  },
  {
    name: 'positional - string',
    positionalsConfig: [{ name: 'foo', type: 'STRING' }],
    tests: [
      [[], {}, {}, []],
      [['false'], { foo: 'false' }, {}, []],
      [['true'], { foo: 'true' }, {}, []],
      [['0'], { foo: '0' }, {}, []],
      [['1'], { foo: '1' }, {}, []],
      [['42'], { foo: '42' }, {}, []],
      [['-7'], 'Invalid option: -7'],
      [['.5'], { foo: '.5' }, {}, []],
      [['-.5'], 'Invalid option: -.5'],
      [['3.142'], { foo: '3.142' }, {}, []],
      [['-3.142'], 'Invalid option: -3.142'],
      [['bar'], { foo: 'bar' }, {}, []],
      [['-baz'], 'Invalid option: -baz'],
      [['--qux'], 'Invalid option: --qux'],
      [['--'], {}, {}, []],
      [['--foo'], 'Invalid option: --foo'],
      [['--foo', 'false'], 'Invalid option: --foo'],
      [['--foo', 'true'], 'Invalid option: --foo'],
      [['--foo', '0'], 'Invalid option: --foo'],
      [['--foo', '1'], 'Invalid option: --foo'],
      [['--foo', '42'], 'Invalid option: --foo'],
      [['--foo', '-7'], 'Invalid option: --foo'],
      [['--foo', '.5'], 'Invalid option: --foo'],
      [['--foo', '-.5'], 'Invalid option: --foo'],
      [['--foo', '3.142'], 'Invalid option: --foo'],
      [['--foo', '-3.142'], 'Invalid option: --foo'],
      [['--foo', 'bar'], 'Invalid option: --foo'],
      [['--foo', '-baz'], 'Invalid option: --foo'],
      [['--foo', '--qux'], 'Invalid option: --foo'],
      [['--foo', '--'], 'Invalid option: --foo']
    ]
  },
  {
    name: 'positional - pre-defined number',
    positionalsConfig: [{ name: 'foo', type: [42, -3.142] }],
    tests: [
      [[], {}, {}, []],
      [
        ['false'],
        "Argument <foo> must be one of '42' or '-3.142' but got 'false'"
      ],
      [
        ['true'],
        "Argument <foo> must be one of '42' or '-3.142' but got 'true'"
      ],
      [['0'], "Argument <foo> must be one of '42' or '-3.142' but got '0'"],
      [['1'], "Argument <foo> must be one of '42' or '-3.142' but got '1'"],
      [['42'], { foo: 42 }, {}, []],
      [['-7'], 'Invalid option: -7'],
      [['.5'], "Argument <foo> must be one of '42' or '-3.142' but got '.5'"],
      [['-.5'], 'Invalid option: -.5'],
      [
        ['3.142'],
        "Argument <foo> must be one of '42' or '-3.142' but got '3.142'"
      ],
      [['-3.142'], { foo: -3.142 }, {}, []],
      [['bar'], "Argument <foo> must be one of '42' or '-3.142' but got 'bar'"],
      [['-baz'], 'Invalid option: -baz'],
      [['--qux'], 'Invalid option: --qux'],
      [['--'], {}, {}, []],
      [['--foo'], 'Invalid option: --foo'],
      [['--foo', 'false'], 'Invalid option: --foo'],
      [['--foo', 'true'], 'Invalid option: --foo'],
      [['--foo', '0'], 'Invalid option: --foo'],
      [['--foo', '1'], 'Invalid option: --foo'],
      [['--foo', '42'], 'Invalid option: --foo'],
      [['--foo', '-7'], 'Invalid option: --foo'],
      [['--foo', '.5'], 'Invalid option: --foo'],
      [['--foo', '-.5'], 'Invalid option: --foo'],
      [['--foo', '3.142'], 'Invalid option: --foo'],
      [['--foo', '-3.142'], 'Invalid option: --foo'],
      [['--foo', 'bar'], 'Invalid option: --foo'],
      [['--foo', '-baz'], 'Invalid option: --foo'],
      [['--foo', '--qux'], 'Invalid option: --foo'],
      [['--foo', '--'], 'Invalid option: --foo']
    ]
  },
  {
    name: 'positional - pre-defined string',
    positionalsConfig: [{ name: 'foo', type: ['bar', '-baz'] }],
    tests: [
      [[], {}, {}, []],
      [
        ['false'],
        "Argument <foo> must be one of 'bar' or '-baz' but got 'false'"
      ],
      [
        ['true'],
        "Argument <foo> must be one of 'bar' or '-baz' but got 'true'"
      ],
      [['0'], "Argument <foo> must be one of 'bar' or '-baz' but got '0'"],
      [['1'], "Argument <foo> must be one of 'bar' or '-baz' but got '1'"],
      [['42'], "Argument <foo> must be one of 'bar' or '-baz' but got '42'"],
      [['-7'], 'Invalid option: -7'],
      [['.5'], "Argument <foo> must be one of 'bar' or '-baz' but got '.5'"],
      [['-.5'], 'Invalid option: -.5'],
      [
        ['3.142'],
        "Argument <foo> must be one of 'bar' or '-baz' but got '3.142'"
      ],
      [['-3.142'], 'Invalid option: -3.142'],
      [['bar'], { foo: 'bar' }, {}, []],
      [['-baz'], { foo: '-baz' }, {}, []],
      [['--qux'], 'Invalid option: --qux'],
      [['--'], {}, {}, []],
      [['--foo'], 'Invalid option: --foo'],
      [['--foo', 'false'], 'Invalid option: --foo'],
      [['--foo', 'true'], 'Invalid option: --foo'],
      [['--foo', '0'], 'Invalid option: --foo'],
      [['--foo', '1'], 'Invalid option: --foo'],
      [['--foo', '42'], 'Invalid option: --foo'],
      [['--foo', '-7'], 'Invalid option: --foo'],
      [['--foo', '.5'], 'Invalid option: --foo'],
      [['--foo', '-.5'], 'Invalid option: --foo'],
      [['--foo', '3.142'], 'Invalid option: --foo'],
      [['--foo', '-3.142'], 'Invalid option: --foo'],
      [['--foo', 'bar'], 'Invalid option: --foo'],
      [['--foo', '-baz'], 'Invalid option: --foo'],
      [['--foo', '--qux'], 'Invalid option: --foo'],
      [['--foo', '--'], 'Invalid option: --foo']
    ]
  },
  {
    name: 'positional - custom type',
    positionalsConfig: [
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
    tests: [
      [[], {}, {}, []],
      [['false'], "Invalid value for argument <foo>: 'false'"],
      [['true'], "Invalid value for argument <foo>: 'true'"],
      [['0'], "Invalid value for argument <foo>: '0'"],
      [['1'], "Invalid value for argument <foo>: '1'"],
      [['42'], "Invalid value for argument <foo>: '42'"],
      [['-7'], { foo: 'A' }, {}, []],
      [['.5'], "Invalid value for argument <foo>: '.5'"],
      [['-.5'], 'Invalid option: -.5'],
      [['3.142'], "Invalid value for argument <foo>: '3.142'"],
      [['-3.142'], 'Invalid option: -3.142'],
      [['bar'], { foo: 'B' }, {}, []],
      [['-baz'], 'Invalid option: -baz'],
      [['--qux'], 'Invalid option: --qux'],
      [['--'], {}, {}, []],
      [['--foo'], 'Invalid option: --foo'],
      [['--foo', 'false'], 'Invalid option: --foo'],
      [['--foo', 'true'], 'Invalid option: --foo'],
      [['--foo', '0'], 'Invalid option: --foo'],
      [['--foo', '1'], 'Invalid option: --foo'],
      [['--foo', '42'], 'Invalid option: --foo'],
      [['--foo', '-7'], 'Invalid option: --foo'],
      [['--foo', '.5'], 'Invalid option: --foo'],
      [['--foo', '-.5'], 'Invalid option: --foo'],
      [['--foo', '3.142'], 'Invalid option: --foo'],
      [['--foo', '-3.142'], 'Invalid option: --foo'],
      [['--foo', 'bar'], 'Invalid option: --foo'],
      [['--foo', '-baz'], 'Invalid option: --foo'],
      [['--foo', '--qux'], 'Invalid option: --foo'],
      [['--foo', '--'], 'Invalid option: --foo']
    ]
  },
  {
    name: 'remainder args',
    optionsConfig: [{ name: 'bar', type: 'BOOLEAN' }],
    positionalsConfig: [{ name: 'foo', type: 'NUMBER' }],
    tests: [
      [
        ['--', '--bar', '42', '--bar'],
        "Argument <foo> must be a number but got '--bar'"
      ],
      [['--bar', '--', '42', '--bar'], { foo: 42 }, { bar: true }, ['--bar']],
      [['--bar', '42', '--', '--bar'], { foo: 42 }, { bar: true }, ['--bar']],
      [['--bar', '42', '--bar', '--'], 'Duplicate option: --bar']
    ]
  },
  {
    name: 'equals',
    optionsConfig: [{ name: 'foo', type: 'NUMBER' }],
    tests: [
      [['--foo'], 'Option --foo must be a number'],
      [['--foo=42'], {}, { foo: 42 }, []]
    ]
  }
]
