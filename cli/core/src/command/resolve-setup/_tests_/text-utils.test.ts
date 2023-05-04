import { TextUtils } from '../text-utils'

describe('TextUtils', () => {
  test('camelToKebabCase', () => {
    expect(TextUtils.camelToKebabCase('someValue')).toBe('some-value')
    expect(TextUtils.camelToKebabCase('some-value')).toBe('some-value')
    expect(TextUtils.camelToKebabCase('some_value')).toBe('some_value')
    expect(TextUtils.camelToKebabCase('--some_value')).toBe('--some_value')
    expect(TextUtils.camelToKebabCase('-someValue-')).toBe('-some-value-')
  })

  test('createOptionName', () => {
    expect(TextUtils.createOptionName('someValue')).toMatchObject({
      name: '--some-value',
      alias: '-sv',
    })

    expect(TextUtils.createOptionName('some-value')).toMatchObject({
      name: '--some-value',
      alias: '-sv',
    })
  })

  test('createVariableAlias', () => {
    expect(TextUtils.createVariableAlias('someValue')).toBe('sv')
    expect(TextUtils.createVariableAlias('some_Value')).toBe('sv')
    expect(TextUtils.createVariableAlias('some_value')).toBe('s')
  })
})
