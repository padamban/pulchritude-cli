import { Command } from 'commander'

import { PROMPT } from '../prompt/PROMPT'
import { getCommandChain } from './utils/get-command-chain'
import { getOptions } from './utils/get-options'
import { getPositionalArgs } from './utils/get-positional-args'

interface Args {
  setup: any
  cmd: Command
  ctx: any
}

export const ACTION_RESOLVER = (args: Args) => {
  const { cmd, setup, ctx } = args

  cmd.action(async (...rawArgs) => {
    const positionalArgs = getPositionalArgs({ cmd, rawArgs })

    const options = getOptions({ rawArgs })

    const commandChain = getCommandChain(cmd)

    const { program } = await PROMPT({ setup })

    console.log('HELLO', cmd.name(), {
      ctx,
      setup,
      options,
      positionalArgs,
      commandChain,
      program,
    })
  })
}
