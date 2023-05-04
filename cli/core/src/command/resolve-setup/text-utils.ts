import { FlagOption, FlagOptionAlias } from '../_type_'

/**
 * Manipulate string values.
 */
export const TextUtils = {
  createOptionName,
  createVariableAlias,
  camelToKebabCase,
}

/**
 * Convert the option id to option name.
 *
 * `optionId` => `--option-id, -oi`
 */
function createOptionName(variableName: string) {
  const kebab = camelToKebabCase(variableName)

  const name: FlagOption = `--${kebab}`

  const alias: FlagOptionAlias = `-${kebab
    .split('-')
    .map(v => v[0])
    .join('')}`

  return {
    name,
    alias,
  }
}

/**
 * Convert the camelCase to alias.
 *
 * `someValue` => `sv`
 */
function createVariableAlias(variableName: string) {
  const alias = variableName
    .split(/\.?(?=[A-Z])/)
    .map(v => v[0])
    .join('')
    .toLowerCase()

  return alias
}

/**
 * Convert the camelCase to kebab-case.
 *
 * `someValue` => `some-value`
 */
function camelToKebabCase(value: string) {
  const kebab = value
    .split(/\.?(?=[A-Z])/)
    .join('-')
    .toLowerCase()

  return kebab
}
