import prompt from 'prompts'

import { ProgramDetails } from '../_type_'

interface Args {
  programs: ProgramDetails[] | undefined
}

async function getProgramPrompt(
  args: Args,
): Promise<ProgramDetails | undefined> {
  const { programs } = args

  const { programId } = await prompt({
    name: 'programId',
    message: 'Select a program!',
    type: 'select',
    instructions: false,
    choices: programs?.map(p => ({
      title: p.title,
      description: `(${p.alias}) ${p.description}`,
      value: p.id,
    })),
  })

  const program = programs?.find(p => p.id === programId)

  return program
}

export { getProgramPrompt }
