/* eslint-disable no-console */
import { ErrorInfo } from '../../../../error'
import { logErrorToConsole } from '../../../../error'
import { CliSetupDetails } from '../../../_type_'
import { Color } from '../../colors'
import { validatePrograms } from './validate-programs'

interface Args {
  setup: CliSetupDetails
  width: number | undefined
}

/**
 * Validate CLI setup.
 */
function VALIDATE_SETUP({ setup, width }: Args) {
  const errorInfo: ErrorInfo[] = []

  errorInfo.push(...validatePrograms({ programs: setup.programs }))

  if (errorInfo.length) {
    console.log('\n\n' + Color.subtitle('CLI SETUP ISSUES'))
    errorInfo.map(logErrorToConsole)

    if (errorInfo.some(err => err.type === 'error')) {
      console.log('\n\nExiting due to setup validation errors...\n\n')
      process.exit(1)
    } else if (errorInfo.some(err => err.type === 'warn')) {
      if (width) console.log('\n' + '░'.repeat(width))
    }
  }
}

export { VALIDATE_SETUP }
