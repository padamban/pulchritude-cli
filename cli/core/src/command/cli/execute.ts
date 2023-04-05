import { CommandContext, CommandsToRun, ProgramDetails } from '../_type_'

interface Args {
  setup: any
  program: ProgramDetails | undefined
  commandsToRun: CommandsToRun
  ctx: CommandContext
}

async function EXECUTE(args: Args): Promise<void> {
  const { program, commandsToRun, ctx } = args

  for (const [cmdId, commandToRun] of commandsToRun) {
    const { command, argumentResponse, optionResponse } = commandToRun

    // ctx.reporter.initSection({
    //   id: command.id,
    //   title: command.title,
    //   description: command.title,
    //   arguments: argumentResponse,
    //   options: optionResponse,
    // })

    console.log('commandsToRun', cmdId, {
      command,
      argumentResponse,
      optionResponse,
    })

    // ctx.reporter.endSection()
  }

  // ctx.reporter.finish()
}

export { EXECUTE }
