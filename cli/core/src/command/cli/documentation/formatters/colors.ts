import chalk from 'chalk'

const Color = {
  title: chalk.bgBlue.whiteBright,
  program: chalk.greenBright,
  command: chalk.cyanBright,
  argument: chalk.magentaBright.italic,
  option: chalk.blueBright.italic,
  gray: chalk.gray,
  error: chalk.redBright,
  important: chalk.yellow,
}

export { Color }
