import { CommandContext, CommandsToRun, ProgramDetails } from '../_type_'

interface Args {
  setup: any
  program: ProgramDetails | undefined
  commandsToRun: CommandsToRun
  ctx: CommandContext
}

function EXECUTE(args: Args) {
  const { program, commandsToRun, ctx } = args

  commandsToRun.forEach(({ command, argumentResponse, optionResponse }) => {
    console.log('commandsToRun', { command, argumentResponse, optionResponse })
  })

  console.log('RUN_SCRIPT', { program, commandsToRun, ctx })
}

export { EXECUTE }
