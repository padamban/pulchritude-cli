import { ResolvedArgumentDetails, ResolvedOptionDetails } from '../../_type_'

export const CommanderTag = {
  getArgumentTag,
  getOptionTag,
  getOptionTagSlot,
}

function getArgumentTag(args: ResolvedArgumentDetails) {
  const { name, variadic } = args

  let argument = name

  if (variadic) argument = `${argument}...`

  argument = `[${argument}]`

  return argument
}

function getOptionTag(
  args: Pick<ResolvedOptionDetails, 'name' | 'alias' | 'type' | 'variadic'>,
) {
  const { name, alias, type, variadic } = args

  let tag = `${alias},`.padEnd(6) + name + getOptionTagSlot({ type, variadic })

  return tag
}

function getOptionTagSlot(args: {
  type: 'boolean' | 'string'
  variadic: boolean | undefined
}) {
  const { type, variadic } = args

  let slot: string = type

  if (variadic) slot += `-list`

  slot = ` <${slot}>`

  return slot
}
