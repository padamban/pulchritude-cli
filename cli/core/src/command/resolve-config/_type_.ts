import { Obj, ReplacePropertyType, RequireOnly } from '../../utils'
import {
  ArgumentDetails,
  CommandDetails,
  OptionDetails,
  ProgramDetails,
} from '../_type_'

/**
 * Program details with only the essential properties being required.
 */
export type PublicProgramDetails = RequireOnly<
  Omit<ProgramDetails, 'commands'>,
  'id'
> &
  ReplacePropertyType<
    ProgramDetails,
    'commands',
    PublicCommandDetails<any, any>[]
  >

/**
 * Command details with only the essential properties being required.
 */
export type PublicCommandDetails<
  Args extends Obj = any,
  Opts extends Obj = any,
> = RequireOnly<
  Omit<CommandDetails<Args, Opts>, 'arguments' | 'options'>,
  'id' | 'script'
> &
  ReplacePropertyType<CommandDetails, 'options', PublicOptionDetails<Opts>[]> &
  ReplacePropertyType<
    CommandDetails,
    'arguments',
    PublicArgumentDetails<Args>[]
  >

/**
 * Argument details with only the essential properties being required.
 */
export type PublicArgumentDetails<Args extends Obj = any> = RequireOnly<
  ArgumentDetails<Args>,
  'id'
>

/**
 * Option details with only the essential properties being required.
 */
export type PublicOptionDetails<Opts extends Obj = any> = RequireOnly<
  OptionDetails<Opts>,
  'id'
>
