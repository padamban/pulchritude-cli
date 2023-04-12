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
function getOptionTag(args: Partial<OptionDetails>) {
  const { name, alias, type, variadic, choices } = args

  let tag =
    `${alias},`.padEnd(6) + name + getOptionTagSlot({ type, variadic, choices })

  return tag
}

/**
 * Get argument tag.
 * @example --option -o <option-value-slot...>
 */
function getOptionTagSlot(args: Partial<OptionDetails>) {
  const { type, variadic, choices } = args

  if (type === undefined && choices === undefined) return ''
  if (type === 'boolean') return ''

  let slot: string = type ?? 'choice'

  if (variadic) slot += `-list`

  slot = ` <${slot}>`

  return slot
}
