import { Obj } from '../../utils'
import { CommandDetails } from '../_type_'
import { PublicCommandDetails } from './_type_'
import { resolveCommandDetails } from './utils/resolve-command-details'

/**
 * Create a command with typed arguments and options.
 */
export const CREATE_COMMAND = <Args extends Obj = any, Opts extends Obj = any>(
  config: PublicCommandDetails<Args, Opts>,
): CommandDetails<Args, Opts> => resolveCommandDetails(config)
