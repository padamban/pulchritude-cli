import { OptionDetails, ResolvedOptionDetails } from '../../_type_'
import { TextUtils } from './text-utils'

function resolveOption(option: OptionDetails): ResolvedOptionDetails {
  const { variableName } = option

  const { name, alias } = TextUtils.createOptionName(variableName)

  return {
    name,
    alias,
    ...option,
  }
}

export { resolveOption }
