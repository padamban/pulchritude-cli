import { CliProgress } from '../progress'
import { CliReporter, CliReportLogger } from '../report'
import { Obj, RequireSome } from '../utils'

export interface CommanderSetup {
  name: string
  description: string
  version: `${number}.${number}.${number}${'' | `-${string}`}`
  programs: ProgramDetails[]
}

export interface ProgramDetails {
  id: string
  title: string
  description: string
  name: string
  alias: string
  commandGroupName?: { singular: string }
  commands: CommandDetails[]
  multiCommand?: boolean
}

export interface CommandDetails {
  id: string
  title: string
  description: string
  name: string
  alias: string
  arguments?: ArgumentDetails[]
  options?: OptionDetails[]
  script: CliScript
}

export type ArgumentType = 'string' | 'number'

export type OptionType = 'boolean' | 'string' | 'number'

export interface OptionDetails {
  id: string
  title: string
  description: string
  type: OptionType
  watchMode?: boolean
  variadic?: boolean
  showUsageExample?: boolean
  choices?: ChoiceDetails[]
  name?: `--${string}`
  alias?: `-${string}`
}

export interface ArgumentDetails {
  id: string
  description: string
  title: string
  type: ArgumentType
  name?: string
  required?: boolean
  variadic?: boolean
  showUsageExample?: boolean
  choices?: ChoiceDetails[]
}

export interface ChoiceDetails {
  name: string
  value: string
}

export interface CommandContext {
  cwd?: string
  reporter: CliReporter
}

export type CliScriptExe = () => Promise<void>

export type CliScript<
  Args extends object = any,
  Opts extends object = any,
> = (props: {
  // log: CliReportLogger
  // progress: Pick<
  //   CliReportProgress,
  //   'setSubSectionCount' | 'nextActiveSubSection'
  // >
  // fileBuilder: ReturnType<CliFileBuilders>
  // fileManager: ReturnType<CliFileManager>
  arguments: Args
  options: Opts
  cwd: string
  log: CliReportLogger
  progress?: CliProgress
}) => CliScriptExe

export type FlagOption = `--${string}`

export type FlagOptionAlias = `-${string}`

export type ResolvedArgumentDetails = RequireSome<ArgumentDetails, 'name'>

export type ResolvedOptionDetails = RequireSome<OptionDetails, 'name' | 'alias'>

export interface GlobalOptions {
  help: OptionDetails
  noPrompt: OptionDetails
}

export type CommandsToRun = Map<
  string,
  {
    command: CommandDetails
    argumentResponse: Obj
    optionResponse: Obj
    watchMode: boolean
  }
>