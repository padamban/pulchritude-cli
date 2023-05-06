/* eslint-disable no-console */
import prompt from 'prompts'

import { ProgramDetails } from '../_type_'
import { PromptConfig } from './_type_'

interface Args {
  selectedProgram?: ProgramDetails
  programs: ProgramDetails[] | undefined
  noPrompt: boolean
  config: PromptConfig
}

/**
 * Show a prompt asking for a program.
 */
async function getProgramPrompt(
  args: Args,
): Promise<ProgramDetails | undefined> {
  const { programs, selectedProgram, noPrompt, config } = args
  const { color } = config.theme

  if (selectedProgram) {
    if (!noPrompt) {
      console.log(
        color.gray(
          `\nSelected program:    ${color.program(selectedProgram.title)}`,
        ),
      )
    }

    return selectedProgram
  }

  const { programId } = await prompt({
    name: 'programId',
    message: `Select a program!`,
    type: 'select',
    instructions: false,
    choices: programs?.map(p => ({
      title: color.program(p.title),
      description: `(${p.alias}) ${p.description}`,
      value: p.id,
    })),
  })

  const program = programs?.find(p => p.id === programId)

  return program
}

export { getProgramPrompt }
