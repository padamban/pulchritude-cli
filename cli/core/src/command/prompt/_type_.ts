import { CliTheme } from '../../theme/_type_'
import { Obj } from '../../utils'
import {
  CliSetupDetails,
  CommandDetails,
  CommandsToRun,
  ProgramDetails,
} from '../_type_'

/**
 * Prompt utility config object.
 */
export interface PromptConfig {
  /**
   * Theme object.
   */
  theme: CliTheme
}

/**
 * Prompt utility argument object.
 */
export interface PromptArgs {
  /**
   * CLI config.
   */
  setup: CliSetupDetails

  /**
   * Already selected CLI program.
   */
  program: ProgramDetails | undefined

  /**
   * Already selected CLI program command.
   */
  command: CommandDetails | undefined

  /**
   * Values of the command's arguments.
   */
  argumentValues: Obj

  /**
   * Values of the command's options.
   */
  optionValues: Obj

  /**
   * Prompt utility config object.
   */
  config: PromptConfig
}

/**
 * Response of the prompt utility.
 */
export interface PromptRetval {
  /**
   * Selected program.
   */
  program: ProgramDetails | undefined

  /**
   * Selected commands that need to be executed.
   */
  commandsToRun: CommandsToRun

  /**
   * Has watch mode flag.
   */
  watch: boolean
}
