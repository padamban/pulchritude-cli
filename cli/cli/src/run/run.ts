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
        id: 'prog-aa',
        title: 'Program AA',
        name: 'prog-aa',
        alias: 'pa',
        description: 'AA program',
        commands: [
          {
            id: 'comAa',
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
                id: 'optA',
                title: 'Option A',
                name: '--opt-a',
                alias: '-oa',
                description: 'Option A',
                type: 'boolean',
              },
              {
                id: 'optB',
                title: 'Option B',
                name: '--opt-b',
                alias: '-ob',
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
        id: 'progBb',
        title: 'Program BB',
        name: 'program-bb',
        alias: 'pb',
        description: 'BB program',
        commands: [
          {
            id: 'comAa',
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
                id: 'optA',
                title: 'Option A',
                name: '--opt-a',
                alias: '-oa',
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
            id: 'comBb',
            name: 'com-bb',
            title: 'Command B',
            alias: 'cb',
            description: 'Command B',
            script: props => async () => {
              console.log('HELLO comBb', { props })
            },
            arguments: [
              {
                id: 'argOne',
                name: 'arg-one',
                description: 'Argument One',
                title: 'Argument One',
                type: 'number',
                required: true,
              },
              {
                id: 'argTwo',
                name: 'arg-two',
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
                id: 'optA',
                title: 'Option A',
                name: '--opt-a',
                alias: '-oa',
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
        id: 'someProgram',
        title: 'Some Program',
        name: 'some-program',
        alias: 'sp',
        description: 'BB program',
        commands: [
          {
            id: 'comAa',
            title: 'Command A',
            name: 'com-aa',
            alias: 'ca',
            description: 'Command A',
            script: props => async () => {
              console.log('HELLO com-aa', { props })
            },
            arguments: [
              {
                id: 'argOne',
                name: 'arg-one',
                description: 'Argument One',
                title: 'Argument One',
                type: 'number',
                // variadic: true,
                required: true,
              },
              {
                id: 'argTwo',
                name: 'arg-two',
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
                id: 'argThree',
                name: 'arg-three',
                description: 'Argument Three',
                title: 'Argument Three',
                variadic: true,
                // required: true,
                type: 'string',
              },
            ],
            options: [
              {
                id: 'optA',
                title: 'Option A',
                name: '--opt-a',
                alias: '-oa',
                description: 'Option A',
                type: 'string-array',
                showUsageExample: true,
                choices: [
                  { name: 'Spanish', value: 'es' },
                  { name: 'English', value: 'en' },
                ],
              },
              {
                id: 'optB',
                title: 'Option B',
                name: '--opt-b',
                alias: '-ob',
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
