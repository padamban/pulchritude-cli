import {
  ArgumentDetails,
  CommandDetails,
  OptionDetails,
  ProgramDetails,
} from '../../../../_type_'
import { Color } from '../../../colors'
import { resolveOption } from '../../../utils/resolve-option'
import { DOC_CONFIG } from './config'

interface Args {
  cellLength?: number
  noIndent?: boolean
}

interface Retval {
  length: number
  rawText: string
  coloredCellText: string
}

/**
 * Create value slot text for the option.
 * - e.g.: `--option <slot>`
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

/**
 * Create tag for program.
 */
function forProgram(program: ProgramDetails, args?: Args): Retval {
  const indent = ' '.repeat(DOC_CONFIG.indent)

  const rawText = `${indent}${program.name} ${program.alias}`
  const trail = calculateTrail(rawText.length, args?.cellLength)

  const coloredCellText = `${rawText}${trail}`
    .replace(program.name, Color.program(program.name))
    .replace(` ${program.alias} `, Color.gray(` ${program.alias} `))

  const length = rawText.length

  return { length, rawText, coloredCellText }
}

/**
 * Create tag for command.
 */
function forCommand(command: CommandDetails, args?: Args): Retval {
  const indent = ' '.repeat(DOC_CONFIG.indent * 2)

  const rawText = `${indent}${command.name} ${command.alias}`
  const trail = calculateTrail(rawText.length, args?.cellLength)

  const coloredCellText = `${rawText}${trail}`
    .replace(command.name, Color.command(command.name))
    .replace(` ${command.alias} `, Color.gray(` ${command.alias} `))

  const length = rawText.length

  return { length, rawText, coloredCellText }
}

/**
 * Create tag for argument.
 */
function forArgument(argument: ArgumentDetails, args?: Args): Retval {
  const indent = ' '.repeat(DOC_CONFIG.indent * 3)

  const framedName = `[${argument.name}]`
  const rawText = `${indent}${framedName}`
  const trail = calculateTrail(rawText.length, args?.cellLength)

  const coloredCellText = `${rawText}${trail}`.replace(
    framedName,
    Color.argument(framedName),
  )

  const length = rawText.length

  return { length, rawText, coloredCellText }
}

/**
 * Create tag for option.
 */
function forOption(option: OptionDetails, args?: Args): Retval {
  const indent = ' '.repeat(DOC_CONFIG.indent * 3 * +!args?.noIndent)

  const opt = resolveOption(option)

  const slot = getOptionTagSlot({
    type: opt.type,
    variadic: opt.variadic,
  })

  const nameWithSlot = `${opt.name}${slot}`
  const rawText = `${indent}${nameWithSlot} ${opt.alias}`
  const trail = calculateTrail(rawText.length, args?.cellLength)

  const coloredCellText = `${rawText}${trail}`
    .replace(opt.name, Color.option(opt.name))
    .replace(slot, Color.option.dim(slot))
    .replace(' ' + opt.alias, Color.gray(' ' + opt.alias))

  const length = rawText.length

  return { length, rawText, coloredCellText }
}

/**
 * Create trailing white spaces.
 */
function calculateTrail(textLength: number, cellLength: number | undefined) {
  const diff = Math.max(textLength, cellLength ?? 0) - textLength

  return ' '.repeat(diff)
}

export const ComposeTag = {
  forProgram,
  forCommand,
  forArgument,
  forOption,
}
