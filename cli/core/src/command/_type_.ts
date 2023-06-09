import { FileBuilderInstance } from '../file-builder/_type_'
import { FileManagerInstance } from '../file-manager'
import { SubProgressBar } from '../progress'
import { CliReporter, CliReportLogger, ReportRendererConfig } from '../report'
import { CliTheme } from '../theme/_type_'
import { Obj, StringKeyof, Type } from '../utils'

/**
 * Semantic version.
 */
export type SemanticVersion =
  | `${number}.${number}.${number}${'' | `-${string}`}`
  | 'unknown'

/**
 * Config object for the CLI.
 */
export interface CliSetupDetails {
  /**
   * Name of the CLI.
   * - same as the npm bin or script name.
   */
  name: string

  /**
   * Short description of the CLI application.
   */
  description: string

  /**
   * Semantic version of the CLI tool config file.
   */
  version: SemanticVersion

  /**
   * Semantic version of the CLI tool package.
   */
  packageVersion: SemanticVersion

  /**
   * Configuration of the reporter.
   */
  reporterConfig?: Pick<ReportRendererConfig, 'output' | 'outputFolderPath'>

  /**
   * Programs of the CLI tool.
   * - Each program can have multiple commands
   * - The commands have parameters and a script to run.
   */
  programs: ProgramDetails[]

  /**
   * Theme of the CLI.
   */
  theme: CliTheme
}

/**
 * Internally used program config object.
 */
export interface ProgramDetails extends Type<'program'> {
  /**
   * Id of the program. (camelCase).
   * @example `myCalculator`
   */
  id: string

  /**
   * The title name of the program, that is displayed for the user in the prompt or documentation.
   * @example `My calculator`
   */
  title: string

  /**
   * The description of the program, that is displayed for the user.
   * @example `Collection of mathematical operations`
   */
  description: string

  /**
   * The commander name for the program. (kebab-case).
   * @example `my-calculator`
   */
  name: string

  /**
   * The commander alias for the program. (initialism).
   * @example `mc`
   */
  alias: string

  /**
   * The commands/operations that this program has.
   * @example add numbers, multiply
   */
  commands: CommandDetails[]

  /**
   * Can run multiple commands sequentially.
   * - the order will be the same as in the commands array
   * - useful when we want to run multiple scripts at once
   * - only the last script can be in watch mode.
   */
  isMultiCommand?: boolean
}

/**
 * Internally used command config object.
 */
export interface CommandDetails<Args extends Obj = any, Opts extends Obj = any>
  extends Type<'command'> {
  /**
   * Id of the command. (camelCase).
   * @example
   * id: `addNumbers`
   */
  id: string

  /**
   * The title name of the command, that is displayed for the user in the prompt or documentation.
   * @example
   * title: `Add numbers`
   */
  title: string

  /**
   * The description of the command, that is displayed for the user.
   * @example
   * description: `Mathematical operation for summing numbers`
   */
  description: string

  /**
   * The commander name for the command (kebab-case).
   * @example
   * name: `add-numbers`
   */
  name: string

  /**
   * The commander alias for the command (initialism).
   * @example
   * alias: `an`
   */
  alias: string

  /**
   * The positional arguments of the cli command.
   * @example
   * `$ CLI my-calculator add-numbers <values...>`
   * `$ CLI my-calculator add-numbers 34 43 45`
   */
  arguments?: ArgumentDetails<Args>[]

  /**
   * The options of the cli command.
   * @example
   * `$ CLI my-calculator add-numbers <arguments...> --option <option-value>`
   * `$ CLI my-calculator add-numbers 34 43 45 --decimals 3`
   */
  options?: OptionDetails<Opts>[]

  /**
   * The script that resolves the command. It receives the parameters and executes the operation.
   * @example
   * $ CLI my-calculator add-numbers 34 43 45 --decimals 3
   * @example
   * script: ({args, opts}) => async () => args
   *    .values
   *    .reduce((sum, v) => sum + v, 0)
   *    .toFixed(opts.decimals)
   */
  script: CliScript<Args, Opts>
}

/**
 * The primitive type of the argument.
 */
export type ArgumentType = 'string' | 'number'

/**
 * The primitive type of the option.
 */
export type OptionType = 'boolean' | 'string' | 'number'

/**
 * The argument of the command.
 */
export interface ArgumentDetails<Args extends Obj = any>
  extends Type<'argument'> {
  /**
   * Id of the argument. (camelCase).
   * @example `numberValues`
   */
  id: StringKeyof<Args>

  /**
   * The title name of the argument, that is displayed for the user in the prompt or documentation.
   * @example `Number values`
   */
  title: string

  /**
   * The description of the argument, that is displayed for the user.
   * @example `Numbers to be summed.`
   */
  description: string

  /**
   * The primitive type of the argument value(s).
   */
  type?: ArgumentType

  /**
   * The commander name for the argument. (kebab-case).
   * @example `number-values`
   */
  name: string

  /**
   * Is the argument required?
   */
  required?: boolean

  /**
   * The argument value is an array of same value types.
   * @example
   * `add-numbers <numberValues...>`
   * `add-numbers 67 87 98`
   */
  variadic?: boolean

  /**
   * Predefined argument choices.
   * - if the argument is variadic it can select multiple values.
   */
  choices?: ChoiceDetails[]
}

/**
 * The option of the command.
 */
export interface OptionDetails<Opts extends Obj = any> extends Type<'option'> {
  /**
   * Id of the option. (camelCase).
   * @example `noDecimals`
   */
  id: StringKeyof<Opts>

  /**
   * The title name of the option, that is displayed for the user in the prompt or documentation.
   * @example `No decimals`
   */
  title: string

  /**
   * The description of the option, that is displayed for the user.
   * @example `Don't show decimals.`
   */
  description: string

  /**
   * The primitive type of the option value(s).
   */
  type?: OptionType

  /**
   * The commander name for the option. (--kebab-case).
   * @example `--some-values`
   */
  name: FlagOption

  /**
   * The commander alias for the option. (-initialism).
   * @example `-sv`
   */
  alias: FlagOptionAlias

  /**
   * Is a watch flag.
   * - This option signals an unending script.
   */
  watchMode?: boolean

  /**
   * The option value is an array of same value type.
   * @example
   * `add-numbers --some-values 23 32 43`
   */
  variadic?: boolean

  /**
   * Predefined option choices.
   * - If the argument is variadic it can select multiple values.
   */
  choices?: ChoiceDetails[]
}

/**
 * Parameter (argument, option) choices.
 */
export interface ChoiceDetails {
  /**
   * Display name for the choices.
   */
  name: string

  /**
   * Value of the choice.
   */
  value: string | number | boolean
}

/**
 * Common singleton object that every command receives.
 */
export interface CommandContext {
  /**
   * Current working directory.
   *
   * The directory in which the CLI application is running.
   */
  cwd?: string

  /**
   * Initialized CLI reporter object.
   * Contains:
   * - logger
   * - progress bar
   * - report renderer.
   */
  reporter: CliReporter

  /**
   * Create file content.
   */
  fileBuilder: FileBuilderInstance

  /**
   * Write/read/list files.
   */
  fileManager: FileManagerInstance

  /**
   * Theme of the CLI.
   */
  theme: CliTheme
}

/**
 * Thunk function for declaring and executing and  the script.
 */
export type CliScript<
  Args extends Obj = any,
  Opts extends Obj = any,
> = (props: {
  /**
   * Arguments of the command.
   */
  args: Args

  /**
   * Options of the command.
   */
  opts: Opts

  /**
   * Current working directory.
   */
  cwd: string

  /**
   * Manipulate this script's portion of the progress bar.
   */
  progress: SubProgressBar | undefined

  /**
   * Log information about the script into the report.
   */
  log: CliReportLogger

  /**
   * Create file content.
   */
  fileBuilder: FileBuilderInstance

  /**
   * Write/read/list files.
   */
  fileManager: FileManagerInstance
}) => () => Promise<void>

/**
 * The commander name for the option. (--kebab-case).
 * @example `--some-values`
 */
export type FlagOption = `--${string}`

/**
 * The commander alias for the option. (-initialism).
 * @example `-sv`
 */
export type FlagOptionAlias = `-${string}`

/**
 * These options are available for all command.
 */
export interface GlobalOptions {
  /**
   * Show help + documentation for the program or command.
   */
  help: OptionDetails

  /**
   * Do not show prompt inputs, if not fully required.
   */
  noPrompt: OptionDetails
}

/**
 * Command with its details to run.
 */
export interface CommandToRun {
  /**
   * Command config.
   */
  command: CommandDetails

  /**
   * Argument values object.
   */
  argumentResponse: Obj

  /**
   * Option values object.
   */
  optionResponse: Obj

  /**
   * Is the last command in the sequence is in watch mode.
   */
  watchMode: boolean
}

/**
 * Map of commandId and the command with its details to run.
 */
export type CommandsToRun = Map<string, CommandToRun>
