import { Obj } from '../../utils'
import {
  CommandDetails,
  CommanderSetup,
  CommandsToRun,
  ProgramDetails,
} from '../_type_'
import { getArgumentsPrompt } from './get-arguments.prompt'
import { getCommandPrompt } from './get-command.prompt'
import { getOptionsPrompt } from './get-options.prompt'
import { getProgramPrompt } from './get-program.prompt'
import { fixParameterValues } from './utils/fix-parameter-values'

interface Args {
  setup: CommanderSetup
  program: ProgramDetails | undefined
  command: CommandDetails | undefined
  argumentValues: Obj
  optionValues: Obj
}

interface Retval {
  program: ProgramDetails | undefined
  commandsToRun: CommandsToRun
}

async function PROMPT(args: Args): Promise<Retval> {
  // eslint-disable-next-line no-console
  console.log('')

  const program =
    args.program ?? (await getProgramPrompt({ programs: args.setup.programs }))

  const commands = args.command
    ? [args.command]
    : await getCommandPrompt({ program })

  const noPrompt = args.optionValues.prompt === false

  const commandsToRun: CommandsToRun = new Map()

  for (const command of commands) {
    let argumentResponse: Obj = {}
    let optionResponse: Obj = {}

    if (noPrompt) {
      argumentResponse = args.argumentValues
      optionResponse = args.optionValues
    } else {
      argumentResponse = await getArgumentsPrompt({
        values: args.argumentValues,
        command,
      })

      optionResponse = await getOptionsPrompt({
        values: args.optionValues,
        command,
      })
    }

    fixParameterValues({
      command,
      argumentValues: argumentResponse,
      optionValues: optionResponse,
    })

    commandsToRun.set(command.id, {
      command,
      argumentResponse,
      optionResponse,
    })
  }

  return {
    program,
    commandsToRun,
  }
}

export { PROMPT }
