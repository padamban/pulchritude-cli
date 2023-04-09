import { CliFileManager } from '../../file-manager'
import { Report } from '../_type_'

export interface Args {
  filePath: string
  report: Report
  fileManager: ReturnType<CliFileManager>
}

/**
 * Save the report object as a JSON file.
 */
export const renderReportAsJson = ({ filePath, report, fileManager }: Args) => {
  fileManager.writeFile(filePath, JSON.stringify(report, null, 2))
}
