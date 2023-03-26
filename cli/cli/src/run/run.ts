import {
  CommanderSetup,
  loadConfig,
  REPORTER,
  SCRIPT_COMMANDER,
} from '@pulchritude-cli/core'

import { displayBanner } from '../display/banner'

const RUN = async () => {
  const setup: CommanderSetup = {
    name: 'CLI',
    description: 'Allows to declare scripts and run them sequentially.',
    version: '0.0.2',
    programs: [
      {
        variableName: 'prog-aa',
        title: 'Program AA',
        name: 'prog-aa',
        alias: 'pa',
        description: 'AA program',
        commands: [
          {
            variableName: 'comAa',
            name: 'com-aa',
            alias: 'ca',
            description: 'Command A',
            arguments: [],
            options: [
              {
                name: '--opt-a',
                alias: '-oa',
                variableName: 'optA',
                description: 'Option A',
                type: 'boolean',
              },
              {
                name: '--opt-b',
                alias: '-ob',
                variableName: 'optB',
                description: 'Option B',
                type: 'string-array',
                showUsageExample: true,
                values: [
                  { name: 'Spanish', value: 'es' },
                  { name: 'English', value: 'en' },
                ],
              },
            ],
          },
        ],
      },
      {
        variableName: 'progBb',
        title: 'Program BB',
        name: 'program-bb',
        alias: 'pb',
        description: 'BB program',
        commands: [
          {
            variableName: 'comAa',
            name: 'com-aa',
            alias: 'ca',
            description: 'Command A',
            arguments: [],
            options: [
              {
                name: '--opt-a',
                alias: '-oa',
                variableName: 'optA',
                description: 'Option A',
                type: 'string-array',
                values: [
                  { name: 'Spanish', value: 'es' },
                  { name: 'English', value: 'en' },
                ],
              },
            ],
          },
          {
            variableName: 'comBb',
            name: 'com-bb',
            alias: 'cb',
            description: 'Command B',
            arguments: [],
            options: [
              {
                name: '--opt-a',
                alias: '-oa',
                variableName: 'optA',
                description: 'Option A',
                type: 'string-array',
                showUsageExample: true,
                values: [
                  { name: 'Spanish', value: 'es' },
                  { name: 'English', value: 'en' },
                ],
              },
            ],
          },
        ],
      },
      {
        variableName: 'someProgram',
        title: 'Some Program',
        name: 'some-program',
        alias: 'sp',
        description: 'BB program',
        commands: [
          {
            variableName: 'comAa',
            name: 'com-aa',
            alias: 'ca',
            description: 'Command A',
            arguments: [
              {
                name: 'arg-one',
                variableName: 'argOne',
                description: 'Argument One',
                type: 'string',
                required: true,
              },
              {
                name: 'arg-two',
                variableName: 'argTwo',
                description: 'Argument Two',
                type: 'string',
              },
              {
                name: 'arg-three',
                variableName: 'argThree',
                description: 'Argument Three',
                variadic: true,
                required: true,
                type: 'string',
              },
            ],
            options: [
              {
                name: '--opt-a',
                alias: '-oa',
                variableName: 'optA',
                description: 'Option A',
                type: 'string-array',
                showUsageExample: true,
                values: [
                  { name: 'Spanish', value: 'es' },
                  { name: 'English', value: 'en' },
                ],
              },
              {
                name: '--opt-b',
                alias: '-ob',
                variableName: 'optB',
                description: 'Option B',
                type: 'string',
              },
            ],
          },
        ],
      },
    ],
  }

  displayBanner()

  const reporter = REPORTER({
    progressBarArgs: {
      barSize: 49,
    },
  })

  const config = await loadConfig({
    defaultConfig: {},
    validConfigFilePaths: ['cli.config.ts', 'dev-cli.config.ts'],
  })

  await SCRIPT_COMMANDER(setup)({ reporter })(process.argv)

  setTimeout(() => {
    // process.exit()
  })
}

export { RUN }
