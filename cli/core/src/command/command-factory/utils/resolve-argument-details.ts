import { ArgumentDetails } from '../../_type_'
import { TextUtils } from '../../cli/utils/text-utils'
import { PublicArgumentDetails } from '../_type_'

export function resolveArgumentDetails(
  config: PublicArgumentDetails,
): ArgumentDetails {
  const { id } = config

  return {
    name: config.name ?? TextUtils.toKebabCase(id),
    title: config.title ?? id,
    description: config.description ?? '',
    type: config.type ?? 'string',
    ...config,
  }
}
