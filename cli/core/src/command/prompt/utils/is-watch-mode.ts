import { Obj } from '../../../utils'
import { CommandDetails } from '../../_type_'

interface Args {
  command: CommandDetails
  options: Obj
}

/**
 * Check if the command is in watch mode.
 */
export const isWatchMode = (args: Args) => {
  const { command, options } = args

  const watched = !!command.options
    ?.filter(opt => opt.watchMode)
    .filter(opt => options[opt.id] === true).length

  return watched
}
