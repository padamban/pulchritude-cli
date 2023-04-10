import { CliSetup, CommandSetup, ProgramSetup } from './cli/core/src'

const commandA: CommandSetup<
  { argOne: number; argTwo: 'es' | 'en' | number },
  { optA: 'es' | 'en' | number; optB: boolean }
> = {
  id: 'comAa',
  title: 'Command A',
  description: 'Command A desc',
  script:
    ({ args, opts }) =>
    async () => {
      // console.log('\nHELLO comAa', { args, opts })
    },
  arguments: [
    {
      id: 'argOne',
      description: 'Argument One',
      title: 'Argument One 1',
      type: 'number',
      // variadic: true,
      required: true,
    },
    {
      id: 'argTwo',
      name: 'arg-two',
      description: 'Argument Two',
      title: 'Argument Two 2',
      // type: 'string',
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
  programs: [
    programA,
    //  { id: 'programB', commands: [] }
  ],
}

export default SETUP
