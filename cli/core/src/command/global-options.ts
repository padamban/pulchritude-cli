import { GlobalOptions } from './_type_'

export const globalOptions: GlobalOptions = {
  help: {
    title: 'Help',
    variableName: 'help',
    type: 'boolean',
    description: `Display help information for the current command.`,
  },
  noPrompt: {
    title: 'No prompt',
    variableName: 'noPrompt',
    type: 'boolean',
    description: 'Disable the prompt.',
  },
}
