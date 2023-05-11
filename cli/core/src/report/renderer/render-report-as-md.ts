import { Obj } from '../../utils'
import { ReportRendererArgs } from '../_type_'
import { formatDate } from './format-date'
import { renderStatus } from './render-status'

/**
 * Convert the report object as an MD file content, and save the file.
 */
export const renderReportAsMarkdown = ({
  filePath,
  report,
  fileManager,
}: ReportRendererArgs) => {
  let content = ''

  const add = (str: string) => {
    content += `${str}\n`
    return { add }
  }

  const renderArgs = (args: Obj | undefined) => {
    const a = Object.entries(args ?? {})
    if (a.length) {
      add(`- arguments:`)
      a.forEach(([k, v]) => {
        add(`  - __${k}__:`.padEnd(16) + `\`${v}\``)
      })
    }
  }

  const renderOpts = (opts: Obj | undefined) => {
    const a = Object.entries(opts ?? {})
    if (a.length) {
      add(`- options:`)
      a.forEach(([k, v]) => {
        add(`  - __${k}__:`.padEnd(16) + `\`${v}\``)
      })
    }
  }

  // add(`# ${config.cliName} - execution report`)

  add(`## Quick overview`)

  add(`\n| | |`)
  add(`| --- | --- |`)
  add(`| Date |  ${formatDate(report.detail.initAt, 'yyyy:mm:dd')} |`)
  add(`| Init at | ${formatDate(report.detail.initAt, 'hh:mm:ss')} |`)
  add(`| Start at | ${formatDate(report.detail.startedAt, 'hh:mm:ss')} |`)
  add(`| Finished at | ${formatDate(report.detail.finishedAt, 'hh:mm:ss')} |`)

  const duration =
    ((report.detail.finishedAt ?? 0) - (report.detail.startedAt ?? 0)) * 0.001 +
    's'

  add(`| Duration | __${duration}__ |`)

  add(`\n| Script | Status | Duration |`)
  add(`| --- | --- | --- |`)
  report.sections.forEach((s, i) => {
    add(
      `| [${s.title}](#${i}) | ${renderStatus(s.status)} ${s.status} | ${
        s.timer.duration / 1000
      }s |`,
    )
  })

  if (report.setup.procedure) {
    const p = report.setup.procedure
    add(`\n---\n`)
    add(`## Procedure`)
    add(`### ${p.title}`)
    add(`> ${p.description}`)
    add(`- id: __${p.id}__`)
    renderArgs(report.setup.procedure.args)
  }

  add(`\n---\n`)
  add(`## Scripts`)

  report.sections.forEach((s, i) => {
    add(`### ${renderStatus(s.status)} <span id="${i}">${s.title}</span>`)
      .add(`> ${s.description}`)
      .add(`- id: __${s.id}__`)
      .add(`- duration: __${s.timer.duration / 1000}s__`)
      .add(`- status: __${s.status}__`)

    renderArgs(s.arguments)

    renderOpts(s.options)

    s.content.forEach(c => {
      switch (c.type) {
        case 'header':
          add(`\n#### ${renderStatus(c.status, { silent: true })} ${c.text}`)
          break
        case 'line':
          add(`\n - ${renderStatus(c.status, { silent: true })} ${c.text}`)
          break
        case 'problem-line':
          add(`\n - 🧨 **PROBLEM** - ${c.text}`)
          break
        case 'solution-line':
          add(`\n - 🔧 **SOLUTION** - ${c.text}`)
          break
        case 'labeled-line':
          add(
            `${renderStatus(c.status, { silent: true })} ${c.label} - ${
              c.text
            } `,
          )
          break
        case 'list':
          c.items.forEach(item => {
            add(`     - ${item}`)
          })
          break
        case 'code-list':
          c.items.forEach(item => {
            add(`     - \`${item}\``)
          })
          break
        case 'list-2col':
          c.items.forEach(([a, b]) => {
            add(`     - ${a} → ${b}`)
          })
          break
        case 'code-list-2col':
          c.items.forEach(([a, b]) => {
            add(`     - *${a}* → \`${b}\``)
          })
          break
        case 'error':
          add(`\`\`\`\n${c.text}\n\`\`\``)
          break
        case 'error-detail':
          add(`\n- ${renderStatus('ERROR', { silent: true })} ${c.info.issue}`)

          if (c.info.location) {
            add(`  - Location: \`${c.info.location}\``)
          }
          if (c.info.recommendation) {
            add(`  - Recommendation: \`${c.info.recommendation}\``)
          }
          if (c.info.payload) {
            add(
              `  \`\`\`\n  ${c.info.payload
                .split('\n')
                .join('\n    ')}\n  \`\`\``,
            )
          }
          if (c.info.error) {
            add(
              `  \`\`\`\n  ${c.info.error
                .split('\n')
                .join('\n    ')}\n  \`\`\``,
            )
          }

          break
        case 'console-output':
          add(`\`\`\`\n${c.text}\n\`\`\``)
          break

        default:
          break
      }
    })
    add('---')
  })

  fileManager.writeFile(filePath, content)
}
