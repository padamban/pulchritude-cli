import { CommanderSetup } from '../../../_type_'
import { Color } from '../../colors'
import { CommanderDescription } from '../formatters/get-description'
import { ComposeTag } from './utils/compose-tag'
import { getFeatureColumnDetails } from './utils/get-feature-column-details'

interface Args {
  addLine: (str: string) => void
  setup: CommanderSetup
}

function addAvailableFeaturesDocumentation({ setup, addLine: _ }: Args) {
  const { firstColumnWidth: cellLength } = getFeatureColumnDetails({ setup })

  _(`\n\n${Color.subtitle('CONFIGURED PROGRAMS')}\n`)

  setup.programs.forEach(p => {
    _(
      `${ComposeTag.forProgram(p, { cellLength }).coloredCellText}${
        p.description
      }`,
    )

    if (p.multiCommand) _(`    ${Color.gray('multi run')}`)

    p.commands.forEach(c => {
      _('')

      _(
        `${ComposeTag.forCommand(c, { cellLength }).coloredCellText}- ${
          c.description
        }`,
      )

      c.arguments?.forEach(arg => {
        const argDesc = CommanderDescription.getArgumentDescription(arg)

        _(
          `${
            ComposeTag.forArgument(arg, { cellLength }).coloredCellText
          }  - ${argDesc}`,
        )
      })

      c.options?.forEach(opt => {
        _(
          `${ComposeTag.forOption(opt, { cellLength }).coloredCellText}  - ${
            opt.description
          }`,
        )

        const longestValue =
          opt.choices?.reduce<number>((longest, v) => {
            if (v.value.length > longest) longest = v.value.length
            return longest
          }, 0) ?? 0

        opt.choices?.forEach(val => {
          const rawValue = `"${val.value}"`
          const value = rawValue
            .padEnd(longestValue + 2)
            .replace(rawValue, Color.important(rawValue))

          _(`${' '.repeat(cellLength + 6)}${value}  ${val.name}`)
        })
      })
    })

    _('')
  })
}

export { addAvailableFeaturesDocumentation }
