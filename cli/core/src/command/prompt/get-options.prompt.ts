import prompt, { PromptObject } from 'prompts'

import { Obj } from '../../utils'
import { OptionDetails } from '../_type_'

interface Args {
  options?: OptionDetails[] | undefined
}

async function getOptionsPrompt(args: Args): Promise<Obj> {
  const { options } = args

  const { selectedOptionNames } = await prompt({
    name: 'selectedOptionNames',
    message: ' - Select options that need specifying!',
    type: 'multiselect',
    instructions: false,
    choices:
      options?.map(opt => ({
        title: opt.title,
        value: opt.variableName,
      })) ?? [],
  })

  const targetOptions = options?.filter(opt =>
    (selectedOptionNames as string[]).includes(opt.variableName),
  )

  const optionResponse = await prompt(
    targetOptions?.map<PromptObject>(opt => {
      const message = ' - option - ' + opt.title

      return {
        name: opt.variableName,
        message,
        type: 'text',
      }
    }) ?? [],
  )

  return optionResponse
}

export { getOptionsPrompt }
