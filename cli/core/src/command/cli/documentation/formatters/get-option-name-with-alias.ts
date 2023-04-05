import { ResolvedOptionDetails } from '../../../_type_'
import { Color } from '../../colors'
import { CommanderTag } from '../../utils/get-commander-tag'

function getOptionNameWithAlias(
  args: Pick<ResolvedOptionDetails, 'name' | 'alias' | 'type' | 'variadic'>,
) {
  const { name, alias, type, variadic } = args

  const nameWithSlot = `${name}${CommanderTag.getOptionTagSlot({
    type,
    variadic,
  })}`

  const optionNameWithAlias = `${nameWithSlot} ${alias} `
    .padEnd(30)
    .replace(nameWithSlot, Color.option(nameWithSlot))
    .replace(alias + ' ', Color.gray(alias))

  return optionNameWithAlias
}

export { getOptionNameWithAlias }
