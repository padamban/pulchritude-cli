import { ArgumentDetails, ResolvedArgumentDetails } from '../../_type_'
import { TextUtils } from './text-utils'

/**
 * Enrich the argument details with extra data.
 */
function resolveArgument(argument: ArgumentDetails): ResolvedArgumentDetails {
  const { id } = argument

  const name = TextUtils.toKebabCase(id)

  return {
    name,
    ...argument,
  }
}

export { resolveArgument }
