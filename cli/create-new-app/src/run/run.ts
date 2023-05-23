import {
  FILE_BUILDER,
  FILE_MANAGER,
  logErrorToConsole,
  REPORTER,
  RESOLVE_SETUP,
  SemanticVersion,
  SETUP_COMMANDER,
  THEME,
} from '@pulchritude-cli/core'

import packageJson from '../../package.json'
import { displayBanner } from './banner'
import { CONFIG } from './cli.config'

/**
 * Run CLI application.
 */
const RUN = async () => {
  const width = 66

  const theme = THEME(() => ({
    color: {},
  }))

  displayBanner({ width })

  const cwd = process.cwd()

  const setup = RESOLVE_SETUP({
    rawSetup: CONFIG,
    packageVersion: packageJson.version as SemanticVersion,
    theme,
  })

  const reporter = REPORTER({
    cwd,
    rendererConfig: {
      outputFolderPath: '.cli-report',
      output: ['console', 'md', 'json'],
      terminal: {
        frameWidth: width,
      },
      ...CONFIG?.reporterConfig,
    },
  })

  const fileBuilder = FILE_BUILDER({ onError: logErrorToConsole })

  const fileManager = FILE_MANAGER({ cwd })

  await SETUP_COMMANDER(setup)({ reporter, fileBuilder, fileManager, theme })(
    process.argv,
  )
}

export { RUN }
