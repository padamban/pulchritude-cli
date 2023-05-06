/* eslint-disable no-console */
import prompt, { PromptObject } from 'prompts'

import { Obj } from '../../utils'
import { CommandDetails } from '../_type_'
import { PromptConfig } from './_type_'
import { getParameterPrompt } from './get-parameter.prompt'
import { checkArgumentValue } from './utils'

interface Args {
  command: CommandDetails | undefined
  values: Obj | undefined
  config: PromptConfig
}

/**
 * Show a prompt asking for argument.
 */
async function getArgumentsPrompt(args: Args): Promise<Obj> {
  const { command, config } = args
  const { color } = config.theme

  if (!command?.arguments) return {}

  const argumentResponse = await prompt(
    command.arguments
      .filter(arg => {
        const argValue = args.values?.[arg.id]

        const { ok, messages } = checkArgumentValue({
          argValue,
          argument: arg,
          config,
        })

        messages.forEach(m => console.log(m))

        if (ok && argValue) {
          console.log(
            color.gray(
              `\nSpecified argument:  ${color.argument(
                arg.title,
              )} = ${argValue}`,
            ),
          )
        }

        return !ok
      })
      .map<PromptObject>(arg => {
        const message =
          color.gray(' - argument - ') +
          color.argument(arg.title) +
          ' ' +
          color.gray(`(${arg.type ?? 'choice'}${arg.variadic ? ' list' : ''})`)

        return getParameterPrompt({ message, parameter: arg, config })
      }),
  )

  return { ...args.values, ...argumentResponse }
}

export { getArgumentsPrompt }
