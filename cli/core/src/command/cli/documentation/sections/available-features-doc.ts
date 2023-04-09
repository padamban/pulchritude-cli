import { ChoiceDetails, CommanderSetup } from '../../../_type_'
import { Color } from '../../colors'
import { ComposeTag } from './utils/compose-tag'
import { CommanderDescription } from './utils/get-description'
import { getFeatureColumnDetails } from './utils/get-feature-column-details'

interface Args {
  addLine: (str: string) => void
  setup: CommanderSetup
}

/**
 * Create documentation section from the CLI setup.
 */
function addAvailableFeaturesDocumentation({ setup, addLine: _ }: Args) {
  const { firstColumnWidth: cellLength } = getFeatureColumnDetails({ setup })

  const dash = Color.gray('- ')

  _(`\n\n${Color.subtitle('CONFIGURED PROGRAMS')}\n`)

  setup.programs.forEach(p => {
    _(
      `${ComposeTag.forProgram(p, { cellLength }).coloredCellText}${
        p.description
      }`,
    )

    if (p.isMultiCommand) _(`    ${Color.gray('multi run')}`)

    p.commands.forEach(c => {
      _('')

      _(
        `${ComposeTag.forCommand(c, { cellLength }).coloredCellText}${dash}${
          c.description
        }`,
      )

      c.arguments?.forEach(arg => {
        const argDesc = CommanderDescription.getArgumentDescription(arg)

        _(
          `${
            ComposeTag.forArgument(arg, { cellLength }).coloredCellText
          }  ${dash}${argDesc}`,
        )

        addChoices({ addLine: _, choices: arg.choices, indent: cellLength + 6 })
      })

      c.options?.forEach(opt => {
        _(
          `${
            ComposeTag.forOption(opt, { cellLength }).coloredCellText
          }  ${dash}${opt.description}`,
        )

        addChoices({ addLine: _, choices: opt.choices, indent: cellLength + 6 })
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
}) {
  const longestValue =
    args.choices?.reduce<number>((longest, v) => {
      if (v.value.length > longest) longest = v.value.length
      return longest
    }, 0) ?? 0

  args.choices?.forEach(val => {
    const rawValue = `"${val.value}"`
    const value = rawValue
      .padEnd(longestValue + 2)
      .replace(rawValue, Color.important(rawValue))

    args.addLine(`${' '.repeat(args.indent)}${value}  ${Color.gray(val.name)}`)
  })
}

export { addAvailableFeaturesDocumentation }
