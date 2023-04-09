import { Obj, RequireOnly } from '../../utils'
import { ArgumentDetails, CommandDetails, OptionDetails } from '../_type_'

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

export type PublicArgumentDetails<Args extends Obj = any> = RequireOnly<
  ArgumentDetails<Args>,
  'id'
>

export type PublicOptionDetails<Opts extends Obj = any> = RequireOnly<
  OptionDetails<Opts>,
  'id'
>
