import { Obj, RequireOnly } from '../../utils'
import { ArgumentDetails, CommandDetails, OptionDetails } from '../_type_'

/**
 * Command details with only the essential properties being required.
 */
export type PublicCommandDetails<
  Args extends Obj = any,
  Opts extends Obj = any,
> = RequireOnly<
  Omit<CommandDetails<Args, Opts>, 'arguments' | 'options'>,
  'id' | 'script'
> & {
  arguments?: PublicArgumentDetails<Args>[]
  options?: PublicOptionDetails<Opts>[]
}

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
