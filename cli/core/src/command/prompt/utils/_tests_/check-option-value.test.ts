import { MOCK_THEME } from '../../../../theme/theme.mock'
import { DeepPartial } from '../../../../utils'
import { checkOptionValue } from '../check-option-value'

type CheckData = DeepPartial<Parameters<typeof checkOptionValue>[0]>
type Option = Partial<CheckData['option']>
type Value = CheckData['optValue']

const createDemo = (option: Option) => (value: Value) => {
  const v = checkOptionValue({
    config: {
      theme: MOCK_THEME,
    },
    option: {
      id: 'demoOpt',
      ...option,
    } as any,
    optValue: value,
  })

  return v
}

describe('checkOptionValue', () => {
  test('undefined option details', () => {
    const check = createDemo({})

    expect(check(undefined).ok).toBe(false)
    expect(check(4).ok).toBe(true)
    expect(check('a').ok).toBe(true)
    expect(check(true).ok).toBe(true)
    expect(check({}).ok).toBe(true)
    expect(check([]).ok).toBe(false)
  })

  test('number', () => {
    const check = createDemo({
      type: 'number',
    })

    expect(check(undefined).ok).toBe(false)
    expect(check(4).ok).toBe(true)
    expect(check('a').ok).toBe(false)
    expect(check(true).ok).toBe(true)
    expect(check({}).ok).toBe(false)
    expect(check([]).ok).toBe(false)
  })

  test('number array', () => {
    const check = createDemo({
      type: 'number',
      variadic: true,
    })

    expect(check(undefined).ok).toBe(false)
    expect(check(4).ok).toBe(true)
    expect(check('a').ok).toBe(false)
    expect(check(true).ok).toBe(true)
    expect(check({}).ok).toBe(false)
    expect(check([]).ok).toBe(true)
    expect(check([3, 33]).ok).toBe(true)
    expect(check(['3']).ok).toBe(true)
    expect(check(['e']).ok).toBe(false)
    expect(check([3, 'e']).ok).toBe(false)
  })

  test('boolean', () => {
    const check = createDemo({
      type: 'boolean',
    })

    expect(check(undefined).ok).toBe(false)
    expect(check(4).ok).toBe(false)
    expect(check('a').ok).toBe(false)
    expect(check(true).ok).toBe(true)
    expect(check(false).ok).toBe(true)
    expect(check({}).ok).toBe(false)
    expect(check([]).ok).toBe(false)
  })

  test('boolean array', () => {
    const check = createDemo({
      type: 'boolean',
      variadic: true,
    })

    expect(check(undefined).ok).toBe(false)
    expect(check(4).ok).toBe(false)
    expect(check('a').ok).toBe(false)
    expect(check(true).ok).toBe(true)
    expect(check(false).ok).toBe(true)
    expect(check({}).ok).toBe(false)
    expect(check([3]).ok).toBe(false)
    expect(check([true]).ok).toBe(true)
  })

  test('string', () => {
    const check = createDemo({
      type: 'string',
    })

    expect(check(undefined).ok).toBe(false)
    expect(check(4).ok).toBe(false)
    expect(check('a').ok).toBe(true)
    expect(check(true).ok).toBe(false)
    expect(check(false).ok).toBe(false)
    expect(check({}).ok).toBe(false)
    expect(check([]).ok).toBe(false)
  })

  test('string array', () => {
    const check = createDemo({
      type: 'string',
      variadic: true,
    })

    expect(check(undefined).ok).toBe(false)
    expect(check(4).ok).toBe(false)
    expect(check('a').ok).toBe(true)
    expect(check(true).ok).toBe(false)
    expect(check(false).ok).toBe(false)
    expect(check({}).ok).toBe(false)
    expect(check([3]).ok).toBe(false)
    expect(check([true]).ok).toBe(false)
    expect(check(['true', '3']).ok).toBe(true)
  })

  test('option', () => {
    const check = createDemo({
      choices: [{ value: 'b' }, { value: 5 }, { value: true }],
    })

    expect(check(undefined).ok).toBe(false)
    expect(check(4).ok).toBe(false)
    expect(check('a').ok).toBe(false)
    expect(check(true).ok).toBe(true)
    expect(check(false).ok).toBe(false)
    expect(check({}).ok).toBe(false)
    expect(check([]).ok).toBe(false)
    expect(check(5).ok).toBe(true)
    expect(check('b').ok).toBe(true)
  })

  test('option array', () => {
    const check = createDemo({
      variadic: true,
      choices: [{ value: 'b' }, { value: 5 }, { value: true }],
    })

    expect(check(undefined).ok).toBe(false)
    expect(check(4).ok).toBe(false)
    expect(check('a').ok).toBe(false)
    expect(check(true).ok).toBe(true)
    expect(check(false).ok).toBe(false)
    expect(check({}).ok).toBe(false)
    expect(check([]).ok).toBe(true)
    expect(check(5).ok).toBe(true)
    expect(check('b').ok).toBe(true)
    expect(check(['c']).ok).toBe(false)
    expect(check([5, 'b', true]).ok).toBe(true)
  })
})
