import chalk from 'chalk'

import {
  ArgumentDetails,
  ChoiceDetails,
  OptionDetails,
} from '../../../../_type_'
import { Color } from '../../../colors'

/**
 * Create description texts.
 */
export const CommanderDescription = {
  getArgumentDescription,
  getOptionDescription,
}

/**
 * Create a description text for the argument.
 */
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

/**
 * Create a description text for the option.
 */
function getOptionDescription(args: OptionDetails) {
  const { description, choices } = args

  let choicesText = getInlineChoiceDescription(choices)

  return `${description}${choicesText}`
}

/**
 * Create a description text for the parameter choice.
 */
function getInlineChoiceDescription(choices?: ChoiceDetails[]) {
  let choicesText = ''

  if (choices?.length) {
    choicesText = Color.gray(
      ` (choices: ${choices.map(c => c.value).join(',')})`,
    )
  }

  return choicesText
}
