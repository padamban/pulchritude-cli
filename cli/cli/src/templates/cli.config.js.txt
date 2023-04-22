export const delay = (ms = 500) =>
  new Promise(resolve => {
    setTimeout(() => resolve(), ms)
  })

const add = {
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

const math = {
  id: 'math',
  title: 'Math',
  description: 'Mathematical operation',
  isMultiCommand: true,
  commands: [add],
}

const SETUP = {
  name: 'CLI',
  description: 'Demo CLI config. (ts config)',
  version: '0.0.0',
  reporterConfig: {
    outputFolderPath: '.cli-report',
    output: ['console', 'json', 'md'],
  },
  programs: [math],
}

export default SETUP
