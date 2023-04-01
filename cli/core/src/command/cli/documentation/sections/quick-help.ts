import { Color } from '../formatters/colors'

interface Args {
  addLine: (str: string) => void
}

function addQuickHelpDocumentation({ addLine: _ }: Args) {
  _('\n---------------------------------------------------------------\n\n')

  _(Color.title(' QUICK HELP ') + '\n')
}

export { addQuickHelpDocumentation }
