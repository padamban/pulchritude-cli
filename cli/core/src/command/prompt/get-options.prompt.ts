/* eslint-disable no-console */
import prompt, { PromptObject } from 'prompts'

import { asArray, Obj } from '../../utils'
import { CommandDetails } from '../_type_'
import { PromptConfig } from './_type_'
import { getParameterPrompt } from './get-parameter.prompt'
import { checkOptionValue } from './utils'

type OptionState = 'invalid' | 'ok' | 'unknown'

interface Args {
  command: CommandDetails | undefined
  values: Obj | undefined
  config: PromptConfig
}

/**
 * Show a prompt asking for options.
 * - `prompt 1` - select options to specify
 * - `prompt 2-n` - specify the selected/invalid option values.
 */
async function getOptionsPrompt(args: Args): Promise<Obj> {
  const { command, config } = args
  const { color } = config.theme

  const evaluatedOptions = new Map<string, OptionState>()

  command?.options?.forEach(opt => {
    const optValue = args.values?.[opt.id]

    let state: OptionState = 'unknown'

    const { ok, messages } = checkOptionValue({
      option: opt,
      optValue,
      config,
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
        color.gray(
          `\nSpecified option:    ${color.option(opt.title)} = ${optValue}`,
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
          color.gray(' - fix option - ') +
          color.option(opt.title) +
          color.gray(` (${opt.type ?? 'choice'}${opt.variadic ? ' list' : ''})`)

        return getParameterPrompt({ parameter: opt, message, config })
      }) ?? [],
  )

  console.log()

  const unknownOptionsIds = Array.from(evaluatedOptions)
    .filter(([, state]) => state === 'unknown')
    .map(([id]) => id)

  const { selectedOptionIds } = await prompt({
    name: 'selectedOptionIds',
    message: ` - Select ${color.option('options')} that need specifying!`,
    type: 'multiselect',
    instructions: false,
    choices:
      command?.options
        ?.filter(opt => {
          return unknownOptionsIds.includes(opt.id)
        })
        .map(opt => ({
          title: color.option(opt.title),
          value: opt.id,
          description: opt.description,
        })) ?? [],
  })

  const additionalOptionResponse = await prompt(
    command?.options
      ?.filter(({ id }) => asArray<string>(selectedOptionIds).includes(id))
      ?.map<PromptObject>(opt => {
        const message =
          color.gray(' - option - ') +
          color.option(opt.title) +
          color.gray(` (${opt.type ?? 'choice'}${opt.variadic ? ' list' : ''})`)

        return getParameterPrompt({ parameter: opt, message, config })
      }) ?? [],
  )

  return { ...args.values, ...fixedOptionResponse, ...additionalOptionResponse }
}

export { getOptionsPrompt }
