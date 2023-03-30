import prompt from 'prompts'

import { CommandDetails } from '../_type_'

interface Args {
  commands: CommandDetails[] | undefined
}

async function getCommandPrompt(
  args: Args,
): Promise<CommandDetails | undefined> {
  const { commands } = args

  const { commandName } = await prompt({
    name: 'commandName',
    message: 'Select a command!',
    type: 'select',
    instructions: false,
    choices: commands?.map(c => ({
      title: c.title,
      description: c.description,
      value: c.variableName,
    })),
  })

  const command = commands?.find(c => c.variableName === commandName)

  return command
}

export { getCommandPrompt }
