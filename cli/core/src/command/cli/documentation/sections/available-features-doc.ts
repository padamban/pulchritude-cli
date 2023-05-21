import { CliTheme } from '../../../../theme'
import { ChoiceDetails, CliSetupDetails } from '../../../_type_'
import {
  CommanderDescription,
  ComposeTag,
  getFeatureColumnDetails,
} from './utils'

interface Args {
  addLine: (str: string) => void
  setup: CliSetupDetails
  theme: CliTheme
}

/**
 * Create documentation section from the CLI setup.
 */
function addAvailableFeaturesDocumentation(args: Args) {
  const { setup, addLine: _, theme } = args
  const { color } = theme

  const { firstColumnWidth: cellLength } = getFeatureColumnDetails({ setup })

  const dash = color.gray('- ')

  _(`\n\n${color.subtitle('CONFIGURED PROGRAMS')}\n`)

  if (setup.programs.length === 0) {
    _(`\n${color.warning(' - No programs')}\n`)
  }
  setup.programs.forEach(p => {
    _(
      `${ComposeTag.forProgram(p, { cellLength, theme }).coloredCellText}${
        p.description
      }`,
    )

    if (p.isMultiCommand) _(`    ${color.gray('multi run')}`)

    p.commands.forEach(c => {
      _('')

      _(
        `${
          ComposeTag.forCommand(c, { cellLength, theme }).coloredCellText
        }${dash}${c.description}`,
      )

      c.arguments?.forEach(arg => {
        const argDesc = CommanderDescription.getArgumentDescription(arg, {
          theme,
        })

        _(
          `${
            ComposeTag.forArgument(arg, { cellLength, theme }).coloredCellText
          }  ${dash}${argDesc}`,
        )

        addChoices({
          addLine: _,
          choices: arg.choices,
          indent: cellLength + 6,
          theme,
        })
      })

      c.options?.forEach(opt => {
        _(
          `${
            ComposeTag.forOption(opt, { cellLength, theme }).coloredCellText
          }  ${dash}${opt.description}`,
        )

        addChoices({
          addLine: _,
          choices: opt.choices,
          indent: cellLength + 6,
          theme,
        })
      })
    })

    _('')
  })
}

/**
 * List parameter choices.
 */
function addChoices(args: {
  choices?: ChoiceDetails[]
  indent: number
  addLine: (str: string) => void
  theme: CliTheme
}) {
  const { color } = args.theme

  const longestValue =
    args.choices?.reduce<number>((longest, v) => {
      if (v.value.toString().length > longest)
        longest = v.value.toString().length
      return longest
    }, 0) ?? 0

  args.choices?.forEach(val => {
    const rawValue = `"${val.value}"`
    const value = rawValue
      .padEnd(longestValue + 2)
      .replace(rawValue, color.important(rawValue))

    args.addLine(`${' '.repeat(args.indent)}${value}  ${color.gray(val.name)}`)
  })
}

export { addAvailableFeaturesDocumentation }
