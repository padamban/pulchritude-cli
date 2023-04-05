import { Command } from 'commander'

import { CommanderSetup } from '../_type_'
import { PROMPT } from '../prompt/PROMPT'
import { EXECUTE } from './execute'
import { getOptions } from './utils/get-options'
import { getPositionalArgs } from './utils/get-positional-args'
import { resolveCommandChain } from './utils/resolve-command-chain'

interface Args {
  setup: CommanderSetup
  cmd: Command
  ctx: any
}

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

    // const watch = false

    // if (!watch) {
    //   setTimeout(() => {
    //     console.log('KKK', ctx.reporter.getReport())

    //     // renderReport({
    //     //   config,
    //     //   report: ctx.reporter.getReport(),
    //     //   fileManager: ctx.fileManager,
    //     // })
    //     process.exit()
    //   }, 100)
    // }
  })
}
