import { Color } from '../../colors'

interface Args {
  addLine: (str: string) => void
}

function addQuickHelpDocumentation({ addLine: _ }: Args) {
  _('\n' + Color.title(' QUICK HELP ') + '\n')
}

export { addQuickHelpDocumentation }
