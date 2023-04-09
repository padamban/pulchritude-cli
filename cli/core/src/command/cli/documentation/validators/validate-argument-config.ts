import { ErrorInfo } from '../../../../error'
import { ArgumentDetails } from '../../../_type_'

interface Args {
  parentChain: string[]
  arguments?: ArgumentDetails[]
}

interface Retval {
  errorInfo: ErrorInfo[]
}

/**
 * Validate CLI command arguments.
 */
function validateArgumentConfig(args: Args): Retval {
  const errorInfo: ErrorInfo[] = []

  const requiredOrder = args.arguments?.map(a => !!a.required) ?? []

  let brokenRequiredOrder = false
  let prevRequired = true

  requiredOrder?.forEach(r => {
    brokenRequiredOrder = prevRequired === false && r === true
    prevRequired = r
  })

  if (brokenRequiredOrder) {
    errorInfo.push({
      issue: 'Invalid config: the required arguments must be at the front.',
      type: 'error',
      recommendation: 'Put the required arguments to the top.',
      payload: {
        chain: args.parentChain,
        argumentList: args.arguments?.map(({ id, required }) => ({
          id,
          required: !!required,
        })),
      },
    })
  }

  const variadicOrder = args.arguments?.map(a => !!a.variadic) ?? []

  const isLastVariadic = variadicOrder.at(-1)
  const variadicCount = variadicOrder.filter(Boolean).length

  const hasVariadic = isLastVariadic && variadicCount === 1
  const noVariadic = !isLastVariadic && variadicCount === 0
  const brokenVariadic = !(hasVariadic || noVariadic)

  if (brokenVariadic) {
    errorInfo.push({
      issue: 'Invalid config: only the last argument can be variadic.',
      type: 'error',
      recommendation: 'Set only the last argument to variadic.',
      payload: {
        chain: args.parentChain,
        argumentList: args.arguments?.map(({ id, variadic }) => ({
          id,
          variadic: !!variadic,
        })),
      },
    })
  }

  return {
    errorInfo,
  }
}

export { validateArgumentConfig }
