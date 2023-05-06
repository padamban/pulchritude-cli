import { CliTheme } from '../../theme'
import { Obj, OmitType, ReplacePropertyType, RequireOnly } from '../../utils'
import {
  ArgumentDetails,
  CliSetupDetails,
  CommandDetails,
  OptionDetails,
  ProgramDetails,
  SemanticVersion,
} from '../_type_'

/**
 * Program details with only the essential properties being required.
 */
export type CliSetup = Omit<
  Partial<CliSetupDetails>,
  'programs' | 'packageVersion'
> &
  Partial<ReplacePropertyType<CliSetupDetails, 'programs', ProgramSetup[]>>

/**
 * Arguments of the setup resolver function.
 */
export interface ResolveSetupArgs {
  /**
   * CLI configuration.
   */
  rawSetup: CliSetup | undefined

  /**
   * Version of the CLI package.
   */
  packageVersion?: SemanticVersion

  /**
   * Theme of the CLI.
   */
  theme: CliTheme
}

/**
 * Program details with only the essential properties being required.
 */
export type ProgramSetup = RequireOnly<Omit<ProgramDetails, 'commands'>, 'id'> &
  ReplacePropertyType<ProgramDetails, 'commands', CommandSetup<any, any>[]>

/**
 * Command details with only the essential properties being required.
 */
export type CommandSetup<
  Args extends Obj = any,
  Opts extends Obj = any,
> = RequireOnly<
  Omit<CommandDetails<Args, Opts>, 'arguments' | 'options'>,
  'id' | 'script'
> &
  ReplacePropertyType<CommandDetails, 'options', OptionSetup<Opts>[]> &
  ReplacePropertyType<CommandDetails, 'arguments', ArgumentSetup<Args>[]>

/**
 * Argument details with only the essential properties being required.
 */
export type ArgumentSetup<Args extends Obj = any> = RequireOnly<
  OmitType<ArgumentDetails<Args>>,
  'id'
>

/**
 * Option details with only the essential properties being required.
 */
export type OptionSetup<Opts extends Obj = any> = RequireOnly<
  OmitType<OptionDetails<Opts>>,
  'id'
>
