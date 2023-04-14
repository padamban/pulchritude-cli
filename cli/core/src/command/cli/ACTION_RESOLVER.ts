/* eslint-disable no-console */
import { Command } from 'commander'

import { CliSetupDetails, CommandContext } from '../_type_'
import { PROMPT } from '../prompt/PROMPT'
import { EXECUTE } from './execute'
import { getOptions } from './utils/get-options'
import { getPositionalArgs } from './utils/get-positional-args'
import { resolveCommandChain } from './utils/resolve-command-chain'

interface Args {
  setup: CliSetupDetails
  cmd: Command
  ctx: CommandContext
}

/**
 * Resolves the command provided in the terminal.
 * - Parses the parameters.
 * - Creates prompt inputs.
 * - Validates the inputs.
 * - Executes the commands.
 * - Creates reports about the execution.
 */
export const ACTION_RESOLVER = (args: Args) => {
  const { cmd, setup, ctx } = args

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
        ctx.reporter.render()
        process.exit()
      }, 100)
    }
  })
}
