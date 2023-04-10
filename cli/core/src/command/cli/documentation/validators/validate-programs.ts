import { ErrorInfo } from '../../../../error'
import { ProgramDetails } from '../../../_type_'
import { validateArgument } from './validate-argument'
import { validateOption } from './validate-options'

interface Args {
  programs: ProgramDetails[]
}

function validatePrograms(args: Args): ErrorInfo[] {
  const { programs } = args

  const errorInfo: ErrorInfo[] = []

  if (programs.length === 0) {
    errorInfo.push({
      issue: 'The CLI has no programs.',
      type: 'warn',
      location: 'CLI config',
      recommendation:
        'Add a program config object to the programs array of the CLI config.',
    })
  }

  programs.forEach(program => {
    if (program.commands.length === 0) {
      errorInfo.push({
        issue: `The CLI program (${program.title}) has no commands.`,
        type: 'warn',
        location: program.id,
        recommendation: 'Add a command config object to the commands array.',
      })
    }

    program.commands.forEach(c => {
      errorInfo.push(
        ...validateArgument({
          arguments: c.arguments,
          parentChain: [program.id, c.id],
        }),
      )

      errorInfo.push(
        ...validateOption({
          options: c.options,
          parentChain: [program.id, c.id],
        }),
      )
    })
  })

  return errorInfo
}

export { validatePrograms }
