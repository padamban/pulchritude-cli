import { CommanderTag } from '../../utils/get-commander-tag'
import { Color } from './colors'

function getOptionNameWithAlias(args: {
  name: string
  alias: string
  type: 'boolean' | 'string' | 'string-array'
}) {
  const { name, alias, type } = args

  const nameWithSlot = `${name}${CommanderTag.getOptionTagSlot({ type })}`

  const optionNameWithAlias = `${nameWithSlot} ${alias} `
    .padEnd(30)
    .replace(nameWithSlot, Color.option(nameWithSlot))
    .replace(alias + ' ', Color.gray(alias))

  return optionNameWithAlias
}

export { getOptionNameWithAlias }
