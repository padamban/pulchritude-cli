/* eslint-disable no-console */
import { OptionDetails } from '../../_type_'
import { Color } from '../../cli/colors'

interface Args {
  option: OptionDetails
  optValue: any
}

interface Retval {
  ok: boolean
  messages: string[]
}

/**
 * Check the validity of the options specified inside the terminal.
 */
function checkOptionValue(args: Args): Retval {
  const { option, optValue } = args

  if (optValue === undefined) return { ok: false, messages: [] }

  let ok = true
  const messages: string[] = []

  if (option.variadic && Array.isArray(optValue)) {
    optValue.forEach(v => {
      const itemCheck = checkOptionValue({
        optValue: v,
        option,
      })
      ok &&= itemCheck.ok
      messages.push(...itemCheck.messages)
    })
  } else if (option.choices) {
    const validChoice = !!option.choices.find(c => c.value === optValue)

    ok &&= validChoice

    if (!validChoice) {
      messages.push(
        Color.warning(
          `\n${Color.error('Error')} - The ${Color.option(
            option.title,
          )} cannot be ${Color.error.bold(optValue)}.`,
        ),
        Color.success(
          ` - Use: ${option.choices.map(c => c.value).join(',')}.\n`,
        ),
      )
    }
  } else if (option.type === 'number') {
    const isNumber = !Number.isNaN(+optValue)
    if (!isNumber) {
      messages.push(
        Color.warning(
          `\n${Color.error('Error')} - The ${Color.option(
            option.title,
          )} cannot be ${Color.error.bold(optValue)}.`,
        ),
        Color.success(` - It must be a number!`),
      )
    }

    ok &&= isNumber
  } else if (option.type === 'string') {
    ok &&= typeof optValue === 'string'
  } else if (option.type === 'boolean') {
    ok &&= typeof optValue === 'boolean'
  }

  return { ok, messages }
}

export { checkOptionValue }
