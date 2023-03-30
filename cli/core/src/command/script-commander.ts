import { Command, Option } from 'commander'

import { CommandContext, CommanderSetup } from './_type_'
import { globalOptions } from './global-options'
import { ACTION_RESOLVER } from './setup/action-resolver'
import { addCmdDocumentationFactory } from './setup/documentation/add-documentation'
import { CommanderDescription } from './setup/documentation/formatters/get-description'
import { VALIDATE_SETUP } from './setup/documentation/validators/validate-setup'
import { CommanderTag } from './setup/utils/get-commander-tag'
import { resolveArgument } from './setup/utils/resolve-argument'
import { resolveOption } from './setup/utils/resolve-option'

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
