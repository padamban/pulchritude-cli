import { DeepPartial } from '../../../../utils'
import { fixParameterValues } from '../fix-parameter-values'

type Values = Partial<Omit<Parameters<typeof fixParameterValues>[0], 'command'>>
type Command = DeepPartial<Parameters<typeof fixParameterValues>[0]['command']>

const createDemo = (cmd: Command) => (values: Values) => {
  const v = fixParameterValues({
    argumentValues: values.argumentValues ?? {},
    optionValues: values.optionValues ?? {},
    command: {
      _type: 'command',
      id: 'cmd',
      ...cmd,
    } as any,
  })

  return v
}

describe('fixParameterValues', () => {
  test('undefined command details', () => {
    const demo = createDemo({})

    expect(
      demo({
        argumentValues: { demoArg: 1, demoArg2: 'v' },
        optionValues: { demoOpt: ['a', 2, true, false] },
      }),
    ).toMatchObject({
      argumentValues: { demoArg: 1, demoArg2: 'v' },
      optionValues: { demoOpt: ['a', 2, true, false] },
    })
  })

  test('defined command argument', () => {
    const demo = createDemo({
      arguments: [
        {
          id: 'demoArg1',
          type: 'string',
        },
        {
          id: 'demoArg2',
          type: 'number',
        },
        {
          id: 'demoArg3',
          type: 'number',
          variadic: true,
        },
        {
          id: 'demoArg4',
          type: 'string',
          variadic: true,
        },
      ],
    })

    expect(
      demo({
        argumentValues: {
          demoArg1: 1,
          demoArg2: '2',
          demoArg3: ['1', 2, true],
          demoArg4: ['1', 2, true],
        },
      }),
    ).toMatchObject({
      argumentValues: {
        demoArg1: '1',
        demoArg2: 2,
        demoArg3: [1, 2, 1],
        demoArg4: ['1', '2', 'true'],
      },
      optionValues: {},
    })
  })

  test('defined command option', () => {
    const demo = createDemo({
      options: [
        {
          id: 'demoOpt1',
          type: 'string',
        },
        {
          id: 'demoOpt2',
          type: 'number',
        },
        {
          id: 'demoOpt3',
          type: 'boolean',
        },
        {
          id: 'demoOpt4',
          type: 'number',
          variadic: true,
        },
        {
          id: 'demoOpt5',
          type: 'string',
          variadic: true,
        },
        {
          id: 'demoOpt6',
          type: 'boolean',
          variadic: true,
        },
      ],
    })

    expect(
      demo({
        optionValues: {
          demoOpt1: 1,
          demoOpt2: '2',
          demoOpt3: '3',
          demoOpt4: ['1', 2, true],
          demoOpt5: ['1', 2, true],
          demoOpt6: ['1', 2, true, false, '0', '', 0],
        },
      }),
    ).toMatchObject({
      optionValues: {
        demoOpt1: '1',
        demoOpt2: 2,
        demoOpt3: true,
        demoOpt4: [1, 2, 1],
        demoOpt5: ['1', '2', 'true'],
        demoOpt6: [true, true, true, false, true, false, false],
      },
      argumentValues: {},
    })
  })
})
