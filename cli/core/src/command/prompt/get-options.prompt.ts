import prompt, { PromptObject } from 'prompts'

import { Obj } from '../../utils'
import { OptionDetails } from '../_type_'

interface Args {
  options?: OptionDetails[] | undefined
}

async function getOptionsPrompt(args: Args): Promise<Obj> {
  const { options } = args

  const { selectedOptionIds } = await prompt({
    name: 'selectedOptionIds',
    message: ' - Select options that need specifying!',
    type: 'multiselect',
    instructions: false,
    choices:
      options?.map(opt => ({
        title: opt.title,
        value: opt.id,
      })) ?? [],
  })

  const targetOptions = options?.filter(opt =>
    (selectedOptionIds as string[]).includes(opt.id),
  )

  const optionResponse = await prompt(
    targetOptions?.map<PromptObject>(opt => {
      const message = ' - option - ' + opt.title

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
