/* eslint-disable jsdoc/require-jsdoc */
import { ErrorInfo } from '../error'
import { FileManagerInstance } from '../file-manager'
import { ProgressBar } from '../progress'
import { Obj } from '../utils'

/**
 * Status of the section.
 */
export type ReportStatus = 'ERROR' | 'WARNING' | 'OK' | 'SKIPPED' | 'NONE'

/**
 * Report section entry types.
 * - TODO: revise available entries.
 */
export type ReportEntry =
  | {
      type: 'header'
      text: string
      status: ReportStatus
    }
  | {
      type: 'line'
      text: string
      status: ReportStatus
    }
  | {
      type: 'solution-line'
      text: string
    }
  | {
      type: 'problem-line'
      text: string
    }
  | {
      type: 'labeled-line'
      label: string
      text: string
      status: ReportStatus
    }
  | {
      type: 'list'
      items: string[]
    }
  | {
      type: 'code-list'
      items: string[]
    }
  | {
      type: 'list-2col'
      items: [string, string][]
    }
  | {
      type: 'code-list-2col'
      items: [string, string][]
    }
  | {
      type: 'table-2col'
      content: [string, string][]
    }
  | {
      type: 'error'
      text: string
    }
  | {
      type: 'error-detail'
      info: ErrorInfo
    }
  | {
      type: 'console-output'
      text: string
    }

/**
 * The report can be of these types.
 */
export type FileReportType = 'json' | 'md'

/**
 * The report can displayed in this kind of non-file based mediums.
 */
export type NonFileReportType = 'console'

/**
 * Report can be logged in these kind of formats.
 */
export type ReportType = FileReportType | NonFileReportType

/**
 * Section of the report.
 */
export interface ReportSection {
  /**
   * ID of the section.
   */
  id: string

  /**
   * Title of the section.
   */
  title: string

  /**
   * Short description of the section.
   */
  description: string

  /**
   * Short description of the section.
   */
  status: ReportStatus

  /**
   * Temporal metrics of the section.
   */
  timer: {
    /**
     * The section creation time.
     */
    start: number

    /**
     * The section end time.
     */
    end: number

    /**
     * The section was executed in this amount of data.
     */
    duration: number
  }

  /**
   * Argument values of the executed script.
   */
  arguments: Obj | undefined

  /**
   * Option values of the executed script.
   */
  options: Obj | undefined

  /**
   * Content entries of the section.
   */
  content: ReportEntry[]
}

/**
 * Section details.
 */
export interface ReportSetupSection {
  procedure?: {
    title: string
    description: string
    id: string
    args: Obj
  }
}

/**
 * Full report object.
 */
export interface Report {
  /**
   * General info of the report.
   */
  detail: CliReportDetail

  /**
   * Information about the execution context and arguments.
   */
  setup: ReportSetupSection

  /**
   * Information of the executed scripts.
   */
  sections: ReportSection[]
}

export interface CliReporterConfig {
  reports?: ReportType[]
  path?: Partial<Record<FileReportType, string>>
}

/**
 * Log section information.
 * - TODO: revise available functions.
 */
export interface CliReportLogger {
  title: (title: string) => CliReportLogger
  sectionStatus: (status: ReportStatus) => CliReportLogger
  headerStatus: (status: ReportStatus) => CliReportLogger
  lineStatus: (status: ReportStatus) => CliReportLogger
  header: (text: string, status?: ReportStatus) => CliReportLogger
  line: (text: string, status?: ReportStatus) => CliReportLogger
  problemLine: (text: string) => CliReportLogger
  solutionLine: (text: string) => CliReportLogger
  labeledLine: (
    label: string,
    text: string,
    status?: ReportStatus,
  ) => CliReportLogger
  list: (data: string[]) => CliReportLogger
  codeList: (data: string[]) => CliReportLogger
  list2: (...items: [string, string][]) => CliReportLogger
  codeList2: (...items: [string, string][]) => CliReportLogger
  table2: (...data: [string, string][]) => CliReportLogger
  error: (err: unknown) => CliReportLogger
  errorDetail: (err: ErrorInfo) => CliReportLogger
  consoleOutput: (output: unknown) => CliReportLogger
}

/**
 * Report info.
 */
export interface CliReportDetail {
  /**
   * The CLI has started at this moment.
   */
  initAt: number

  /**
   * The CLI script executions has started at this moment.
   */
  startedAt?: number

  /**
   * The CLI script executions has started at this moment.
   */
  finishedAt?: number

  /**
   * Report file links.
   */
  outputFileLinks: Partial<Record<FileReportType, string>>

  /**
   * Commands that we can copy and paste into the terminal,
   * in order to rerun the just executed scripts.
   */
  terminalCommands: string[]
}

export interface CliReporter {
  /**
   * Add setup information.
   * - e.g.: what were the script arguments.
   */
  setSetupDetails: (setup: Report['setup']) => void

  /**
   * Start a new section.
   */
  initSection: (params: {
    id: string
    title: string
    description: string
    arguments?: Obj
    options?: Obj
  }) => void

  /**
   * Terminate section.
   * - calculates the execution time.
   */
  endSection: () => void

  /**
   * Turns off the reporter functions.
   * Disables the internal progress bar.
   */
  disable: () => void

  /**
   * Turns on the reporter.
   */
  start: () => void

  /**
   * Turns off the reporter functions.
   */
  finish: () => void

  /**
   * Returns the full report object.
   */
  getReport: () => Report

  /**
   * Add a string that can be copied and pasted into the terminal,
   * and by pressing enter we cen rerun the given command.
   */
  addTerminalCommand: (cmd: string) => void

  /**
   * Log section data.
   */
  log: CliReportLogger

  /**
   * Update the progress bar.
   */
  progress?: ProgressBar

  /**
   * Create report files and log into terminal.
   */
  render: () => void

  /**
   * Arguments of the reporter.
   */
  args?: ReporterArgs
}

export interface ReporterArgs {
  /**
   * Disable the progress bar.
   */
  disableProgressBar?: boolean

  /**
   * Current working directory.
   */
  cwd: string

  /**
   * Config of the renderer.
   */
  rendererConfig: Pick<
    ReportRendererConfig,
    'output' | 'outputFolderPath' | 'terminal'
  >
}

export interface ReportRendererConfig {
  report: Report
  cwd: string
  output: ReportType[]
  outputFolderPath: string
  terminal: {
    frameWidth: number
  }
}

export interface ReportRendererArgs {
  filePath: string
  report: Report
  fileManager: FileManagerInstance
}
