import { ArgumentDetails } from '../_type_'
import { ArgumentSetup } from './_type_'
import { TextUtils } from './text-utils'

/**
 * Add/infer some  required properties to a argument config object.
 */
export function resolveArgumentDetails(config: ArgumentSetup): ArgumentDetails {
  const { id } = config

  return {
    _type: 'argument',
    name: config.name ?? TextUtils.camelToKebabCase(id),
    title: config.title ?? id,
    description: config.description ?? '',
    type: config.type,
    ...config,
  }
}
