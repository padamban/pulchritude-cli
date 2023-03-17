import { Obj } from '../../utils'
import { RendererProps } from './_type_'
import { statusRenderer } from './status-renderer'

export const renderReportAsMarkdown = ({
  config,
  report,
  fileManager,
}: RendererProps) => {
  if (!config.reporter.reports?.includes('md')) return

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

  add(`# ${config.cliName} - execution report`)

  add(`## Quick overview`)

  add(`\n| Script | Status | Duration |`)
  add(`| --- | --- | --- |`)
  report.sections.forEach((s, i) => {
    add(
      `| [${s.title}](#${i}) | ${statusRenderer(s.status)} ${s.status} | ${
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
    add(`### ${statusRenderer(s.status)} <span id="${i}">${s.title}</span>`)
      .add(`> ${s.description}`)
      .add(`- id: __${s.id}__`)
      .add(`- duration: __${s.timer.duration / 1000}s__`)
      .add(`- status: __${s.status}__`)

    renderArgs(s.arguments)

    s.content.forEach(c => {
      switch (c.type) {
        case 'header':
          add(`\n#### ${statusRenderer(c.status, { silent: true })} ${c.text}`)
          break
        case 'line':
          add(`\n - ${statusRenderer(c.status, { silent: true })} ${c.text}`)
          break
        case 'problem-line':
          add(`\n - 🧨 **PROBLEM** - ${c.text}`)
          break
        case 'solution-line':
          add(`\n - 🔧 **SOLUTION** - ${c.text}`)
          break
        case 'labeled-line':
          add(
            `${statusRenderer(c.status, { silent: true })} ${c.label} - ${
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
        case 'console-output':
          add(`\`\`\`\n${c.text}\n\`\`\``)
          break

        default:
          break
      }
    })
    add('---')
  })

  fileManager.writeFile(config.reporter.path?.md, content)
}