import { GlobalOptions } from './_type_'

/**
 * These options are available for all command.
 *
 * They need to be implemented in:
 * - `addGlobalOptionsDoc`
 * - `addCmdDocumentationFactory`
 */
export const GLOBAL_OPTIONS: GlobalOptions = {
  help: {
    id: 'help',
    title: 'Help',
    type: 'boolean',
    name: '--help',
    alias: '-h',
    description: `Display help information for the current command.`,
  },
  noPrompt: {
    id: 'noPrompt',
    name: '--no-prompt',
    alias: '-np',
    title: 'No prompt',
    type: 'boolean',
    description: 'Disable the prompt.',
  },
}
