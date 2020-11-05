export const positionalsTestData = [
  {
    data: [
      [[], {}, {}, []],
      [['false'], { foo: false }, {}, []],
      [['true'], { foo: true }, {}, []],
      [['0'], { foo: false }, {}, []],
      [['1'], { foo: true }, {}, []],
      [['42'], "Argument <foo> must be one of 'true' or 'false' but got '42'"],
      [['-7'], 'Invalid option: -7'],
      [['.5'], "Argument <foo> must be one of 'true' or 'false' but got '.5'"],
      [['-.5'], 'Invalid option: -.5'],
      [
        ['3.142'],
        "Argument <foo> must be one of 'true' or 'false' but got '3.142'"
      ],
      [['-3.142'], 'Invalid option: -3.142'],
      [
        ['bar'],
        "Argument <foo> must be one of 'true' or 'false' but got 'bar'"
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
    ],
    name: 'positional - boolean',
    optionConfigs: [],
    positionalConfigs: [{ name: 'foo', type: 'boolean' }]
  },
  {
    data: [
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
    ],
    name: 'positional - number',
    optionConfigs: [],
    positionalConfigs: [{ name: 'foo', type: 'number' }]
  },
  {
    data: [
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
    ],
    name: 'positional - string',
    optionConfigs: [],
    positionalConfigs: [{ name: 'foo', type: 'string' }]
  },
  {
    data: [
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
    ],
    name: 'positional - pre-defined number',
    optionConfigs: [],
    positionalConfigs: [{ name: 'foo', type: [42, -3.142] }]
  },
  {
    data: [
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
    ],
    name: 'positional - pre-defined string',
    optionConfigs: [],
    positionalConfigs: [{ name: 'foo', type: ['bar', '-baz'] }]
  },
  {
    data: [
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
    ],
    name: 'positional - custom type',
    optionConfigs: [],
    positionalConfigs: [
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
    ]
  }
]
