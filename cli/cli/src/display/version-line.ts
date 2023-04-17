/* eslint-disable no-console */

import { Color } from '@pulchritude-cli/core/src/command/cli/colors'

interface Args {
  /**
   * Width of the cli console output.
   */
  width: number

  /**
   * Cli version, coming from  the config.
   */
  version: string
}

export const displayVersionLine = ({ width, version }: Args) => {
  const bar = ' '.repeat(width - version.length - 1)
  console.log(`${bar} ${Color.gray(version)}`)
}
