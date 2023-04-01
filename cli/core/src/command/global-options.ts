import { GlobalOptions } from './_type_'

export const globalOptions: GlobalOptions = {
  help: {
    id: 'help',
    title: 'Help',
    type: 'boolean',
    description: `Display help information for the current command.`,
  },
  noPrompt: {
    id: 'noPrompt',
    title: 'No prompt',
    type: 'boolean',
    description: 'Disable the prompt.',
  },
}
