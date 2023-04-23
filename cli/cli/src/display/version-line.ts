/* eslint-disable no-console */

import { Color } from '@pulchritude-cli/core'
import { SemanticVersion } from '@pulchritude-cli/core'

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
