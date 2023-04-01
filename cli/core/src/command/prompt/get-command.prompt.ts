import prompt from 'prompts'

import { CommandDetails } from '../_type_'

interface Args {
  commands: CommandDetails[] | undefined
}

async function getCommandPrompt(
  args: Args,
): Promise<CommandDetails | undefined> {
  const { commands } = args

  const { commandId } = await prompt({
    name: 'commandId',
    message: 'Select a command!',
    type: 'select',
    instructions: false,
    choices: commands?.map(c => ({
      title: c.title,
      description: `(${c.alias}) ${c.description}`,
      value: c.id,
    })),
  })

  const command = commands?.find(c => c.id === commandId)

  return command
}

export { getCommandPrompt }
