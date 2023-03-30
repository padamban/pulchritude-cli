import chalk from 'chalk'
import prompt, { PromptObject } from 'prompts'

import { Obj } from '../../utils'
import { ArgumentDetails } from '../_type_'
import { resolveArgument } from '../setup/utils/resolve-argument'

interface Args {
  values: Obj | undefined
  arguments: ArgumentDetails[] | undefined
}

async function getArgumentsPrompt(args: Args): Promise<Obj> {
  if (!args.arguments) return { argumentResponse: {} }

  const argumentResponse = await prompt(
    args.arguments
      .filter(arg => {
        const resolvedArg = resolveArgument(arg)
        const argValue = args.values?.[resolvedArg.name]
        let ask = true

        if (resolvedArg.variadic) {
          if (Array.isArray(argValue) && resolvedArg.type === 'number') {
            ask = !argValue.length || argValue.map(Number).some(Number.isNaN)
          }
        } else {
          if (argValue !== undefined && resolvedArg.type === 'number') {
            ask = Number.isNaN(argValue)
          }
        }

        return ask
      })
      .map<PromptObject>(arg => {
        const message =
          ' - argument - ' +
          arg.title +
          ' ' +
          chalk.gray(`(${arg.type}${arg.variadic ? ' list' : ''})`)

        if (arg.type === 'number') {
          return {
            name: arg.variableName,
            message,
            type: arg.variadic ? 'text' : 'number',
            validate: value => {
              const notNumberList = value
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
                return value.split(',').map(Number).map(String)
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
          name: arg.variableName,
          message,
          type,
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

  return argumentResponse
}

export { getArgumentsPrompt }
