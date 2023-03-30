import prompt from 'prompts'

import { ProgramDetails } from '../_type_'

interface Args {
  programs: ProgramDetails[] | undefined
}

async function getProgramPrompt(
  args: Args,
): Promise<ProgramDetails | undefined> {
  const { programs } = args

  const { programName } = await prompt({
    name: 'programName',
    message: 'Select a program!',
    type: 'select',
    instructions: false,
    choices: programs?.map(p => ({
      title: p.title,
      description: p.description,
      value: p.variableName,
    })),
  })

  const program = programs?.find(p => p.variableName === programName)

  return program
}

export { getProgramPrompt }
