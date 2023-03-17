import { CliFileManager } from '../../file-manager'
import { Report } from '../_type_'

export interface RendererProps {
  config: any
  report: Report
  fileManager: ReturnType<CliFileManager>
}
