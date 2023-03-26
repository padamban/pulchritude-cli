import { CliReporter } from '../report'
import { RequireSome } from '../utils'

export interface CommanderSetup {
  name: string
  description: string
  version: `${number}.${number}.${number}${'' | `-${string}`}`
  programs: ProgramDetails[]
}

export interface ProgramDetails {
  variableName: string
  title: string
  description: string
  name: string
  alias: string
  commands: CommandDetails[]
}

export interface CommandDetails {
  variableName: string
  description: string
  name: string
  alias: string
  arguments?: ArgumentDetails[]
  options?: OptionDetails[]
}

export interface OptionDetails {
  variableName: string
  description: string
  type: 'boolean' | 'string' | 'string-array'
  showUsageExample?: boolean
  values?: {
    name: string
    value: string
  }[]
  name?: `--${string}`
  alias?: `-${string}`
}

export interface ArgumentDetails {
  variableName: string
  description: string
  type: 'string'
  name?: string
  required?: boolean
  variadic?: boolean
  showUsageExample?: boolean
}

export interface CommandContext {
  reporter: CliReporter
}

export type FlagOption = `--${string}`

export type FlagOptionAlias = `-${string}`

export type ResolvedArgumentDetails = RequireSome<ArgumentDetails, 'name'>

export type ResolvedOptionDetails = RequireSome<OptionDetails, 'name' | 'alias'>
