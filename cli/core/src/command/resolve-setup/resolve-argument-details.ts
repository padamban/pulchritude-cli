import { ArgumentDetails } from '../_type_'
import { TextUtils } from '../cli/utils/text-utils'
import { ArgumentSetup } from './_type_'

/**
 * Add/infer some  required properties to a argument config object.
 */
export function resolveArgumentDetails(config: ArgumentSetup): ArgumentDetails {
  const { id } = config

  return {
    _type: 'argument',
    name: config.name ?? TextUtils.toKebabCase(id),
    title: config.title ?? id,
    description: config.description ?? '',
    type: config.type,
    ...config,
  }
}
