import { Command } from 'commander'

function getCommandChain(cmd: Command): string[] {
  let names: string[] = [cmd.name()]

  if (cmd.parent?.name) {
    names.push(...getCommandChain(cmd.parent))
  }

  return names
}

export { getCommandChain }
