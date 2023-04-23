/* eslint-disable no-console */

import { SemanticVersion } from '@pulchritude-cli/core/src/command/_type_'
import { Color } from '@pulchritude-cli/core/src/command/cli/colors'

interface Args {
  /**
   * Width of the cli console output.
   */
  width: number

  /**
   * Cli config version.
   */
  version: SemanticVersion | undefined
}

export const displayVersionLine = ({ width, version }: Args) => {
  if (!version || version === 'unknown') return
  const bar = ' '.repeat(width - version.length - 1)
  console.log(`${bar} ${Color.gray(version)}`)
}
