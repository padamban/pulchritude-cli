import { asArray } from '../../../utils'
import { CommandToRun } from '../../_type_'

interface Args {
  cliName: string
  programName: string
  commandToRun: CommandToRun
}

/**
 * Create a string that can rerun the command.
 * @example
 * CLI math sqrt 32 --decimal 4  -np
 */
function createTerminalCommand({
  cliName,
  programName,
  commandToRun,
}: Args): string {
  let cmd = `${cliName} ${programName} ${commandToRun.command.name}`

  if (commandToRun.command.arguments) {
    cmd += commandToRun.command.arguments.reduce((acc, arg) => {
      const value = commandToRun.argumentResponse[arg.id]
      if (value !== undefined) acc += ' ' + asArray(value).join(' ')
      return acc
    }, '')
  }

  if (commandToRun.command.options) {
    cmd += commandToRun.command.options.reduce((acc, opt) => {
      const value = commandToRun.optionResponse[opt.id]
      if (value !== undefined) acc += ` ${opt.name}`

      if (typeof value === 'boolean') {
        if (value === false) acc += ' false'
        return acc
      }

      acc += ` ${asArray(value).join(',')}`

      return acc
    }, '')
  }

  cmd += ' -np'

  return cmd
}

export { createTerminalCommand }
