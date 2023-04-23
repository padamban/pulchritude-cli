import chalk from 'chalk'

import { Report } from '../_type_'
import { renderStatus } from './render-status'

// eslint-disable-next-line no-console
const log = console.log

type Args = {
  /**
   * Report object.
   */
  report: Report

  /**
   * Width of the logged report frame.
   */
  width: number | undefined
}

/**
 * Display a summarized version of the report object, inside the terminal.
 */
export const renderReportToConsole = ({ report, width = 50 }: Args) => {
  const tab = ' '.repeat(0)

  const bar = '░'.repeat(width)

  const title = ' REPORT '

  const surplus = width - title.length

  log(
    `\n${tab}${bar}\n${tab}${
      '░'.repeat(Math.floor(surplus / 2)) +
      chalk.bold.black.bgWhiteBright(title) +
      '░'.repeat(Math.ceil(surplus / 2))
    }\n`,
  )

  const lengths = report.sections.reduce(
    (acc, s) => {
      if (s.title.length > acc.title) acc.title = s.title.length
      return acc
    },
    { title: 0 },
  )

  report.sections.forEach(s => {
    const status = renderStatus(s.status)
    const title = s.title.padEnd(Math.max(lengths.title + 10, 33))
    let duration = ((s.timer.duration / 1000).toFixed(3) + 's').padStart(10)
    if (s.timer.duration > 5000) duration = chalk.redBright(duration)
    else if (s.timer.duration > 1500) duration = chalk.yellow(duration)
    log(`\n${tab} ${status} ${title.padEnd(width - 15)} ${duration}`)
    s.content.forEach(c => {
      switch (c.type) {
        case 'header':
          switch (c.status) {
            case 'ERROR':
              log(`${tab}   - ${chalk.red(c.text)}`)
              break
            case 'WARNING':
              log(`${tab}   - ${chalk.yellow(c.text)}`)
              break
          }
          break
        case 'line':
          switch (c.status) {
            case 'ERROR':
              log(`${tab}     - ${chalk.red(c.text)}`)
              break
            case 'WARNING':
              log(`${tab}     - ${chalk.yellow(c.text)}`)
              break
          }
          break

        case 'solution-line':
          log(`${tab}     - Solution: ${chalk.green(c.text)}`)
          break
        case 'error-detail':
          switch (c.info.type) {
            case 'error':
              log(`${tab}     - ${chalk.red(c.info.issue)}`)
              if (c.info.recommendation)
                log(`${tab}     - ${chalk.green(c.info.recommendation)}`)
              break
            case 'warn':
              log(`${tab}     - ${chalk.yellow(c.info.issue)}`)
              if (c.info.recommendation)
                log(`${tab}     - ${chalk.green(c.info.recommendation)}`)
              break
          }
          break
      }
    })
  })
  log(`\n\n`)

  const links = Object.entries(report.detail.outputFileLinks)

  if (links.length) {
    log(`\n ${chalk.underline.gray('Report files')}`)
    links.forEach(([label, link]) => {
      log(chalk.gray(`   ${label.padEnd(7)}  ./${link}`))
    })
  }

  const cmds = report.detail.terminalCommands

  if (cmds.length) {
    log(`\n ${chalk.underline.gray('Rerun terminal commands')}`)
    cmds.forEach(cmd => {
      log(chalk.gray(`   ${cmd}`))
    })
  }

  log(`\n${tab}${bar}\n`)
}
