import {
  CommanderSetup,
  // loadConfig,
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
            title: 'Command A',
            name: 'com-aa',
            alias: 'ca',
            description: 'Command A',
            script: props => async () => {
              console.log('HELLO comAa', { props })
            },
            arguments: [],
            options: [
              {
                title: 'Option A',
                name: '--opt-a',
                alias: '-oa',
                variableName: 'optA',
                description: 'Option A',
                type: 'boolean',
              },
              {
                title: 'Option B',
                name: '--opt-b',
                alias: '-ob',
                variableName: 'optB',
                description: 'Option B',
                type: 'string-array',
                showUsageExample: true,
                choices: [
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
            title: 'Command A',
            name: 'com-aa',
            alias: 'ca',
            description: 'Command A',
            script: props => async () => {
              console.log('HELLO pb comAa', { props })
            },
            arguments: [],
            options: [
              {
                title: 'Option A',
                name: '--opt-a',
                alias: '-oa',
                variableName: 'optA',
                description: 'Option A',
                type: 'string-array',
                choices: [
                  { name: 'Spanish', value: 'es' },
                  { name: 'English', value: 'en' },
                ],
              },
            ],
          },
          {
            variableName: 'comBb',
            name: 'com-bb',
            title: 'Command B',
            alias: 'cb',
            description: 'Command B',
            script: props => async () => {
              console.log('HELLO comBb', { props })
            },
            arguments: [
              {
                name: 'arg-one',
                variableName: 'argOne',
                description: 'Argument One',
                title: 'Argument One',
                type: 'number',
                required: true,
              },
              {
                name: 'arg-two',
                variableName: 'argTwo',
                description: 'Argument Two',
                title: 'Argument Two',
                type: 'string',
                required: true,
                // variadic: true,
                choices: [
                  { name: 'Spanish', value: 'es' },
                  { name: 'English', value: 'en' },
                ],
              },
            ],
            options: [
              {
                title: 'Option A',
                name: '--opt-a',
                alias: '-oa',
                variableName: 'optA',
                description: 'Option A',
                type: 'string-array',
                showUsageExample: true,
                choices: [
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
            title: 'Command A',
            name: 'com-aa',
            alias: 'ca',
            description: 'Command A',
            script: props => async () => {
              console.log('HELLO com-aa', { props })
            },
            arguments: [
              {
                name: 'arg-one',
                variableName: 'argOne',
                description: 'Argument One',
                title: 'Argument One',
                type: 'number',
                // variadic: true,
                required: true,
              },
              {
                name: 'arg-two',
                variableName: 'argTwo',
                description: 'Argument Two',
                title: 'Argument Two',
                type: 'string',
                // required: true,
                // variadic: true,
                choices: [
                  { name: 'Spanish', value: 'es' },
                  { name: 'English', value: 'en' },
                ],
              },
              {
                name: 'arg-three',
                variableName: 'argThree',
                description: 'Argument Three',
                title: 'Argument Three',
                variadic: true,
                // required: true,
                type: 'string',
              },
            ],
            options: [
              {
                title: 'Option A',
                name: '--opt-a',
                alias: '-oa',
                variableName: 'optA',
                description: 'Option A',
                type: 'string-array',
                showUsageExample: true,
                choices: [
                  { name: 'Spanish', value: 'es' },
                  { name: 'English', value: 'en' },
                ],
              },
              {
                title: 'Option B',
                name: '--opt-b',
                alias: '-ob',
                variableName: 'optB',
                description: 'Option B',
                type: 'boolean',
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

  // const config = await loadConfig({
  //   defaultConfig: {},
  //   validConfigFilePaths: ['cli.config.ts', 'dev-cli.config.ts'],
  // })

  await SCRIPT_COMMANDER(setup)({ reporter })(process.argv)

  setTimeout(() => {
    // process.exit()
  })
}

export { RUN }
