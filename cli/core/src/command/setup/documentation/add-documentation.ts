import commander from 'commander'

import { CommanderSetup } from '../../_type_'
import { CommanderTag } from '../utils/get-commander-tag'
import { resolveOption } from '../utils/resolve-option'
import { Color } from './formatters/colors'
import { addAvailableFeaturesDocumentation } from './sections/available-features-doc'
import { addCommonDocumentation } from './sections/common-doc'
import { addQuickHelpDocumentation } from './sections/quick-help'

export const addCmdDocumentationFactory =
  (commanderSetup: CommanderSetup) => (cmd: commander.Command) => {
    const cmdName = cmd.name()
    const description = `Display help information for the current (${Color.command(
      cmdName,
    )}) command.`

    cmd
      .helpOption(
        CommanderTag.getOptionTag(
          resolveOption({
            variableName: 'help',
            name: '--help',
            alias: '-h',
            type: 'boolean',
            description: '',
          }),
        ),
        description,
      )
      .addHelpText('before', createDocumentation(commanderSetup))
      .showHelpAfterError()
  }

function createDocumentation(cmd: CommanderSetup) {
  const content: string[] = []
  const _ = (line: string) => content.push(line)

  addCommonDocumentation({
    cmd,
    addLine: _,
  })

  addAvailableFeaturesDocumentation({
    cmd,
    addLine: _,
  })

  addQuickHelpDocumentation({ addLine: _ })

  return content.join('\n')
}
