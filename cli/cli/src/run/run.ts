import {
  CliSetup,
  LOAD_CONFIG,
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
    validConfigFilePaths: ['cli.config.ts', 'dev-cli.config.ts'],
  })

  const reporter = REPORTER({
    cwd: config.cwd ?? process.cwd(),
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

  await SETUP_COMMANDER(setup)({ reporter })(process.argv)
}

export { RUN }
