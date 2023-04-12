import path from 'path'

import { FILE_MANAGER } from '../../file-manager'
import { ReportRendererConfig } from '../_type_'
import { renderReportAsJson } from './render-report-as-json'
import { renderReportAsMarkdown } from './render-report-as-md'
import { renderReportToConsole } from './render-report-to-console'

function RENDER_REPORT(args: ReportRendererConfig) {
  const { report, output, outputFolderPath, terminal, cwd } = args

  const fileManager = FILE_MANAGER({ cwd })

  if (output.includes('console')) {
    renderReportToConsole({
      width: terminal.frameWidth,
      report,
    })
  }

  if (output.includes('json')) {
    const filePath = path.join(outputFolderPath, 'report.json')

    renderReportAsJson({
      filePath,
      report,
      fileManager,
    })
  }

  if (output.includes('md')) {
    const filePath = path.join(outputFolderPath, 'report.md')

    renderReportAsMarkdown({
      filePath,
      report,
      fileManager,
    })
  }
}

export { RENDER_REPORT }
