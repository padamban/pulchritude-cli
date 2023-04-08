import commander from 'commander'

import { CommanderSetup, GlobalOptions } from '../../_type_'
import { globalOptions } from '../../global-options'
import { CommanderTag } from '../utils/get-commander-tag'
import { resolveOption } from '../utils/resolve-option'
import { addAvailableFeaturesDocumentation } from './sections/available-features-doc'
import { addCommonDocumentation } from './sections/common-doc'
import { addGlobalOptionsDoc } from './sections/global-options-doc'
import { addQuickHelpDocumentation } from './sections/quick-help'

interface Args {
  setup: CommanderSetup
  globalOptions: GlobalOptions
}

export const addCmdDocumentationFactory =
  ({ setup, globalOptions }: Args) =>
  (cmd: commander.Command) => {
    cmd
      .helpOption(
        CommanderTag.getOptionTag(resolveOption(globalOptions.help)),
        globalOptions.help.description,
      )
      .addHelpText('before', createDocumentation(setup))
      .showHelpAfterError()
  }

function createDocumentation(cmd: CommanderSetup) {
  const content: string[] = []
  const _ = (line: string) => content.push(line)

  addCommonDocumentation({
    setup: cmd,
    addLine: _,
  })

  addGlobalOptionsDoc({
    addLine: _,
    globalOptions: [globalOptions.noPrompt, globalOptions.help],
  })

  addAvailableFeaturesDocumentation({
    setup: cmd,
    addLine: _,
  })

  addQuickHelpDocumentation({ addLine: _ })

  return content.join('\n')
}