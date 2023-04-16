import { CliSetup, CommandSetup, ProgramSetup } from '@pulchritude-cli/cli'

const command: CommandSetup = {
  id: 'command',
  title: 'Command',
  description: 'Demo command',
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
  description: 'Minimal command setup',
  version: '0.0.0',
  programs: [program],
}

export default SETUP
