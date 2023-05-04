import { ProgramDetails } from '../_type_'
import { ProgramSetup } from './_type_'
import { resolveCommandDetails } from './resolve-command-details'
import { TextUtils } from './text-utils'

/**
 * Add/infer some required properties to a program config object.
 */
export function resolveProgramDetails(config: ProgramSetup): ProgramDetails {
  const { id } = config

  return {
    _type: 'program',
    id,
    name: config.name ?? TextUtils.camelToKebabCase(id),
    alias: config.alias ?? TextUtils.createVariableAlias(id),
    title: config.title ?? id,
    description: config.description ?? '',
    isMultiCommand: config.isMultiCommand,
    commands: config.commands?.map(resolveCommandDetails),
  }
}
