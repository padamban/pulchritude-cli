import { Command } from 'commander'

function getCommandChain(cmd: Command): string[] {
  let names: string[] = [cmd.name()]

  if (cmd.parent?.name) {
    names = [...getCommandChain(cmd.parent), ...names]
  }

  return names
}

export { getCommandChain }
