import { CommandDetails } from '../_type_'
import { TextUtils } from '../cli/utils/text-utils'
import { PublicCommandDetails } from './_type_'
import { resolveArgumentDetails } from './resolve-argument-details'
import { resolveOptionDetails } from './resolve-option-details'

/**
 * Add/infer some  required properties to a command config object.
 */
export function resolveCommandDetails(
  config: PublicCommandDetails,
): CommandDetails {
  const { id } = config

  return {
    id,
    name: config.name ?? TextUtils.toKebabCase(id),
    alias: config.alias ?? TextUtils.createVariableAlias(id),
    title: config.title ?? id,
    description: config.description ?? '',
    script: config.script,
    arguments: config.arguments?.map(resolveArgumentDetails),
    options: config.options?.map(resolveOptionDetails),
  }
}
