/* eslint-disable no-console */
import { ArgumentDetails } from '../../_type_'
import { PromptConfig } from '../_type_'

interface Args {
  argument: ArgumentDetails
  argValue: any
  config: PromptConfig
}

interface Retval {
  ok: boolean
  messages: string[]
}

/**
 * Check the validity of the arguments specified inside the terminal.
 */
function checkArgumentValue(args: Args): Retval {
  const { argument, argValue, config } = args
  const { color } = config.theme

  if (argValue === undefined) return { ok: false, messages: [] }
  if (Array.isArray(argValue) && !argValue.length)
    return { ok: false, messages: [] }

  let ok = true
  const messages: string[] = []

  if (argument.variadic && Array.isArray(argValue)) {
    argValue.forEach(v => {
      const itemCheck = checkArgumentValue({
        argValue: v,
        argument,
        config,
      })
      ok &&= itemCheck.ok
      messages.push(...itemCheck.messages)
    })
  } else if (Array.isArray(argValue)) {
    return {
      ok: false,
      messages: [
        color.warning(
          `\n${color.error('Error')} - The ${color.argument(
            argument.title,
          )} cannot have array value, since it is not configured to be variadic.`,
        ),
      ],
    }
  } else if (argument.choices) {
    const validChoice = !!argument.choices.find(c => c.value === argValue)

    ok &&= validChoice

    if (!validChoice) {
      messages.push(
        color.warning(
          `\n${color.error('Error')} - The ${color.argument(
            argument.title,
          )} cannot be ${color.error(argValue)}.`,
        ),
        color.success(
          ` - Use: ${argument.choices.map(c => c.value).join(',')}.\n`,
        ),
      )
    }
  } else if (argument.type === 'number') {
    const isNumber = !Number.isNaN(+argValue)
    if (!isNumber) {
      messages.push(
        color.warning(
          `\n${color.error('Error')} - The ${color.argument(
            argument.title,
          )} cannot be ${color.error(argValue)}.`,
        ),
        color.success(` - It must be a number!`),
      )
    }

    ok &&= isNumber
  } else if (argument.type === 'string') {
    ok &&= typeof argValue === 'string'
  }

  return { ok, messages }
}

export { checkArgumentValue }
