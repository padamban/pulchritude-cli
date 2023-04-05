import { Command } from 'commander'

import { CommandDetails } from '../../_type_'

interface Args {
  rawArgs: any[]
  command: CommandDetails | undefined
  cmd: Command
}

function getPositionalArgs({ cmd, command, rawArgs }: Args) {
  const [, , ...positional] = [...rawArgs].reverse()

  const positionalArgs = ([...positional].reverse() as any[]).reduce(
    (acc, value, i) => {
      const { _name } = ((cmd as any)._args[i] as any) ?? {}

      const { id } = command?.arguments?.find(c => c.name === _name) ?? {}

      if (id) acc[id] = value

      return acc
    },
    {},
  )

  return positionalArgs
}

export { getPositionalArgs }
