import chalk from 'chalk'

import { CliTheme } from '../../../../../theme'
import {
  ArgumentDetails,
  ChoiceDetails,
  OptionDetails,
} from '../../../../_type_'

/**
 * Create description texts.
 */
export const CommanderDescription = {
  getArgumentDescription,
  getOptionDescription,
}

interface Args {
  theme: CliTheme
}

/**
 * Create a description text for the argument.
 */
function getArgumentDescription(arg: ArgumentDetails, { theme }: Args) {
  const { description, required, variadic, choices } = arg

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

  let choicesText = getInlineChoiceDescription(choices ?? [], { theme })

  return `${description} ${detailsText}${choicesText}`
}

/**
 * Create a description text for the option.
 */
function getOptionDescription(args: OptionDetails, { theme }: Args) {
  const { description, choices } = args

  let choicesText = getInlineChoiceDescription(choices ?? [], { theme })

  return `${description}${choicesText}`
}

/**
 * Create a description text for the parameter choice.
 */
function getInlineChoiceDescription(choices: ChoiceDetails[], { theme }: Args) {
  let choicesText = ''

  if (choices?.length) {
    choicesText = theme.color.gray(
      ` (choices: ${choices.map(c => c.value).join(',')})`,
    )
  }

  return choicesText
}
