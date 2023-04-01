import { ErrorInfo } from '../../../../error'
import { logErrorToConsole } from '../../../../error/log-error-to-console'
import { CommanderSetup } from '../../../_type_'
import { validateArgumentConfig } from './validate-argument-config'

interface Args {
  setup: CommanderSetup
}
function VALIDATE_SETUP({ setup }: Args) {
  const errorInfo: ErrorInfo[] = []

  setup.programs.forEach(p => {
    p.commands.forEach(c => {
      const result = validateArgumentConfig({
        arguments: c.arguments,
        parentChain: [p.variableName, c.variableName],
      })
      errorInfo.push(...result.errorInfo)
    })
  })

  if (errorInfo.length) {
    errorInfo.map(logErrorToConsole)
    process.exit(1)
  }
}

export { VALIDATE_SETUP }
