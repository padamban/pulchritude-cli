import chalk from 'chalk'

const Color = {
  title: (str: string) =>
    chalk.bold.underline.bgBlue.whiteBright(str.padEnd(70)),
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
}

export { Color }
