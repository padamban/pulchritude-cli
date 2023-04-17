import { CliSetup, ProgramSetup } from '@pulchritude-cli/cli'

const program: ProgramSetup = {
  id: 'program',
  title: 'Program',
  description: 'Demo program',
  isMultiCommand: true,
  commands: [],
}

const SETUP: CliSetup = {
  name: 'CLI',
  description: 'Program without a command',
  version: '0.0.0',
  programs: [program],
}

export default SETUP
