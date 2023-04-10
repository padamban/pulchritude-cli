import { ProgramDetails } from '../_type_'
import { PublicProgramDetails } from './_type_'
import { resolveProgramDetails } from './resolve-program-details'

/**
 * Create a program frame.
 * - infers some of the config properties from the `id`
 */
export const CREATE_PROGRAM = (config: PublicProgramDetails): ProgramDetails =>
  resolveProgramDetails(config)
