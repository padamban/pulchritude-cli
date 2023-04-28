import { CommandDetails } from '../../_type_'

interface Args {
  command: CommandDetails
}

/**
 * Check if the command has parameters.
 */
export const hasParameters = (args: Args): boolean => {
  const { command } = args

  return !!(command.arguments?.length || command.options?.length)
}
