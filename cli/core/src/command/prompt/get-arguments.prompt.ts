/* eslint-disable no-console */
import prompt, { PromptObject } from 'prompts'

import { Obj } from '../../utils'
import { CommandDetails } from '../_type_'
import { Color } from '../cli/colors'
import { checkArgumentValue } from './utils/check-argument-value'
import { getParameterPrompt } from './utils/get-parameter-prompt'

interface Args {
  command: CommandDetails | undefined
  values: Obj | undefined
}

/**
 * Show a prompt asking for argument.
 */
async function getArgumentsPrompt(args: Args): Promise<Obj> {
  const { command } = args

  if (!command?.arguments) return { argumentResponse: {} }

  // eslint-disable-next-line no-console

  const argumentResponse = await prompt(
    command.arguments
      .filter(arg => {
        const argValue = args.values?.[arg.id]

        const { ok, messages } = checkArgumentValue({
          argValue,
          argument: arg,
        })

        messages.forEach(m => console.log(m))

        return !ok
      })
      .map<PromptObject>(arg => {
        const message =
          Color.gray(' - argument - ') +
          Color.argument(arg.title) +
          ' ' +
          Color.gray(`(${arg.type}${arg.variadic ? ' list' : ''})`)

        return getParameterPrompt({ message, parameter: arg })
      }),
  )

  return { ...args.values, ...argumentResponse }
}

export { getArgumentsPrompt }
