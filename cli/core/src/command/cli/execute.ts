/* eslint-disable no-console */
import {
  CliSetupDetails,
  CommandContext,
  CommandsToRun,
  ProgramDetails,
} from '../_type_'
import { Color } from './colors'
import { createTerminalCommand } from './utils/create-terminal-command'

interface Args {
  setup: CliSetupDetails
  program: ProgramDetails | undefined
  commandsToRun: CommandsToRun
  ctx: CommandContext
  watch: boolean
}

/**
 * Execute the scripts of the selected commands.
 */
async function EXECUTE(args: Args): Promise<void> {
  const { commandsToRun, ctx, watch, program, setup } = args

  ctx.reporter.start()

  if (watch) ctx.reporter?.disable()

  ctx.reporter?.progress?.setSectionCount(Array.from(commandsToRun).length)

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

    ctx.reporter.addTerminalCommand(
      createTerminalCommand({
        cliName: setup.name,
        programName: program?.name ?? 'program',
        commandToRun,
      }),
    )

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
        args: argumentResponse,
        opts: optionResponse,
        log: ctx.reporter.log,
        fileBuilder: ctx.fileBuilder,
        fileManager: ctx.fileManager,
      })()
    } catch (error) {
      ctx.reporter.log.error(error)
    }

    ctx.reporter.endSection()
  }

  ctx.reporter.finish()
}

export { EXECUTE }
