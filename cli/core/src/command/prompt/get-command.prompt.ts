import prompt from 'prompts'

import { asArray } from '../../utils/as-array'
import { CommandDetails, ProgramDetails } from '../_type_'
import { Color } from '../cli/colors'

interface Args {
  program?: ProgramDetails
}

/**
 * Show a prompt asking for command(s).
 */
async function getCommandPrompt(args: Args = {}): Promise<CommandDetails[]> {
  const { commands, isMultiCommand, title } = args.program ?? {}

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

  const selectedCommands = commands?.filter(c => commandIds.includes(c.id))

  return selectedCommands ?? []
}

export { getCommandPrompt }
