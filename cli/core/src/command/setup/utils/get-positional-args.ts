import { Command } from 'commander'

interface GetPositionalArgs {
  rawArgs: any[]
  cmd: Command
}

function getPositionalArgs({ cmd, rawArgs }: GetPositionalArgs) {
  const [, , ...positional] = [...rawArgs].reverse()

  const positionalArgs = ([...positional].reverse() as any[]).reduce(
    (acc, value, i) => {
      const argumentDetail = (cmd as any)._args[i] as any

      acc[argumentDetail._name] = value

      return acc
    },
    {},
  )

  return positionalArgs
}

export { getPositionalArgs }
