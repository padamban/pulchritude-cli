/* eslint-disable no-console */
import { ResolvedArgumentDetails } from '../../_type_'
import { Color } from '../../cli/colors'

interface Args {
  argument: ResolvedArgumentDetails
  argValue: any
}

interface Retval {
  ok: boolean
  messages: string[]
}

/**
 * Check the validity of the arguments specified inside the terminal.
 */
function checkArgumentValue(args: Args): Retval {
  const { argument, argValue } = args

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
      })
      ok &&= itemCheck.ok
      messages.push(...itemCheck.messages)
    })
  } else if (argument.choices) {
    const validChoice = !!argument.choices.find(c => c.value === argValue)

    ok &&= validChoice

    if (!validChoice) {
      messages.push(
        Color.warning(
          `\n${Color.error('Error')} - The ${Color.argument(
            argument.title,
          )} cannot be ${Color.error.bold(argValue)}.`,
        ),
        Color.success(
          ` - Use: ${argument.choices.map(c => c.value).join(',')}.\n`,
        ),
      )
    }
  } else if (argument.type === 'number') {
    const isNumber = !Number.isNaN(+argValue)
    if (!isNumber) {
      messages.push(
        Color.warning(
          `\n${Color.error('Error')} - The ${Color.argument(
            argument.title,
          )} cannot be ${Color.error.bold(argValue)}.`,
        ),
        Color.success(` - It must be a number!`),
      )
    }

    ok &&= isNumber
  } else if (argument.type === 'string') {
    ok &&= typeof argValue === 'string'
  }

  return { ok, messages }
}

export { checkArgumentValue }
