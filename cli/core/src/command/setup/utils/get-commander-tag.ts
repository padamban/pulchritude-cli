import { ResolvedArgumentDetails, ResolvedOptionDetails } from '../../_type_'

export const CommanderTag = {
  getArgumentTag,
  getOptionTag,
  getOptionTagSlot,
}

function getArgumentTag(args: ResolvedArgumentDetails) {
  const { name, required, variadic } = args

  let argument = name

  if (variadic) {
    argument = `${argument}...`
  }

  if (required) {
    argument = `<${argument}>`
  } else {
    argument = `[${argument}]`
  }

  return argument
}

function getOptionTag(
  args: Pick<ResolvedOptionDetails, 'name' | 'alias' | 'type'>,
) {
  const { name, alias, type } = args

  let tag = `${alias},`.padEnd(6) + name + getOptionTagSlot({ type })

  return tag
}

function getOptionTagSlot(args: {
  type: 'boolean' | 'string' | 'string-array'
}) {
  const { type } = args

  let slot = ''

  if (type === 'string-array') {
    slot += ` <list>`
  } else if (type === 'string') {
    slot += ` <value>`
  }

  return slot
}
