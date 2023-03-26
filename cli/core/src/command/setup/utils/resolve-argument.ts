import { ArgumentDetails, ResolvedArgumentDetails } from '../../_type_'
import { TextUtils } from './text-utils'

function resolveArgument(argument: ArgumentDetails): ResolvedArgumentDetails {
  const { variableName } = argument

  const name = TextUtils.toKebabCase(variableName)

  return {
    name,
    ...argument,
  }
}

export { resolveArgument }
