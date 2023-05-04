import { CliTheme } from '../../theme/_type_'
import { Obj } from '../../utils'
import {
  CliSetupDetails,
  CommandDetails,
  CommandsToRun,
  ProgramDetails,
} from '../_type_'

export interface PromptConfig {
  theme: CliTheme
}

export interface PromptArgs {
  setup: CliSetupDetails
  program: ProgramDetails | undefined
  command: CommandDetails | undefined
  argumentValues: Obj
  optionValues: Obj
  config: PromptConfig
}

export interface PromptRetval {
  program: ProgramDetails | undefined
  commandsToRun: CommandsToRun
  watch: boolean
}
