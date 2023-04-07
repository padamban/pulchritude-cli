/* eslint-disable no-console */
import prompt, { PromptObject } from 'prompts'

import { Obj } from '../../utils'
import { CommandDetails } from '../_type_'
import { Color } from '../cli/colors'
import { resolveOption } from '../cli/utils/resolve-option'
import { checkOptionValue } from './utils/check-option-value'
import { getParameterPrompt } from './utils/get-parameter-prompt'

type OptionState = 'invalid' | 'ok' | 'unknown'

interface Args {
  command: CommandDetails | undefined
  values: Obj | undefined
}

async function getOptionsPrompt(args: Args): Promise<Obj> {
  const { command } = args

  const evaluatedOptions = new Map<string, OptionState>()

  command?.options?.forEach(opt => {
    const resolvedOpt = resolveOption(opt)
    const optValue = args.values?.[resolvedOpt.id]

    let state: OptionState = 'unknown'

    const { ok, messages } = checkOptionValue({
      option: resolvedOpt,
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
          Color.gray(` (${opt.type})`)

        return getParameterPrompt({ parameter: resolveOption(opt), message })
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
        })) ?? [],
  })

  const additionalOptionResponse = await prompt(
    command?.options
      ?.filter(({ id }) => selectedOptionIds.includes(id))
      ?.map<PromptObject>(opt => {
        const message =
          Color.gray(' - option - ') +
          Color.option(opt.title) +
          Color.gray(` (${opt.type})`)

        return getParameterPrompt({ parameter: resolveOption(opt), message })
      }) ?? [],
  )

  return { ...args.values, ...fixedOptionResponse, ...additionalOptionResponse }
}

export { getOptionsPrompt }
