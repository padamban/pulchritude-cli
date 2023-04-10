import { asArray } from '../../../utils/as-array'
import { CommandToRun } from '../../_type_'

interface Args {
  cliId: string
  programId: string
  commandToRun: CommandToRun
}

function createTerminalCommand({
  cliId,
  programId,
  commandToRun,
}: Args): string {
  let cmd = `${cliId} ${programId} ${commandToRun.command.name}`

  console.log(commandToRun)

  cmd += commandToRun.command.arguments?.reduce((acc, arg) => {
    const value = commandToRun.argumentResponse[arg.id]
    if (value !== undefined) acc += ' ' + asArray(value).join(' ')
    return acc
  }, '')

  cmd +=
    commandToRun.command.options?.reduce((acc, opt) => {
      const value = commandToRun.optionResponse[opt.id]
      if (value !== undefined) acc += ` ${opt.name}`

      if (typeof value === 'boolean') {
        if (value === false) acc += ' false'
        return acc
      }

      acc += ` ${asArray(value).join(',')}`

      return acc
    }, '') + ' -np'

  return cmd
}

export { createTerminalCommand }
