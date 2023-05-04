import { CliTheme } from '../../../../theme'

interface Args {
  addLine: (str: string) => void
  theme: CliTheme
}

/**
 * Header over the prompts help.
 */
function addQuickHelpDocumentation({ addLine: _, theme }: Args) {
  _('\n' + theme.color.title(' QUICK HELP ') + '\n')
}

export { addQuickHelpDocumentation }
