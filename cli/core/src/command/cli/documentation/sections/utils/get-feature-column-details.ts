import { CliSetupDetails } from '../../../../_type_'
import { ComposeTag } from './compose-tag'
import { DOC_CONFIG } from './config'

interface Args {
  setup: CliSetupDetails
}

/**
 * Analyze the CLI config and calculate global details for the docs.
 */
function getFeatureColumnDetails({ setup }: Args) {
  let firstColumnWidth = 0

  const evaluate = (value: { length: number }) => {
    const length = value.length

    if (length > firstColumnWidth) {
      firstColumnWidth = length
    }
  }

  setup.programs.forEach(p => {
    evaluate(ComposeTag.forProgram(p))

    p.commands.forEach(c => {
      evaluate(ComposeTag.forCommand(c))

      c.arguments?.forEach(a => {
        evaluate(ComposeTag.forArgument(a))
      })

      c.options?.forEach(opt => {
        evaluate(ComposeTag.forOption(opt))
      })
    })
  })

  firstColumnWidth += DOC_CONFIG.columnGap

  return { firstColumnWidth }
}

export { getFeatureColumnDetails }
