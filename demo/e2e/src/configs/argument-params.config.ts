import { CliSetup, CommandSetup, ProgramSetup } from '@pulchritude-cli/cli'

const command: CommandSetup<{ arg1: number; arg2: 'A' | 'B'; arg3: number[] }> =
  {
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
  description: 'Command with valid arguments',
  version: '0.0.0',
  programs: [program],
}

export default SETUP
