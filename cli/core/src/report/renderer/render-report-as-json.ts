import { RendererProps } from './_type_'

export const renderReportAsJson = ({
  config,
  report,
  fileManager,
}: RendererProps) => {
  if (!config.reporter.reports?.includes('json')) return

  fileManager.writeFile(
    config.reporter.path?.json,
    JSON.stringify(report, null, 2),
  )
}
