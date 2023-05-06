import { ChalkInstance } from 'chalk'

export interface CliTheme {
  color: CliColor
}

export interface CliColor {
  title: CliColorInstance
  subtitle: CliColorInstance
  program: CliColorInstance
  command: CliColorInstance
  argument: CliColorInstance
  option: CliColorInstance
  gray: CliColorInstance
  success: CliColorInstance
  error: CliColorInstance
  warning: CliColorInstance
  important: CliColorInstance
}

type CliColorInstance = ChalkInstance
