import { CommanderSetup } from '../_type_'
import { getProgramPrompt } from './get-program-prompt'

interface Args {
  setup: CommanderSetup
}

interface Retval {
  program: string
}

async function PROMPT(args: Args): Promise<Retval> {
  const { setup } = args

  const { program } = await getProgramPrompt({ programs: setup.programs })

  return { program }
}

export { PROMPT }
