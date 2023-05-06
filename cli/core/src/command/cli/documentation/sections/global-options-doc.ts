import { CliTheme } from '../../../../theme'
import { OptionDetails } from '../../../_type_'
import { ComposeTag } from './utils/compose-tag'

interface Args {
  addLine: (str: string) => void
  globalOptions: OptionDetails[]
  theme: CliTheme
}

/**
 * Describes the global options.
 */
function addGlobalOptionsDoc({ addLine: _, globalOptions, theme }: Args) {
  const { color } = theme

  _(`\n${color.subtitle('GLOBAL OPTIONS')}\n`)

  globalOptions?.forEach(opt => {
    const optNameWithAlias = ComposeTag.forOption(opt, {
      cellLength: 33,
      noIndent: true,
      theme: theme,
    }).coloredCellText

    const type = color.gray(`(${opt.type})`)

    _(`  ${optNameWithAlias} ${opt.description} ${type}`)
  })
}

export { addGlobalOptionsDoc }
