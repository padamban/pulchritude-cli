import { CliSetup, CommandSetup, ProgramSetup } from './cli/cli'
import { delay } from './cli/core/src/utils/delay'

const add: CommandSetup<{ numbers: number[] }, { decimals: number }> = {
  id: 'add',
  title: 'Addition',
  description: 'Add numbers',
  script: props => async () => {
    props.progress?.setSectionCount(3)
    props.progress?.setSectionLabel('Stage 1.')
    await delay(1000)

    props.progress?.nextActiveSection('Stage 2.')
    await delay(1000)

    props.progress?.nextActiveSection('Stage 3.')
    await delay(1000)

    const sum = props.args.numbers
      .reduce((acc, v) => acc + v, 0)
      .toFixed(props.opts.decimals)

    props.log.header('Result')

    props.log.list2(['Sum', sum])
  },
  arguments: [
    {
      id: 'numbers',
      description: 'Numbers to add',
      title: 'Numbers',
      type: 'number',
      required: true,
      variadic: true,
    },
  ],
  options: [
    {
      id: 'decimals',
      title: 'Decimals',
      description: 'Number of decimals to show',
      type: 'number',
    },
  ],
}

const constants: CommandSetup<{ name: 'PI' | 'e' }> = {
  id: 'constants',
  title: 'Constants',
  description: 'Mathematical constant',
  script: props => async () => {
    await delay(1000)

    if (props.args.name === 'PI') {
      props.log.list2(['PI', '3.1415'])
    }
    if (props.args.name === 'e') {
      props.log.list2(['e', '2.7182'])
    }
  },
  arguments: [
    {
      id: 'name',
      description: 'Name of the constant',
      title: 'Name',
      required: true,
      choices: [
        {
          name: 'PI - number',
          value: 'PI',
        },
        {
          name: `e - Euler's number`,
          value: 'e',
        },
      ],
    },
  ],
}

const math: ProgramSetup = {
  id: 'math',
  title: 'Math',
  description: 'Mathematical operation',
  isMultiCommand: true,
  commands: [add, constants],
}

const SETUP: CliSetup = {
  name: 'CLI',
  description: 'Demo CLI config.',
  version: '0.0.0',
  reporterConfig: {
    outputFolderPath: '.cli-report',
    output: ['console', 'json', 'md'],
  },
  programs: [math],
}

export default SETUP
