/* eslint-disable no-console */
import prompt, { PromptObject } from 'prompts'

import { Obj } from '../../utils'
import { CommandDetails } from '../_type_'
import { Color } from '../cli/colors'
import { resolveArgument } from '../cli/utils/resolve-argument'
import { checkArgumentValue } from './utils/check-argument-value'
import { getParameterPrompt } from './utils/get-parameter-prompt'

interface Args {
  command: CommandDetails | undefined
  values: Obj | undefined
}

async function getArgumentsPrompt(args: Args): Promise<Obj> {
  const { command } = args

  if (!command?.arguments) return { argumentResponse: {} }

  // eslint-disable-next-line no-console

  const argumentResponse = await prompt(
    command.arguments
      .filter(arg => {
        const resolvedArg = resolveArgument(arg)
        const argValue = args.values?.[resolvedArg.id]

        const { ok, messages } = checkArgumentValue({
          argValue,
          argument: resolvedArg,
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

        return getParameterPrompt({ message, parameter: resolveArgument(arg) })
      }),
  )

  return { ...args.values, ...argumentResponse }
}

export { getArgumentsPrompt }
