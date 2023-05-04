import { fixParameterValue } from '../fix-parameter-value'

const base = {
  description: 'demo',
  id: 'demo',
  name: 'demo',
  title: 'demo',
  alias: 'd',
}

type Params = Partial<Parameters<typeof fixParameterValue>[0]['parameter']>

const demo = (init: Params) => (value: any, config?: Params) => {
  const v = fixParameterValue({
    parameter: {
      _type: 'argument',
      type: 'number',
      ...base,
      ...init,
      ...config,
    } as any,
    value,
  })

  console.log({ value, v })

  return v
}

describe('fixParameterValue', () => {
  test('fix numbers', () => {
    const testNumber = demo({ _type: 'argument', type: 'number' })

    expect(testNumber(32)).toMatchObject({ value: 32 })
    expect(testNumber('33')).toMatchObject({ value: 33 })
    expect(testNumber(true)).toMatchObject({ value: 1 })
    expect(testNumber(false)).toMatchObject({ value: 0 })
    expect(testNumber('34e')).toMatchObject({ value: NaN })
    expect(testNumber('e35')).toMatchObject({ value: NaN })
    expect(
      testNumber(43, { choices: [{ name: 'A', value: 23 }] }),
    ).toMatchObject({ value: undefined })
    expect(testNumber(['32', 34, true, false])).toMatchObject({
      value: [32, 34, 1, 0],
    })
    expect(
      testNumber(['32', 34, true, false, 23, '23'], {
        choices: [{ name: 'A', value: 23 }],
      }),
    ).toMatchObject({
      value: [undefined, undefined, undefined, undefined, 23, 23],
    })
  })

  test('fix boolean', () => {
    const testBoolean = demo({ _type: 'option', type: 'boolean' })

    expect(testBoolean(32)).toMatchObject({ value: true })
    expect(testBoolean('33')).toMatchObject({ value: true })
    expect(testBoolean(true)).toMatchObject({ value: true })
    expect(testBoolean(false)).toMatchObject({ value: false })
    expect(testBoolean('34e')).toMatchObject({ value: true })
    expect(testBoolean('e35')).toMatchObject({ value: true })
    expect(
      testBoolean(43, { choices: [{ name: 'A', value: 'true' }] }),
    ).toMatchObject({ value: undefined })
    expect(
      testBoolean(44, { choices: [{ name: 'A', value: true }] }),
    ).toMatchObject({ value: undefined })
    expect(
      testBoolean(true, { choices: [{ name: 'A', value: true }] }),
    ).toMatchObject({ value: true })
    expect(
      testBoolean('true', { choices: [{ name: 'A', value: 'true' }] }),
    ).toMatchObject({ value: 'true' })
    expect(testBoolean(['32', 34, true, false, 23, '23'])).toMatchObject({
      value: [true, true, true, false, true, true],
    })
    expect(
      testBoolean(['32', 34, true, false, 23, '23'], {
        choices: [{ name: 'A', value: true }],
      }),
    ).toMatchObject({
      value: [undefined, undefined, true, undefined, undefined, undefined],
    })
  })

  test('fix string', () => {
    const testString = demo({ _type: 'option', type: 'string' })

    expect(testString(32)).toMatchObject({ value: '32' })
    expect(testString('33')).toMatchObject({ value: '33' })
    expect(testString(true)).toMatchObject({ value: 'true' })
    expect(testString(false)).toMatchObject({ value: 'false' })
    expect(testString('34e')).toMatchObject({ value: '34e' })
    expect(
      testString(43, { choices: [{ name: 'A', value: 'aa' }] }),
    ).toMatchObject({ value: undefined })
    expect(
      testString('aa', { choices: [{ name: 'A', value: 'aa' }] }),
    ).toMatchObject({ value: 'aa' })

    expect(
      testString(['32', 34, true, false, 23, '23', null, undefined]),
    ).toMatchObject({
      value: ['32', '34', 'true', 'false', '23', '23', 'null', 'undefined'],
    })
    expect(
      testString(['32', 34, true, false, 23, '23', null, undefined], {
        choices: [{ name: 'A', value: '32' }],
      }),
    ).toMatchObject({
      value: [
        '32',
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      ],
    })
  })
})
