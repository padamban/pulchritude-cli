import { ErrorInfo } from '../../../../error'
import { ArgumentDetails } from '../../../_type_'
import { validateChoices } from './validate-choices'

interface Args {
  parentChain: string[]
  arguments?: ArgumentDetails[]
}

/**
 * Validate CLI command arguments.
 */
function validateArgument(args: Args): ErrorInfo[] {
  const errorInfo: ErrorInfo[] = []

  const requiredOrder = args.arguments?.map(a => !!a.required) ?? []

  const brokenRequiredOrder =
    JSON.stringify([...requiredOrder].sort().reverse()) !==
    JSON.stringify(requiredOrder)

  if (brokenRequiredOrder) {
    errorInfo.push({
      issue: `The required arguments must be at the front.`,
      location: args.parentChain.join('.'),
      type: 'error',
      recommendation:
        'Put the required arguments to the top of the arguments array.',
      payload: {
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
      issue: 'Only the last argument can be variadic.',
      location: args.parentChain.join('.'),
      type: 'error',
      recommendation: [
        'Set only the last argument config item to variadic.',
        'If you need more variadic inputs use options instead of arguments.',
      ],
      payload: {
        argumentList: args.arguments?.map(({ id, variadic }) => ({
          id,
          variadic: !!variadic,
        })),
      },
    })
  }

  args.arguments?.forEach(arg => {
    errorInfo.push(
      ...validateChoices({
        parameter: arg,
        parentChain: args.parentChain,
      }),
    )
  })

  return errorInfo
}

export { validateArgument }
