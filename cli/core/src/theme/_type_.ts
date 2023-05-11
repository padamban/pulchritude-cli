import { ChalkInstance } from 'chalk'

/**
 * Theme object of the whole CLI.
 */
export interface CliTheme {
  /**
   * Chalk colors used in the CLI.
   */
  color: CliColor
}

/**
 * Array with the color names used in the CLI.
 */
export const COLOR_NAMES = [
  'title',
  'subtitle',
  'program',
  'command',
  'argument',
  'option',
  'gray',
  'success',
  'error',
  'warning',
  'important',
] as const

/**
 * Cli color instances.
 */
export type CliColor = Record<ColorNames, CliColorInstance>

type ColorNames = (typeof COLOR_NAMES)[number]
type CliColorInstance = ChalkInstance
