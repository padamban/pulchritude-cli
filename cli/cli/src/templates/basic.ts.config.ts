import { TemplateDetails } from './_type_'

const template = `
import { CliSetup, CommandSetup, ProgramSetup } from '@pulchritude-cli/cli'

const add: CommandSetup<{ numbers: number[] }, { decimals: number }> = {
  id: 'add',
  title: 'Addition',
  description: 'Add numbers',
  script: props => async () => {
    const sum = props.args.numbers
      .reduce((acc, v) => acc + v, 0)
      .toFixed(props.opts.decimals)

      props.log.solutionLine(\`\${sum}\`)
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

const math: ProgramSetup = {
  id: 'math',
  title: 'Math',
  description: 'Mathematical operation',
  commands: [add],
}

const SETUP: CliSetup = {
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
`

export const basicTsTemplate: TemplateDetails = {
  name: 'basic',
  extension: 'ts',
  content: template,
}
