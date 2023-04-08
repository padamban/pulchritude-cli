import { OptionDetails, ResolvedOptionDetails } from '../../_type_'
import { TextUtils } from './text-utils'

/**
 * Enrich the option details with extra data.
 */
function resolveOption(option: OptionDetails): ResolvedOptionDetails {
  const { id } = option

  const { name, alias } = TextUtils.createOptionName(id)

  return {
    name,
    alias,
    ...option,
  }
}

export { resolveOption }
