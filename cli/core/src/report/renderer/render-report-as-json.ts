import { ReportRendererArgs } from '../_type_'

/**
 * Save the report object as a JSON file.
 */
export const renderReportAsJson = ({
  filePath,
  report,
  fileManager,
}: ReportRendererArgs) => {
  fileManager.writeFile(filePath, JSON.stringify(report, null, 2))
}
