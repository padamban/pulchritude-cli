/* eslint-disable no-console */
import prompt, { PromptObject } from 'prompts'

import { Obj } from '../../utils'
import { CommandDetails, ResolvedArgumentDetails } from '../_type_'
import { Color } from '../cli/colors'
import { resolveArgument } from '../cli/utils/resolve-argument'

interface Args {
  command: CommandDetails | undefined
  values: Obj | undefined
}

async function getArgumentsPrompt(args: Args): Promise<Obj> {
  const { command } = args

  if (!command?.arguments) return { argumentResponse: {} }

  // eslint-disable-next-line no-console
  console.log(`\nParameters for ${Color.command(command.title)}:`)

  const argumentResponse = await prompt(
    command.arguments
      .filter(arg => {
        const resolvedArg = resolveArgument(arg)
        const argValue = args.values?.[resolvedArg.id]

        let ask = false

        if (resolvedArg.variadic) {
          if (Array.isArray(argValue)) {
            argValue.forEach(v => {
              ask ||= checkArgumentValue({ argValue: v, argument: resolvedArg })
            })
          }
        } else if (argValue !== undefined) {
          ask ||= checkArgumentValue({ argValue, argument: resolvedArg })
        }

        return ask
      })
      .map<PromptObject>(arg => {
        const message =
          Color.gray(' - argument - ') +
          Color.argument(arg.title) +
          ' ' +
          Color.gray(`(${arg.type}${arg.variadic ? ' list' : ''})`)

        if (arg.type === 'number') {
          return {
            name: arg.id,
            message,
            type: arg.variadic ? 'text' : 'number',
            validate: value => {
              const notNumberList = String(value)
                .split(',')
                .map(Number)
                .some(Number.isNaN)

              if (notNumberList) {
                return 'Not a comma separated number list. (e.g: 123, 456)'
              }

              return true
            },
            format: value => {
              if (arg.variadic) {
                return String(value).split(',').map(Number).map(String)
              }
              return value
            },
          }
        }

        let type: PromptObject['type'] = 'text'

        if (arg.choices?.length) {
          if (arg.variadic) {
            type = 'multiselect'
          } else {
            type = 'select'
          }
        } else {
          if (arg.variadic) {
            type = 'list'
          } else {
            type = 'text'
          }
        }

        return {
          name: arg.id,
          message,
          type,
          instructions: false,
          choices: arg.choices?.map(c => ({
            title: c.name,
            value: c.value,
          })),
          format: value => {
            if (arg.variadic && typeof value === 'string') {
              return value.split(',')
            }
            return value
          },
        }
      }),
  )

  return { ...args.values, ...argumentResponse }
}

function checkArgumentValue(args: {
  argument: ResolvedArgumentDetails
  argValue: any
}) {
  const { argument, argValue } = args

  let ok = false

  if (argument.choices) {
    const validChoice = !!argument.choices.find(c => c.value === argValue)

    ok ||= !validChoice

    if (!validChoice) {
      console.log(
        Color.warning(
          `\nWARN - The ${Color.argument(
            argument.title,
          )} cannot be ${Color.error.bold(argValue)}.`,
        ),
      )
      console.log(
        Color.gray(
          ` - Use: ${argument.choices.map(c => c.value).join(',')}.\n`,
        ),
      )
    }
  } else if (argument.type === 'number') {
    const isNumber = !Number.isNaN(+argValue)
    if (!isNumber) {
      console.log(
        Color.warning(
          `\nWARN - The ${Color.argument(
            argument.title,
          )} cannot be ${Color.error.bold(argValue)}.`,
        ),
      )
      console.log(Color.gray(` - It must be a number!\n`))
    }

    ok ||= !isNumber
  } else if (argument.type === 'string') {
    ok ||= typeof argValue !== 'string'
  }

  return ok
}

export { getArgumentsPrompt }
