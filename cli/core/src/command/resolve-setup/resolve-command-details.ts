import { CommandDetails } from '../_type_'
import { CommandSetup } from './_type_'
import { resolveArgumentDetails } from './resolve-argument-details'
import { resolveOptionDetails } from './resolve-option-details'
import { TextUtils } from './text-utils'

/**
 * Add/infer some  required properties to a command config object.
 */
export function resolveCommandDetails(config: CommandSetup): CommandDetails {
  const { id } = config

  return {
    _type: 'command',
    id,
    name: config.name ?? TextUtils.camelToKebabCase(id),
    alias: config.alias ?? TextUtils.createVariableAlias(id),
    title: config.title ?? id,
    description: config.description ?? '',
    script: config.script,
    arguments: config.arguments?.map(resolveArgumentDetails),
    options: config.options?.map(resolveOptionDetails),
  }
}
