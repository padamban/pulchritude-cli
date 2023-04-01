import { Obj } from '../../utils'
import { CommandDetails, CommanderSetup, ProgramDetails } from '../_type_'
import { getArgumentsPrompt } from './get-arguments.prompt'
import { getCommandPrompt } from './get-command.prompt'
import { getOptionsPrompt } from './get-options.prompt'
import { getProgramPrompt } from './get-program.prompt'

interface Args {
  setup: CommanderSetup
  program: ProgramDetails | undefined
  command: CommandDetails | undefined
  argumentValues: Obj
  optionValues: Obj
}

interface Retval {
  // commandChain: [programId: string, commandId: string]
  program: ProgramDetails | undefined
  command: CommandDetails | undefined
  argumentResponse: any
  optionResponse: any
}

async function PROMPT(args: Args): Promise<Retval> {
  // eslint-disable-next-line no-console
  console.log('')

  const program =
    args.program ?? (await getProgramPrompt({ programs: args.setup.programs }))

  const command =
    args.command ?? (await getCommandPrompt({ commands: program?.commands }))

  const noPrompt = args.optionValues.prompt === false

  const argumentResponse = noPrompt
    ? args.argumentValues
    : await getArgumentsPrompt({
        values: args.argumentValues,
        arguments: command?.arguments,
      })

  const optionResponse = noPrompt
    ? {}
    : await getOptionsPrompt({
        options: command?.options,
      })

  return {
    program,
    command,
    argumentResponse,
    optionResponse,
  }
}

export { PROMPT }
