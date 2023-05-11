import { Command } from 'commander'

import { CliSetupDetails, CommandDetails, ProgramDetails } from '../../_type_'

interface Args {
  cmd: Command
  setup: CliSetupDetails
}

interface Retval {
  commandChain: string[]
  programName: string | undefined
  commandName: string | undefined
  program: ProgramDetails | undefined
  command: CommandDetails | undefined
}

/**
 * Enrich the option details with extra data.
 */
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

/**
 * Get the names of the selected.
 * - E.g.: `['app', 'program', 'command']`.
 */
function getCommandChain(cmd: Command): string[] {
  let names: string[] = [cmd.name()]

  if (cmd.parent?.name) {
    names = [...getCommandChain(cmd.parent), ...names]
  }

  return names
}

export { resolveCommandChain }
