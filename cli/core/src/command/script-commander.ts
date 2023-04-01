import { Command, Option } from 'commander'

import { CommandContext, CommanderSetup } from './_type_'
import { ACTION_RESOLVER } from './cli/action-resolver'
import { addCmdDocumentationFactory } from './cli/documentation/add-documentation'
import { CommanderDescription } from './cli/documentation/formatters/get-description'
import { VALIDATE_SETUP } from './cli/documentation/validators/validate-setup'
import { CommanderTag } from './cli/utils/get-commander-tag'
import { resolveArgument } from './cli/utils/resolve-argument'
import { resolveOption } from './cli/utils/resolve-option'
import { globalOptions } from './global-options'

export const SCRIPT_COMMANDER =
  (setup: CommanderSetup) =>
  (ctx: CommandContext) =>
  async (argv: string[]) => {
    const commander = new Command()

    VALIDATE_SETUP({ setup })

    const addDocs = addCmdDocumentationFactory({ setup, globalOptions })

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
          const argTag = CommanderTag.getArgumentTag(resolveArgument(arg))

          const argDesc = CommanderDescription.getArgumentDescription(arg)

          programCommandCmd.argument(`${argTag}`, argDesc)
        })

        const options = [...(c.options ?? []), globalOptions.noPrompt]

        options.forEach(opt => {
          const optTag = CommanderTag.getOptionTag(resolveOption(opt))
          const optDesc = CommanderDescription.getOptionDescription(opt)

          const cmdOpt = new Option(optTag, optDesc)

          if (opt.type === 'string-array') {
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
