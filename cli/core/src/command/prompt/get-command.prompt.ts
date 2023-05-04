/* eslint-disable no-console */
import prompt from 'prompts'

import { asArray } from '../../utils'
import { CommandDetails, ProgramDetails } from '../_type_'
import { PromptConfig } from './_type_'

interface Args {
  program?: ProgramDetails
  selectedCommands?: CommandDetails[]
  noPrompt: boolean
  config: PromptConfig
}

/**
 * Show a prompt asking for command(s).
 */
async function getCommandPrompt(args: Args): Promise<CommandDetails[]> {
  const { program, selectedCommands, noPrompt, config } = args
  const { commands, isMultiCommand, title } = program ?? {}
  const { color } = config.theme

  if (selectedCommands?.length) {
    if (!noPrompt) {
      console.log(
        color.gray(
          `\nSelected command(s): ${color.command(
            selectedCommands.map(c => c.title).join(', '),
          )}`,
        ),
      )
    }
    return selectedCommands
  }

  const { commandId } = await prompt({
    name: 'commandId',
    message: `Select a ${color.program(title)} ${color.command('command')}!`,
    type: isMultiCommand ? 'multiselect' : 'select',
    instructions: false,
    choices: commands?.map(c => ({
      title: color.command(c.title),
      description: `(${c.alias}) ${c.description}`,
      value: c.id,
    })),
  })

  const commandIds = asArray(commandId as string[])

  return commands?.filter(c => commandIds.includes(c.id)) ?? []
}

export { getCommandPrompt }
