import { Command, Option } from 'commander'

import { CliSetupDetails, CommandContext } from './_type_'
import { ACTION_RESOLVER } from './cli/ACTION_RESOLVER'
import { addCmdDocumentationFactory } from './cli/documentation/add-documentation'
import { CommanderDescription } from './cli/documentation/sections/utils'
import { VALIDATE_SETUP } from './cli/documentation/validators/VALIDATE_SETUP'
import { CommanderTag } from './cli/utils'
import { GLOBAL_OPTIONS } from './global-options'

/**
 * Setup the commander.js:
 * - configure programs, commands, parameters
 * - terminal help/documentation
 * - adds action resolver to the commands
 * - receives the terminal arguments
 * - creates input prompts if needed
 * - runs the target scripts
 * - creates terminal documentation.
 * @example
 * await SETUP_COMMANDER(setup)({ reporter })(process.argv)
 */
export const SETUP_COMMANDER =
  (setup: CliSetupDetails) =>
  (ctx: CommandContext) =>
  async (argv: string[]) => {
    const commander = new Command()

    const { color } = ctx.theme

    VALIDATE_SETUP({
      setup,
      width: ctx.reporter.args?.rendererConfig.terminal.frameWidth,
      theme: ctx.theme,
    })

    const addDocs = addCmdDocumentationFactory({
      setup,
      globalOptions: GLOBAL_OPTIONS,
    })

    commander
      .name(setup.name)
      .description(setup.description)
      .version(
        `\n\nCLI package version: ${color.important(
          setup.packageVersion?.padStart(15),
        )}\nCLI config version:  ${color.important(
          setup.version.padStart(15),
        )}\n`,
        '-v,   --version',
        'Version of the CLI tool.',
      )

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

          const argDesc = CommanderDescription.getArgumentDescription(arg, {
            theme: setup.theme,
          })

          programCommandCmd.argument(`${argTag}`, argDesc)
        })

        const options = [...(c.options ?? []), GLOBAL_OPTIONS.noPrompt]

        options.forEach(opt => {
          const optTag = CommanderTag.getOptionTag(opt)
          const optDesc = CommanderDescription.getOptionDescription(opt, {
            theme: setup.theme,
          })

          const cmdOpt = new Option(optTag, optDesc)

          if (opt.variadic) {
            cmdOpt.argParser(value => value?.split(','))
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
