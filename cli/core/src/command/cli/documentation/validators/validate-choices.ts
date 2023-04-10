import { ErrorInfo } from '../../../../error'
import { ArgumentDetails, OptionDetails } from '../../../_type_'

interface Args {
  parentChain: string[]
  parameter?: ArgumentDetails | OptionDetails
}

function validateChoices(args: Args): ErrorInfo[] {
  const { parentChain, parameter } = args

  const errorInfo: ErrorInfo[] = []

  if (parameter?.choices && parameter.type) {
    errorInfo.push({
      issue: `The ${parameter._type}'s type property is not needed with choices array.`,
      type: 'warn',
      location: [...parentChain, parameter.id].join('.'),
      recommendation: `Remove the ${parameter._type}'s type.`,
      payload: {
        id: parameter.id,
        type: parameter.type,
        choices: `[ ${parameter.choices.length} items ]`,
      },
    })
  }

  return errorInfo
}

export { validateChoices }
