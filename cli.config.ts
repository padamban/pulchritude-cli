import { CliSetup, CommandSetup, ProgramSetup } from './cli/core/src'

const commandA: CommandSetup<
  { argOne: number; argTwo: 'es' | 'en' | number },
  { optA: 'es' | 'en' | number; optB: boolean }
> = {
  id: 'comAa',
  title: 'Command A',
  description: 'Command A desc',
  script: props => async () => {
    console.log('\nHELLO', props)
  },
  arguments: [
    {
      id: 'argOne',
      description: 'Argument One',
      title: 'Argument One 1',
      type: 'number',
      required: true,
    },
    {
      id: 'argTwo',
      name: 'arg-two',
      description: 'Argument Two',
      title: 'Argument Two 2',
      required: true,
      variadic: true,
      choices: [
        { name: 'Spanish', value: 'es' },
        { name: 'English', value: 'en' },
        { name: 'Num', value: 323 },
      ],
    },
  ],
  options: [
    {
      id: 'optA',
      title: 'Option A',
      description: 'Option A',
      variadic: true,
      choices: [
        { name: 'Spanish', value: 'es' },
        { name: 'English', value: 'en' },
        { name: 'Num', value: 324 },
      ],
    },
    {
      id: 'optB',
      title: 'Option B',
      description: 'Option B',
      type: 'boolean',
    },
  ],
}

const programA: ProgramSetup = {
  id: 'progAa',
  title: 'Program AA',
  description: 'AA program',
  commands: [commandA],
}

const SETUP: CliSetup = {
  name: 'CLI',
  description: 'Allows to declare scripts and run them sequentially.',
  version: '0.0.2',
  reporterConfig: {
    outputFolderPath: '.cli-report',
    output: ['console', 'json', 'md'],
  },
  programs: [programA],
}

export default SETUP
