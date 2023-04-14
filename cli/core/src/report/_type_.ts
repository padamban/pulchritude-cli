import { ProgressBar } from '../progress'
import { Obj } from '../utils'

export type ReportStatus = 'ERROR' | 'WARNING' | 'OK' | 'SKIPPED' | 'NONE'

/**
 * Report section entry types.
 * - TODO: revise available entries
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
      type: 'console-output'
      text: string
    }

export type FileReportType = 'json' | 'md'
export type NonFileReportType = 'console'
export type ReportType = FileReportType | NonFileReportType

export interface ReportSection {
  id: string
  title: string
  description: string
  status: ReportStatus
  timer: {
    start: number
    end: number
    duration: number
  }
  arguments: Obj | undefined
  options: Obj | undefined
  content: ReportEntry[]
}

export interface ReportSetupSection {
  procedure?: {
    title: string
    description: string
    id: string
    args: Obj
  }
}
export interface Report {
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
 * - TODO: revise available functions
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
  consoleOutput: (output: unknown) => CliReportLogger
}

export interface CliReportDetail {
  initAt: number
  startedAt?: number
  finishedAt?: number
  outputFileLinks: Partial<Record<FileReportType, string>>
  terminalCommands: string[]
}

export interface CliReporter {
  /**
   * Add setup information.
   * - e.g.: what were the script arguments
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
   * - calculates the execution time
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

export type ReportOutput = 'console' | 'md' | 'json'

export interface ReporterArgs {
  /**
   * Disable the progress bar.
   */
  disableProgressBar?: boolean

  cwd: string

  /**
   * TODO
   */
  rendererConfig: Pick<
    ReportRendererConfig,
    'output' | 'outputFolderPath' | 'terminal'
  >
}

export interface ReportRendererConfig {
  report: Report
  cwd: string
  // fileManager: ReturnType<CliFileManager>
  output: ReportType[]
  outputFolderPath: string
  terminal: {
    frameWidth: number
  }
}
