const command = {
  id: 'command',
  title: 'Command',
  description: 'Demo command',
  script: () => async () => {},
}

const program = {
  id: 'program',
  title: 'Program',
  description: 'Demo program',
  commands: [command],
}

const SETUP = {
  name: 'CLI',
  description: 'Javascript based config',
  version: '0.0.0',
  programs: [program],
}

export default SETUP
