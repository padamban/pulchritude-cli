import chalk from 'chalk'

import { RendererProps } from './_type_'
import { statusRenderer } from './status-renderer'

// eslint-disable-next-line no-console
const log = console.log

export const renderReportToConsole = ({ report, config }: RendererProps) => {
  if (!config.reporter.reports?.includes('console')) {
    log('\n')
    return
  }

  const tab = ' '.repeat(7)

  log(
    `\n${tab}${'░'.repeat(49)}\n${tab}${
      '░'.repeat(20) +
      chalk.bold.black.bgWhiteBright(' REPORT ') +
      '░'.repeat(21)
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
    const status = statusRenderer(s.status)
    const title = s.title.padEnd(Math.max(lengths.title + 10, 33))
    let duration = ((s.timer.duration / 1000).toFixed(3) + 's').padStart(10)
    if (s.timer.duration > 5000) duration = chalk.redBright(duration)
    else if (s.timer.duration > 1500) duration = chalk.yellow(duration)
    log(`\n${tab}${status} ${title} ${duration}`)
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
      }
    })
  })
  log(`\n\n`)

  if (config.reporter.reports.includes('md')) {
    log(`\n${tab}${'░'.repeat(49)}\n`)

    log(`${tab}Report file: ${config.reporter.path?.md}`)
  }

  log(`\n${tab}${'░'.repeat(49)}\n`)
}
