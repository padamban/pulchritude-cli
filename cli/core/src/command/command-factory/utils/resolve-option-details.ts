import { OptionDetails } from '../../_type_'
import { TextUtils } from '../../cli/utils/text-utils'
import { PublicOptionDetails } from '../_type_'

export function resolveOptionDetails(
  config: PublicOptionDetails,
): OptionDetails {
  const { id } = config

  return {
    name: config.name ?? `--${TextUtils.toKebabCase(id)}`,
    alias: config.alias ?? `-${TextUtils.createVariableAlias(id)}`,
    title: config.title ?? id,
    description: config.description ?? '',
    type: config.type ?? 'string',
    ...config,
  }
}
