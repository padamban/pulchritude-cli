/* eslint-disable no-console */
import prompt, { PromptObject } from 'prompts'

import { Obj } from '../../utils'
import { asArray } from '../../utils/as-array'
import { CommandDetails } from '../_type_'
import { Color } from '../cli/colors'
import { checkOptionValue } from './utils/check-option-value'
import { getParameterPrompt } from './utils/get-parameter-prompt'

type OptionState = 'invalid' | 'ok' | 'unknown'

interface Args {
  command: CommandDetails | undefined
  values: Obj | undefined
}

/**
 * Show a prompt asking for options.
 * - `prompt 1` - select options to specify
 * - `prompt 2-n` - specify the selected/invalid option values
 */
async function getOptionsPrompt(args: Args): Promise<Obj> {
  const { command } = args

  const evaluatedOptions = new Map<string, OptionState>()

  command?.options?.forEach(opt => {
    const optValue = args.values?.[opt.id]

    let state: OptionState = 'unknown'

    const { ok, messages } = checkOptionValue({
      option: opt,
      optValue,
    })

    messages.forEach(m => console.log(m))

    if (optValue === undefined) {
      state = 'unknown'
    } else if (ok) {
      state = 'ok'
    } else if (!ok) {
      state = 'invalid'
    }

    if (ok && optValue) {
      console.log(
        Color.gray(
          `\nSpecified option:    ${Color.option(opt.title)} = ${optValue}`,
        ),
      )
    }

    evaluatedOptions.set(opt.id, state)
  })

  const invalidOptionsIds = Array.from(evaluatedOptions)
    .filter(([, state]) => state === 'invalid')
    .map(([id]) => id)

  if (invalidOptionsIds.length) console.log()

  const fixedOptionResponse = await prompt(
    command?.options
      ?.filter(({ id }) => invalidOptionsIds.includes(id))
      .map<PromptObject>(opt => {
        const message =
          Color.gray(' - fix option - ') +
          Color.option(opt.title) +
          Color.gray(` (${opt.type ?? 'choice'}${opt.variadic ? ' list' : ''})`)

        return getParameterPrompt({ parameter: opt, message })
      }) ?? [],
  )

  console.log()

  const unknownOptionsIds = Array.from(evaluatedOptions)
    .filter(([, state]) => state === 'unknown')
    .map(([id]) => id)

  const { selectedOptionIds } = await prompt({
    name: 'selectedOptionIds',
    message: ` - Select ${Color.option('options')} that need specifying!`,
    type: 'multiselect',
    instructions: false,
    choices:
      command?.options
        ?.filter(opt => {
          return unknownOptionsIds.includes(opt.id)
        })
        .map(opt => ({
          title: Color.option(opt.title),
          value: opt.id,
          description: opt.description,
        })) ?? [],
  })

  const additionalOptionResponse = await prompt(
    command?.options
      ?.filter(({ id }) => asArray<string>(selectedOptionIds).includes(id))
      ?.map<PromptObject>(opt => {
        const message =
          Color.gray(' - option - ') +
          Color.option(opt.title) +
          Color.gray(` (${opt.type}${opt.variadic ? ' list' : ''})`)

        return getParameterPrompt({ parameter: opt, message })
      }) ?? [],
  )

  return { ...args.values, ...fixedOptionResponse, ...additionalOptionResponse }
}

export { getOptionsPrompt }
