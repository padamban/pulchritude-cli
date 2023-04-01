import { Command } from 'commander'

import { CommandDetails, CommanderSetup, ProgramDetails } from '../../_type_'

interface Args {
  cmd: Command
  setup: CommanderSetup
}

interface Retval {
  commandChain: string[]
  programName: string | undefined
  commandName: string | undefined
  program: ProgramDetails | undefined
  command: CommandDetails | undefined
}

function resolveCommandChain({ setup, cmd }: Args): Retval {
  const commandChain = getCommandChain(cmd)

  const [, programName, commandName] = commandChain

  let program = setup.programs.find(p => p.name === programName)

  let command = program?.commands.find(c => c.name === commandName)

  return {
    commandChain,
    programName,
    commandName,
    program,
    command,
  }
}

function getCommandChain(cmd: Command): string[] {
  let names: string[] = [cmd.name()]

  if (cmd.parent?.name) {
    names = [...getCommandChain(cmd.parent), ...names]
  }

  return names
}

export { resolveCommandChain }
