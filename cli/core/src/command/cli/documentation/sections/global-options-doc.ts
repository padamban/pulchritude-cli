import { OptionDetails } from '../../../_type_'
import { Color } from '../../colors'
import { ComposeTag } from './utils/compose-tag'

interface Args {
  addLine: (str: string) => void
  globalOptions: OptionDetails[]
}

function addGlobalOptionsDoc({ addLine: _, globalOptions }: Args) {
  _(`\n${Color.subtitle('GLOBAL OPTIONS')}\n`)

  globalOptions?.forEach(opt => {
    const optNameWithAlias = ComposeTag.forOption(opt, {
      cellLength: 33,
      noIndent: true,
    }).coloredCellText

    const type = Color.gray(`(${opt.type})`)

    _(`  ${optNameWithAlias} ${opt.description} ${type}`)
  })
}

export { addGlobalOptionsDoc }
