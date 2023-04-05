import { ChalkInstance } from 'chalk'

import { Color } from '../../colors'

function getNameWithAlias(args: {
  name: string
  alias: string
  color: ChalkInstance
}) {
  const { name, alias, color } = args

  const nameWithAlias = `${name} ${alias}`
    .padEnd(30)
    .replace(name, color(name))
    .replace(` ${alias} `, Color.gray(` ${alias} `))

  return nameWithAlias
}

export { getNameWithAlias }
