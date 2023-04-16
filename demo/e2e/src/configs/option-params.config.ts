import { CliSetup, CommandSetup, ProgramSetup } from '@pulchritude-cli/cli'

const command: CommandSetup<any, { opt1: number[]; opt2: 'A' | 'B' }> = {
  id: 'command',
  title: 'Command',
  description: 'Demo command',
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
  description: 'Command with valid options',
  version: '0.0.0',
  programs: [program],
}

export default SETUP
