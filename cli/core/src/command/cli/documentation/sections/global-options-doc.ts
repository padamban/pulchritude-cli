import { OptionDetails } from '../../../_type_'
import { resolveOption } from '../../utils/resolve-option'
import { Color } from '../formatters/colors'
import { getOptionNameWithAlias } from '../formatters/get-option-name-with-alias'

interface Args {
  addLine: (str: string) => void
  globalOptions: OptionDetails[]
}

function addGlobalOptionsDoc({ addLine: _, globalOptions }: Args) {
  _('\nGLOBAL OPTIONS\n')

  globalOptions?.forEach(opt => {
    const optNameWithAlias = getOptionNameWithAlias(resolveOption(opt))

    const type = Color.gray(`(${opt.type})`)

    _(`  ${optNameWithAlias} ${opt.description} ${type}`)
  })
}

export { addGlobalOptionsDoc }
