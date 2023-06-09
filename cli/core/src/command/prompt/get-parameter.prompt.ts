import { PromptObject } from 'prompts'

import { ArgumentDetails, OptionDetails } from '../_type_'
import { PromptConfig } from './_type_'
import { resolvePromptType } from './utils'

interface Args {
  parameter: ArgumentDetails | OptionDetails
  message: string
  config: PromptConfig
}

/**
 * Create an input prompt for a parameter (argument or option).
 */
function getParameterPrompt(args: Args): PromptObject {
  const { parameter, message } = args

  return {
    name: parameter.id,
    message,
    type: resolvePromptType(parameter),
    choices: parameter.choices?.map(c => ({
      title: c.name,
      value: c.value,
    })),
    instructions: false,
    validate: value => {
      if (parameter.variadic && parameter.type === 'number') {
        const notNumberList = String(value)
          .split(',')
          .map(Number)
          .some(Number.isNaN)

        if (notNumberList) {
          return 'Not a comma separated number list. (e.g: 123, 456)'
        }
      }

      return true
    },
    format: value => {
      if (parameter.variadic) {
        return String(value)
          .split(',')
          .map(raw => {
            if (parameter.type === 'number') return Number(raw)
            if (parameter.type === 'string') return String(raw)
            if (parameter.type === 'boolean') return Boolean(raw)
            return raw
          })
      }
      return value
    },
  }
}

export { getParameterPrompt }
