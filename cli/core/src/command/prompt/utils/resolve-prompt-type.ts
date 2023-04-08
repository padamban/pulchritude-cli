import { PromptType } from 'prompts'

import { ArgumentType, OptionType } from '../../_type_'

interface Args {
  variadic?: boolean
  choices?: any[]
  type?: ArgumentType | OptionType
}

function resolvePromptType({ type, variadic, choices }: Args): PromptType {
  let promptType: PromptType = 'text'

  if (variadic && choices?.length) {
    promptType = 'multiselect'
  } else if (!variadic && choices?.length) {
    promptType = 'select'
  } else if (variadic) {
    promptType = 'text'
  } else if (type === 'boolean') {
    promptType = 'toggle'
  } else if (type === 'number') {
    promptType = 'number'
  } else if (type === 'string') {
    promptType = 'text'
  }

  return promptType
}

export { resolvePromptType }
