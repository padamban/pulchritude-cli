import { ArgumentDetails, OptionDetails } from '../../_type_'

/**
 * Create commander parameter tags.
 */
export const CommanderTag = {
  getArgumentTag,
  getOptionTag,
  getOptionTagSlot,
}

/**
 * Get argument tag.
 * @example [argument]
 */
function getArgumentTag(args: ArgumentDetails) {
  const { name, variadic } = args

  let argument = name

  if (variadic) argument = `${argument}...`

  argument = `[${argument}]`

  return argument
}

/**
 * Get argument tag.
 * @example -o, --option
 */
function getOptionTag(
  args: Pick<OptionDetails, 'name' | 'alias' | 'type' | 'variadic'>,
) {
  const { name, alias, type, variadic } = args

  let tag = `${alias},`.padEnd(6) + name + getOptionTagSlot({ type, variadic })

  return tag
}

/**
 * Get argument tag.
 * @example --option -o <option-value-slot...>
 */
function getOptionTagSlot(args: Partial<OptionDetails>) {
  const { type, variadic } = args

  if (type === undefined) return ''
  if (type === 'boolean') return ''

  let slot: string = type

  if (variadic) slot += `-list`

  slot = ` <${slot}>`

  return slot
}
