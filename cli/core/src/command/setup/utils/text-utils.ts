import { FlagOption, FlagOptionAlias } from '../../_type_'

export const TextUtils = {
  createOptionName,
  createVariableAlias,
  createCommandText,
  toKebabCase,
}

function createOptionName(variableName: string) {
  const kebab = toKebabCase(variableName)

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

function createVariableAlias(variableName: string) {
  const alias = variableName
    .split(/\.?(?=[A-Z])/)
    .map(v => v[0])
    .join('')
    .toLowerCase()

  return alias
}

function createCommandText(cmdName?: string) {
  return `${createVariableAlias(cmdName ?? '')}|${cmdName}`
}

function toKebabCase(value: string) {
  const kebab = value
    .split(/\.?(?=[A-Z])/)
    .join('-')
    .toLowerCase()

  return kebab
}
