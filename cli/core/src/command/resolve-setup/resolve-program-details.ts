import { ProgramDetails } from '../_type_'
import { TextUtils } from '../cli/utils/text-utils'
import { ProgramSetup } from './_type_'
import { resolveCommandDetails } from './resolve-command-details'

/**
 * Add/infer some required properties to a program config object.
 */
export function resolveProgramDetails(config: ProgramSetup): ProgramDetails {
  const { id } = config

  return {
    id,
    name: config.name ?? TextUtils.toKebabCase(id),
    alias: config.alias ?? TextUtils.createVariableAlias(id),
    title: config.title ?? id,
    description: config.description ?? '',
    isMultiCommand: config.isMultiCommand,
    commands: config.commands?.map(resolveCommandDetails),
  }
}
