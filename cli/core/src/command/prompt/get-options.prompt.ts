import prompt, { PromptObject } from 'prompts'

import { Obj } from '../../utils'
import { CommandDetails } from '../_type_'
import { Color } from '../cli/colors'

interface Args {
  command: CommandDetails | undefined
  values: Obj | undefined
}

async function getOptionsPrompt(args: Args): Promise<Obj> {
  const { command, values } = args

  const { selectedOptionIds } = await prompt({
    name: 'selectedOptionIds',
    message: ` - Select ${Color.option('options')} that need specifying!`,
    type: 'multiselect',
    instructions: false,
    choices:
      command?.options?.map(opt => ({
        title: Color.option(opt.title),
        value: opt.id,
      })) ?? [],
  })

  const targetOptions = command?.options?.filter(opt =>
    (selectedOptionIds as string[]).includes(opt.id),
  )

  const optionResponse = await prompt(
    targetOptions?.map<PromptObject>(opt => {
      const message =
        Color.gray(' - option - ') +
        Color.option(opt.title) +
        Color.gray(` (${opt.type})`)

      return {
        name: opt.id,
        message,
        type: 'text',
      }
    }) ?? [],
  )

  return optionResponse
}

export { getOptionsPrompt }
