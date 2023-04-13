import {
  CliSetup,
  FILE_BUILDER,
  FILE_MANAGER,
  LOAD_CONFIG,
  logErrorToConsole,
  REPORTER,
  RESOLVE_SETUP,
  SETUP_COMMANDER,
} from '@pulchritude-cli/core'

import { displayBanner } from '../display/banner'

/**
 * Run CLI application.
 */
const RUN = async () => {
  const width = 70

  displayBanner({ width })

  const config = await LOAD_CONFIG<CliSetup>({
    defaultConfig: {},
    validConfigFilePaths: [
      'cli.config.js',
      'cli.config.ts',
      'dev-cli.config.ts',
    ],
  })

  const cwd = config.cwd ?? process.cwd()

  const reporter = REPORTER({
    cwd,
    rendererConfig: {
      outputFolderPath: '.cli-report',
      output: ['console', 'json', 'md'],
      terminal: {
        frameWidth: width,
      },
      ...config.value.reporterConfig,
    },
  })

  const setup = RESOLVE_SETUP(config.value)

  const fileBuilder = FILE_BUILDER({ onError: logErrorToConsole })

  const fileManager = FILE_MANAGER({ cwd })

  await SETUP_COMMANDER(setup)({ reporter, fileBuilder, fileManager })(
    process.argv,
  )
}

export { RUN }
