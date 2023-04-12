import { ErrorInfo } from '../../../../error'
import { OptionDetails } from '../../../_type_'
import { validateChoices } from './validate-choices'

interface Args {
  parentChain: string[]
  options?: OptionDetails[]
}

/**
 * Validate CLI command option.
 */
function validateOption(args: Args): ErrorInfo[] {
  const errorInfo: ErrorInfo[] = []

  args.options?.forEach(opt => {
    errorInfo.push(
      ...validateChoices({
        parameter: opt,
        parentChain: args.parentChain,
      }),
    )
  })

  return errorInfo
}

export { validateOption }
