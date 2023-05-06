import {
  CliSetup,
  FILE_BUILDER,
  FILE_MANAGER,
  LOAD_CONFIG,
  logErrorToConsole,
  REPORTER,
  RESOLVE_SETUP,
  resolveProgramDetails,
  SemanticVersion,
  SETUP_COMMANDER,
  THEME,
} from '@pulchritude-cli/core'

import packageJson from '../../package.json'
import { displayBanner } from '../display/banner'
import { displayVersionLine } from '../display/version-line'
import { TEMPLATES } from '../templates'

/**
 * Run CLI application.
 */
const RUN = async () => {
  const width = 70

  const theme = THEME(t => ({
    color: {
      program: t.color.program.underline.red,
    },
  }))

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
    theme,
  })

  if (config.state === 'missing-config-file') {
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

              const extension = opts.language

              const template = TEMPLATES.find(
                t => t.name === 'basic' && t.extension === extension,
              )

              if (template) {
                props.fileManager.writeFile(
                  `cli.config.${extension}`,
                  template.content,
                )
              } else {
                props.log.errorDetail({
                  issue: `Couldn't find a template file.`,
                  type: 'error',
                  recommendation: 'Specify the template file language.',
                  location: 'Command parameters.',
                })
              }
            },
          },
        ],
      }),
    )
  }

  displayVersionLine({ width, version: setup.version, theme })

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

  await SETUP_COMMANDER(setup)({ reporter, fileBuilder, fileManager, theme })(
    process.argv,
  )
}

export { RUN }
