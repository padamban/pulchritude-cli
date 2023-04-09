import { Command, Option } from 'commander'

import { CommandContext, CommanderSetup } from './_type_'
import { ACTION_RESOLVER } from './cli/ACTION_RESOLVER'
import { addCmdDocumentationFactory } from './cli/documentation/add-documentation'
import { CommanderDescription } from './cli/documentation/sections/utils/get-description'
import { VALIDATE_SETUP } from './cli/documentation/validators/validate-setup'
import { CommanderTag } from './cli/utils/get-commander-tag'
import { GLOBAL_OPTIONS } from './global-options'

/**
 * Setup the commander.js:
 * - configure programs, commands, parameters
 * - terminal help/documentation
 * - adds action resolver to the commands
 *   - receives the terminal arguments
 *   - creates input prompts if needed
 *   - runs the target scripts
 *   - creates terminal documentation
 */
export const SETUP_COMMANDER =
  (setup: CommanderSetup) =>
  (ctx: CommandContext) =>
  async (argv: string[]) => {
    const commander = new Command()

    VALIDATE_SETUP({ setup })

    const addDocs = addCmdDocumentationFactory({
      setup,
      globalOptions: GLOBAL_OPTIONS,
    })

    commander
      .name(setup.name)
      .description(setup.description)
      .version(setup.version)

    const commands: Command[] = [commander]

    setup.programs.forEach(p => {
      const programCmd = commander
        .command(p.name)
        .alias(p.alias)
        .description(p.description)

      commands.push(programCmd)

      p.commands.forEach(c => {
        const programCommandCmd = programCmd
          .command(c.name)
          .alias(c.alias)
          .description(c.description)

        commands.push(programCommandCmd)

        c.arguments?.forEach(arg => {
          const argTag = CommanderTag.getArgumentTag(arg)

          const argDesc = CommanderDescription.getArgumentDescription(arg)

          programCommandCmd.argument(`${argTag}`, argDesc)
        })

        const options = [...(c.options ?? []), GLOBAL_OPTIONS.noPrompt]

        options.forEach(opt => {
          const optTag = CommanderTag.getOptionTag(opt)
          const optDesc = CommanderDescription.getOptionDescription(opt)

          const cmdOpt = new Option(optTag, optDesc)

          if (opt.variadic) {
            cmdOpt.argParser(value => value.split(','))
          }

          programCommandCmd.addOption(cmdOpt)
        })
      })
    })

    commands.forEach(async c => {
      ACTION_RESOLVER({ cmd: c, setup, ctx })
      addDocs(c)
    })

    commander.parse(argv)
  }
