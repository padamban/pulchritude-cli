import { Command } from 'commander'

import { CommanderSetup } from '../_type_'
import { PROMPT } from '../prompt/PROMPT'
import { RUN_SCRIPT } from '../script/RUN_SCRIPT'
import { getCommandChain } from './utils/get-command-chain'
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

    const commandChain = getCommandChain(cmd)

    const chain = resolveCommandChain({ cmd, setup })

    const response = await PROMPT({
      setup,
      argumentValues,
      optionValues,
      ...chain,
    })

    console.log('HELLO 2', cmd.name(), {
      ctx,
      setup,
      argumentValues,
      optionValues,
      commandChain,
      chain,
      response,
    })

    RUN_SCRIPT({})
  })
}
