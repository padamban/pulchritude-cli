/* eslint-disable no-console */
import prompt from 'prompts'

import { ProgramDetails } from '../_type_'

interface Args {
  programs: ProgramDetails[]
}

interface Retval {
  program: string
}

async function getProgramPrompt(args: Args): Promise<Retval> {
  const { programs } = args

  const response = await prompt({
    name: 'program',
    message: 'Select a program!',
    type: 'select',
    instructions: false,
    choices: programs.map(p => ({
      title: p.title,
      description: p.description,
      value: p.name,
    })),
  })

  return response
}

export { getProgramPrompt }
