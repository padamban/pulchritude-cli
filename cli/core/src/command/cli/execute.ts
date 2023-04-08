/* eslint-disable no-console */
import { CommandContext, CommandsToRun, ProgramDetails } from '../_type_'
import { Color } from './colors'

interface Args {
  setup: any
  program: ProgramDetails | undefined
  commandsToRun: CommandsToRun
  ctx: CommandContext
  watch: boolean
}

async function EXECUTE(args: Args): Promise<void> {
  const { commandsToRun, ctx, watch } = args
  ctx.reporter.start()

  if (watch) ctx.reporter?.disable()

  for (const [, commandToRun] of commandsToRun) {
    const { command, argumentResponse, optionResponse, watchMode } =
      commandToRun

    if (watch) {
      if (watchMode) {
        console.log(`\n${Color.command(command.title)} - Watching...`)
      } else {
        console.log(`\n${Color.command(command.title)} - Executed`)
      }
    }

    ctx.reporter.initSection({
      id: command.id,
      title: command.title,
      description: command.title,
      arguments: argumentResponse,
      options: optionResponse,
    })

    try {
      await command.script({
        cwd: ctx.cwd ?? process.cwd(),
        arguments: argumentResponse,
        options: optionResponse,
        log: ctx.reporter.log,
        progress: ctx.reporter.progress,
      })()
    } catch (error) {
      ctx.reporter.log.error(error)
    }

    ctx.reporter.endSection()
  }

  ctx.reporter.finish()
}

export { EXECUTE }
