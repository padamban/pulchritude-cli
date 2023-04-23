import {
  CliSetup,
  FILE_BUILDER,
  FILE_MANAGER,
  LOAD_CONFIG,
  logErrorToConsole,
  REPORTER,
  RESOLVE_SETUP,
  resolveProgramDetails,
  SETUP_COMMANDER,
} from '@pulchritude-cli/core'
import { SemanticVersion } from '@pulchritude-cli/core/src/command/_type_'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

import packageJson from '../../package.json'
import { displayBanner } from '../display/banner'
import { displayVersionLine } from '../display/version-line'

/**
 * Run CLI application.
 */
const RUN = async () => {
  const width = 70

  displayBanner({ width })

  const config = await LOAD_CONFIG<CliSetup>({
    validConfigFilePaths: [
      'cli.config.js',
      'cli.config.ts',
      'dev-cli.config.ts',
    ],
  })

  const cwd = config.cwd ?? process.cwd()

  const setup = RESOLVE_SETUP({
    rawSetup: config.value,
    packageVersion: packageJson.version as SemanticVersion,
  })

  setup.programs.unshift(
    resolveProgramDetails({
      id: 'config',
      title: 'Config',
      description: 'Built-in CLI config utilities.',
      commands: [
        {
          id: 'createConfigFile',
          title: 'Create config file',
          description: 'Generate a config file into your directory',
          options: [
            {
              id: 'language',
              title: 'Language',
              description: 'Language of the config file.',
              choices: [
                {
                  value: 'ts',
                  name: 'Typescript',
                },
                {
                  value: 'js',
                  name: 'Javascript',
                },
              ],
            },
          ],
          script: props => async () => {
            const opts: { language: string } = props.opts

            const __filename = fileURLToPath(import.meta.url)
            const __dirname = path.dirname(__filename)

            const extension = opts.language

            const configFile = `cli.config.${extension}`

            const templatePath = path.join(
              __dirname,
              '../templates',
              `${configFile}.txt`,
            )

            if (fs.existsSync(templatePath)) {
              const content = fs.readFileSync(templatePath, {
                encoding: 'utf8',
              })

              props.fileManager.writeFile(configFile, content)
            }
          },
        },
      ],
    }),
  )

  displayVersionLine({ width, version: setup.version })

  const reporter = REPORTER({
    cwd,
    rendererConfig: {
      outputFolderPath: '.cli-report',
      output: ['console', 'json', 'md'],
      terminal: {
        frameWidth: width,
      },
      ...config.value?.reporterConfig,
    },
  })

  const fileBuilder = FILE_BUILDER({ onError: logErrorToConsole })

  const fileManager = FILE_MANAGER({ cwd })

  await SETUP_COMMANDER(setup)({ reporter, fileBuilder, fileManager })(
    process.argv,
  )
}

export { RUN }
