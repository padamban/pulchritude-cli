/* eslint-disable no-console */
import prompt from 'prompts'

import { asArray } from '../../utils/as-array'
import { CommandDetails, ProgramDetails } from '../_type_'
import { Color } from '../cli/colors'

interface Args {
  program?: ProgramDetails
  selectedCommands?: CommandDetails[]
}

/**
 * Show a prompt asking for command(s).
 */
async function getCommandPrompt(args: Args): Promise<CommandDetails[]> {
  const { program, selectedCommands } = args
  const { commands, isMultiCommand, title } = program ?? {}

  if (selectedCommands?.length) {
    console.log(
      Color.gray(
        `\nSelected command(s): ${Color.command(
          selectedCommands.map(c => c.title).join(', '),
        )}`,
      ),
    )
    return selectedCommands
  }

  const { commandId } = await prompt({
    name: 'commandId',
    message: `Select a ${Color.program(title)} ${Color.command('command')}!`,
    type: isMultiCommand ? 'multiselect' : 'select',
    instructions: false,
    choices: commands?.map(c => ({
      title: Color.command(c.title),
      description: `(${c.alias}) ${c.description}`,
      value: c.id,
    })),
  })

  const commandIds = asArray(commandId as string[])

  return commands?.filter(c => commandIds.includes(c.id)) ?? []
}

export { getCommandPrompt }
