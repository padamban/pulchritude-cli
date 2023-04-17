import { CliSetup, CommandSetup, ProgramSetup } from '@pulchritude-cli/cli'

const command: CommandSetup<
  { arg1: number; arg2: 'A' | 'B'; arg3: number[] },
  { opt1: number[]; opt2: 'A' | 'B' }
> = {
  id: 'command',
  title: 'Command',
  description: 'Demo command',
  arguments: [
    {
      id: 'arg1',
      description: 'Argument 1',
      type: 'number',
      required: true,
    },
    {
      id: 'arg2',
      description: 'Argument 2',
      required: true,
      choices: [
        { name: 'Arg A', value: 'A' },
        { name: 'Arg B', value: 'B' },
      ],
    },
    {
      id: 'arg3',
      description: 'Argument 3',
      type: 'number',
      variadic: true,
    },
  ],
  options: [
    {
      id: 'opt1',
      description: 'Option 1',
      type: 'number',
      variadic: true,
    },
    {
      id: 'opt2',
      description: 'Option 2',
      choices: [
        { name: 'Opt A', value: 'A' },
        { name: 'Opt B', value: 'B' },
      ],
    },
  ],
  script: () => async () => {},
}

const program: ProgramSetup = {
  id: 'program',
  title: 'Program',
  description: 'Demo program',
  commands: [command],
}

const SETUP: CliSetup = {
  name: 'CLI',
  description: 'Valid parameter',
  version: '0.0.0',
  programs: [program],
}

export default SETUP
