import chalk from 'chalk'

import { ArgumentDetails, ChoiceDetails, OptionDetails } from '../../../_type_'
import { Color } from '../../colors'

export const CommanderDescription = {
  getArgumentDescription,
  getOptionDescription,
}

function getArgumentDescription(args: ArgumentDetails) {
  const { description, required, variadic, choices } = args

  const details: string[] = []

  if (required) {
    details.push('required')
  }

  if (variadic) {
    details.push('variadic')
  }

  let detailsText = ''

  if (details.length) {
    detailsText = chalk.gray(`(${details.join('|')})`)
  }

  let choicesText = getInlineChoiceDescription(choices)

  return `${description} ${detailsText}${choicesText}`
}

function getOptionDescription(args: OptionDetails) {
  const { description, choices } = args

  let choicesText = getInlineChoiceDescription(choices)

  return `${description}${choicesText}`
}

function getInlineChoiceDescription(choices?: ChoiceDetails[]) {
  let choicesText = ''

  if (choices?.length) {
    choicesText = Color.gray(
      ` (choices: ${choices.map(c => c.value).join(',')})`,
    )
  }

  return choicesText
}
