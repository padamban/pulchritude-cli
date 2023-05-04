import { OptionDetails } from '../_type_'
import { OptionSetup } from './_type_'
import { TextUtils } from './text-utils'

/**
 * Add/infer some  required properties to a option config object.
 */
export function resolveOptionDetails(config: OptionSetup): OptionDetails {
  const { id } = config

  return {
    _type: 'option',
    name: config.name ?? `--${TextUtils.camelToKebabCase(id)}`,
    alias: config.alias ?? `-${TextUtils.createVariableAlias(id)}`,
    title: config.title ?? id,
    description: config.description ?? '',
    type: config.type,
    ...config,
  }
}
