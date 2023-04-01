import chalk from 'chalk'

export const CommanderDescription = {
  getArgumentDescription,
  getOptionDescription,
}

function getArgumentDescription(args: {
  description: string
  required?: boolean
  variadic?: boolean
}) {
  const { description, required, variadic } = args

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

  let choicesText = ''

  return `${description} ${detailsText}${choicesText}`
}

function getOptionDescription(args: {
  description: string
  values?: {
    name: string
    value: string
  }[]
}) {
  const { description, values } = args

  let choicesText = ''

  if (values?.length) {
    choicesText = ` (choices: ${values.map(v => v.value).join(',')})`
  }

  return `${description}${choicesText}`
}
