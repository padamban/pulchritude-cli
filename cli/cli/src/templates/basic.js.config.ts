import { TemplateDetails } from './_type_'

const template = `
const add = {
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

const math = {
  id: 'math',
  title: 'Math',
  description: 'Mathematical operation',
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
`
/**
 * JS template details.
 */
export const basicJsTemplate: TemplateDetails = {
  name: 'basic',
  extension: 'js',
  content: template,
}
