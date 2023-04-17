/* eslint-disable no-console */
import chalk from 'chalk'

import { logErrorToConsole } from '../../error/log-error-to-console'
import { Obj } from '../../utils'
import { asArray } from '../../utils/as-array'
import {
  CliSetupDetails,
  CommandDetails,
  CommandsToRun,
  ProgramDetails,
} from '../_type_'
import { Color } from '../cli/colors'
import { getArgumentsPrompt } from './get-arguments.prompt'
import { getCommandPrompt } from './get-command.prompt'
import { getOptionsPrompt } from './get-options.prompt'
import { getProgramPrompt } from './get-program.prompt'
import { fixParameterValues } from './utils/fix-parameter-values'
import { hasParameters } from './utils/has-parameters'
import { isWatchMode } from './utils/is-watch-mode'

interface Args {
  setup: CliSetupDetails
  program: ProgramDetails | undefined
  command: CommandDetails | undefined
  argumentValues: Obj
  optionValues: Obj
}

interface Retval {
  program: ProgramDetails | undefined
  commandsToRun: CommandsToRun
  watch: boolean
}

/**
 * Show prompt inputs.
 * - Receives the the command and parameters given in the terminal.
 * - Triggers prompt inputs if needed.
 * - Validates some of the inputs.
 * - Packages the commands to run with its parameters.
 * - Decides whether is in watch mode.
 */
async function PROMPT(args: Args): Promise<Retval> {
  // eslint-disable-next-line no-console

  const noPrompt = args.optionValues.prompt === false

  if (!noPrompt) console.log('\n')

  const program = await getProgramPrompt({
    selectedProgram: args.program,
    programs: args.setup.programs ?? [],
    noPrompt,
  })

  const commands = await getCommandPrompt({
    selectedCommands: asArray(args.command),
    program,
    noPrompt,
  })

  const commandsToRun: CommandsToRun = new Map()

  for (const command of commands) {
    let argumentResponse: Obj = {}
    let optionResponse: Obj = {}

    if (noPrompt) {
      argumentResponse = args.argumentValues
      optionResponse = args.optionValues
    } else if (hasParameters({ command })) {
      console.log(chalk.bold(`\n${Color.command(command.title)} parameters`))

      argumentResponse = await getArgumentsPrompt({
        values: args.argumentValues,
        command,
      })

      optionResponse = await getOptionsPrompt({
        values: args.optionValues,
        command,
      })

      console.log('')
    } else {
      console.log('')
    }

    fixParameterValues({
      command,
      argumentValues: argumentResponse,
      optionValues: optionResponse,
    })

    commandsToRun.set(command.id, {
      command,
      argumentResponse,
      optionResponse,
      watchMode: isWatchMode({ command, options: optionResponse }),
    })
  }

  let watch = false

  Array.from(commandsToRun).forEach(
    ([commandId, { watchMode }], index, arr) => {
      const isLast = arr.length - 1 === index

      if (watchMode && !isLast) {
        logErrorToConsole({
          issue: 'Only the last command can be in watch mode!',
          type: 'error',
          location: 'Config / Command selection by the user',
          recommendation:
            'If you select multiple commands only the last one can be in watch mode.',
          payload: {
            commandId,
            isLast,
            numberOfCommands: arr.length,
            commandIndex: index,
          },
        })
        process.exit()
      } else if (watchMode && isLast) {
        watch = true
      }
    },
  )

  return {
    program,
    commandsToRun,
    watch,
  }
}

export { PROMPT }
