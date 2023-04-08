import chalk from 'chalk'

import { LogError } from './_type_'

const logErrorToConsole: LogError = info => {
  const { issue, type, recommendation, location, error, payload } = info

  const lines = []

  let mainColor = chalk.redBright

  if (type === 'warn') {
    mainColor = chalk.yellow
  }

  lines.push([`${mainColor(type.toUpperCase())} - ${mainColor(issue)}`])

  if (location?.length) {
    lines.push([`It happened at: ${chalk.yellow(location)}`])
  }

  if (recommendation?.length) {
    lines.push([`Recommendation: ${chalk.greenBright(recommendation)}`])
  }

  if (error?.length) {
    lines.push([`Error details: ${mainColor(error)}`])
  }
  if (payload?.length) {
    lines.push([`Additional information: ${payload}`])
  }

  // eslint-disable-next-line no-console
  console.log('\n' + lines.join('\n > ') + '\n')
}

export { logErrorToConsole }