import chalk from 'chalk'

import { CliColor } from './_type_'

/**
 * Console colors and font weights.
 */
const DEFAULT_COLORS: CliColor = {
  title: chalk.bold.underline.bgBlue.whiteBright,
  subtitle: chalk.bold.underline,
  program: chalk.greenBright.bold,
  command: chalk.cyanBright.bold,
  argument: chalk.magentaBright.italic.bold,
  option: chalk.blueBright.italic.bold,
  gray: chalk.gray,
  success: chalk.green.italic,
  error: chalk.redBright,
  warning: chalk.yellow,
  important: chalk.yellow,
} as const

export { DEFAULT_COLORS }
