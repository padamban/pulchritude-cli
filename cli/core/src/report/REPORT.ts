import path from 'path'

import { PROGRESS } from '../progress'
import { CliReporter, Report, ReporterArgs, ReportStatus } from './_type_'
import { RENDER_REPORT } from './renderer/RENDER_REPORT'

/**
 * Creates a reporter utility that collects execution data.
 * - helps to log info about each command
 * - creates report file and terminal log
 * - a portion of its logger functionality is passed on to each script in the context
 */
export const REPORTER = (args?: ReporterArgs): CliReporter => {
  const { disableProgressBar, rendererConfig, cwd } = args ?? {}

  const report: Report = {
    detail: {
      initAt: Date.now(),
      outputFileLinks: {},
      terminalCommands: [],
    },
    setup: {},
    sections: [],
  }

  const progress = disableProgressBar
    ? undefined
    : PROGRESS({ barSize: rendererConfig?.terminal.frameWidth })

  let finished = false

  const addTerminalCommand = (cmd: string) => {
    report.detail.terminalCommands.push(cmd)
  }

  const setSetupDetails = (setup: Report['setup']) => {
    report.setup = setup
  }

  const initSection: CliReporter['initSection'] = params => {
    if (finished) return

    report.sections.push({
      id: params.id.toString(),
      title: params.title,
      description: params.description,
      status: 'OK',
      timer: {
        start: Date.now(),
        end: -1,
        duration: -1,
      },
      arguments: params.arguments,
      options: params.options,
      content: [],
    })
    progress?.setSectionTitle(params.title)
  }

  const endSection = () => {
    if (finished) return

    const timer = report.sections.at(-1)?.timer

    if (timer) {
      timer.end = Date.now()
      timer.duration = timer.end - timer.start
    }

    progress?.nextActiveSection()
  }

  const start = () => {
    report.detail.startedAt = Date.now()
  }

  const finish = () => {
    finished = true
    progress?.finish()
    report.detail.finishedAt = Date.now()
  }

  const disable = () => {
    finished = true
    progress?.disable()
  }

  const section = () => report.sections.at(-1)
  const content = () => section()?.content

  const log = {
    title: (title: string) => {
      if (finished) return log
      const s = section()
      if (s) s.title = title
      return log
    },
    sectionStatus: (status: ReportStatus) => {
      if (finished) return log
      const s = section()
      if (s) s.status = setStatus(status, s.status)
      return log
    },
    headerStatus: (status: ReportStatus) => {
      if (finished) return log
      const s = section()
      log.sectionStatus(status)
      if (s) {
        const lastHeader = s.content.filter(c => c.type === 'header').at(-1)
        if (lastHeader?.type === 'header') {
          lastHeader.status = setStatus(status, lastHeader.status)
        }
      }
      return log
    },
    lineStatus: (status: ReportStatus) => {
      if (finished) return log
      const s = section()
      log.headerStatus(status)
      if (s) {
        const lastLine = s.content.filter(c => c.type === 'line').at(-1)
        if (lastLine?.type === 'line') {
          lastLine.status = setStatus(status, lastLine.status)
        }
      }
      return log
    },
    header: (text: string, status: ReportStatus = 'NONE') => {
      if (finished) return log
      content()?.push({ type: 'header', text, status })
      log.sectionStatus(status)
      return log
    },
    line: (text: string, status: ReportStatus = 'NONE') => {
      if (finished) return log
      log.headerStatus(status)
      content()?.push({ type: 'line', text, status })
      return log
    },
    solutionLine: (text: string) => {
      if (finished) return log
      content()?.push({ type: 'solution-line', text })
      return log
    },
    problemLine: (text: string) => {
      if (finished) return log
      content()?.push({ type: 'problem-line', text })
      return log
    },
    labeledLine: (
      label: string,
      text: string,
      status: ReportStatus = 'NONE',
    ) => {
      if (finished) return log
      content()?.push({ type: 'labeled-line', label, text, status })
      return log
    },
    list: (data: string[]) => {
      if (finished) return log
      content()?.push({ type: 'list', items: data })
      return log
    },
    codeList: (data: string[]) => {
      if (finished) return log
      content()?.push({ type: 'code-list', items: data })
      return log
    },
    list2: (...items: [string, string][]) => {
      if (finished) return log
      content()?.push({ type: 'list-2col', items })
      return log
    },
    codeList2: (...items: [string, string][]) => {
      if (finished) return log
      content()?.push({ type: 'code-list-2col', items })
      return log
    },
    table2: (...data: [string, string][]) => {
      if (finished) return log
      content()?.push({ type: 'table-2col', content: data })
      return log
    },
    error: (err: unknown) => {
      if (finished) return log
      log.headerStatus('ERROR')
      content()?.push({ type: 'error', text: '' + err })
      return log
    },
    consoleOutput: (output: unknown) => {
      if (finished) return log
      content()?.push({ type: 'console-output', text: '' + output })
      return log
    },
  }

  const render = async () => {
    if (rendererConfig) {
      RENDER_REPORT({ ...rendererConfig, report, cwd: cwd ?? process.cwd() })
    }
  }

  if (rendererConfig?.output.includes('json')) {
    report.detail.outputFileLinks.json = path.join(
      rendererConfig.outputFolderPath,
      'report.json',
    )
  }

  if (rendererConfig?.output.includes('md')) {
    report.detail.outputFileLinks.md = path.join(
      rendererConfig.outputFolderPath,
      'report.md',
    )
  }

  return {
    setSetupDetails,
    initSection,
    endSection,
    disable,
    start,
    finish,
    getReport: () => report,
    addTerminalCommand,
    log,
    progress,
    args,
    render,
  }
}

/**
 * Given two statuses, returns of the highest priority.
 */
const setStatus = (
  aStatus: ReportStatus,
  bStatus: ReportStatus,
): ReportStatus => {
  const levels: ReportStatus[] = ['NONE', 'OK', 'SKIPPED', 'WARNING', 'ERROR']

  const aLevel = levels.indexOf(aStatus)
  const bLevel = levels.indexOf(bStatus)

  return aLevel > bLevel ? aStatus : bStatus
}