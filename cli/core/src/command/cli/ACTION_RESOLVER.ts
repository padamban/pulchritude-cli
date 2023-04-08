/* eslint-disable no-console */
import { Command } from 'commander'
import path from 'path'

import { FILE_MANAGER } from '../../file-manager'
import { renderReportAsJson } from '../../report/renderer/render-report-as-json'
import { renderReportAsMarkdown } from '../../report/renderer/render-report-as-md'
import { renderReportToConsole } from '../../report/renderer/render-report-to-console'
import { CommandContext, CommanderSetup } from '../_type_'
import { PROMPT } from '../prompt/PROMPT'
import { EXECUTE } from './execute'
import { getOptions } from './utils/get-options'
import { getPositionalArgs } from './utils/get-positional-args'
import { resolveCommandChain } from './utils/resolve-command-chain'

interface Args {
  setup: CommanderSetup
  cmd: Command
  ctx: CommandContext
}

export const ACTION_RESOLVER = (args: Args) => {
  const { cmd, setup, ctx } = args

  const fileManager = FILE_MANAGER({ cwd: ctx.cwd ?? process.cwd() })

  cmd.action(async (...rawArgs) => {
    const { program, command } = resolveCommandChain({ cmd, setup })

    const argumentValues = getPositionalArgs({ cmd, command, rawArgs })

    const optionValues = getOptions({ rawArgs })

    const promptResponse = await PROMPT({
      setup,
      program,
      command,
      argumentValues,
      optionValues,
    })

    await EXECUTE({ setup, ctx, ...promptResponse })

    if (!promptResponse.watch) {
      setTimeout(() => {
        if (ctx.reporter.args?.output.includes('console')) {
          renderReportToConsole({
            width: ctx.reporter.args?.width,
            report: ctx.reporter.getReport(),
          })
        }

        if (ctx.reporter.args?.output.includes('json')) {
          renderReportAsJson({
            filePath: path.join(
              ctx.reporter.args.outputFolderPath,
              'report.json',
            ),
            report: ctx.reporter.getReport(),
            fileManager,
          })
        }

        if (ctx.reporter.args?.output.includes('md')) {
          renderReportAsMarkdown({
            filePath: path.join(
              ctx.reporter.args.outputFolderPath,
              'report.md',
            ),
            report: ctx.reporter.getReport(),
            fileManager,
          })
        }

        process.exit()
      }, 100)
    }
  })
}
