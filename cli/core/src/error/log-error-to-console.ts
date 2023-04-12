import chalk from 'chalk'
import { EOL } from 'os'

import { LogError } from './_type_'

/**
 * Log error info to terminal console.
 */
const logErrorToConsole: LogError = info => {
  const { issue, type, recommendation, location, error, payload } = info

  const lines = []

  let mainColor = chalk.redBright

  if (type === 'warn') {
    mainColor = chalk.yellow
  }

  lines.push([`${mainColor(type.toUpperCase())} - ${mainColor(issue)}`])

  if (location?.length) {
    lines.push([`It happened at: ${chalk.white(location)}`])
  }

  if (recommendation?.length) {
    let rec = ''

    if (Array.isArray(recommendation) && recommendation.length === 1) {
      rec = recommendation[0] ?? ''
    } else if (Array.isArray(recommendation)) {
      const indent = '\n' + ' '.repeat(6)
      rec = indent + recommendation.join(indent)
    } else {
      rec = recommendation
    }

    lines.push([`Recommendation: ${chalk.greenBright(rec)}`])
  }

  if (error?.length) {
    lines.push([`Error details: ${mainColor(error)}`])
  }

  if (typeof payload === 'object') {
    const info = JSON.stringify(payload, null, 2)
      .split(EOL)
      .map(line => ' '.repeat(6) + line)
      .join(EOL)

    lines.push([`Additional information: \n${info}`])
  } else if (typeof payload === 'string' && payload?.length) {
    lines.push([`Additional information: ${payload}`])
  }

  // eslint-disable-next-line no-console
  console.log(chalk.gray('\n' + lines.join('\n > ') + '\n'))
}

export { logErrorToConsole }
