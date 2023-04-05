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
    const argumentValues = getPositionalArgs({ cmd, rawArgs })

    const optionValues = getOptions({ rawArgs })

    const { program, command } = resolveCommandChain({ cmd, setup })

    const promptResponse = await PROMPT({
      setup,
      program,
      command,
      argumentValues,
      optionValues,
    })

    EXECUTE({ setup, ctx, ...promptResponse })
  })
}
