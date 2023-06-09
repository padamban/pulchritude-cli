import commander from 'commander'

import { CliSetupDetails, GlobalOptions } from '../../_type_'
import { GLOBAL_OPTIONS } from '../../global-options'
import { CommanderTag } from '../utils'
import { addAvailableFeaturesDocumentation } from './sections/available-features-doc'
import { addCommonDocumentation } from './sections/common-doc'
import { addGlobalOptionsDoc } from './sections/global-options-doc'
import { addQuickHelpDocumentation } from './sections/quick-help'

interface Args {
  setup: CliSetupDetails
  globalOptions: GlobalOptions
}

/**
 * Creates a function that attaches the help/documentation to a function.
 */
export const addCmdDocumentationFactory =
  ({ setup, globalOptions }: Args) =>
  (cmd: commander.Command) => {
    cmd
      .helpOption(
        CommanderTag.getOptionTag(globalOptions.help),
        globalOptions.help.description,
      )
      .addHelpText('before', createDocumentation(setup))
      .showHelpAfterError()
  }

/**
 * Create console documentation.
 */
function createDocumentation(cmd: CliSetupDetails) {
  const content: string[] = []
  const _ = (line: string) => content.push(line)

  addCommonDocumentation({
    setup: cmd,
    addLine: _,
    theme: cmd.theme,
  })

  addGlobalOptionsDoc({
    addLine: _,
    globalOptions: [GLOBAL_OPTIONS.noPrompt, GLOBAL_OPTIONS.help],
    theme: cmd.theme,
  })

  addAvailableFeaturesDocumentation({
    setup: cmd,
    addLine: _,
    theme: cmd.theme,
  })

  addQuickHelpDocumentation({ addLine: _, theme: cmd.theme })

  return content.join('\n')
}
