/* eslint-disable no-console */

import { CliTheme, SemanticVersion } from '@pulchritude-cli/core'

interface Args {
  /**
   * Width of the cli console output.
   */
  width: number

  /**
   * Cli config version.
   */
  version: SemanticVersion | undefined

  /**
   * Theme config.
   */
  theme: CliTheme
}

/**
 * Display the CLI config version.
 */
export const displayVersionLine = (args: Args) => {
  const { width, version, theme } = args
  if (!version || version === 'unknown') return
  const bar = ' '.repeat(width - version.length - 1)
  console.log(`${bar} ${theme.color.gray(version)}`)
}
