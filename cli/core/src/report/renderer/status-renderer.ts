import { ReportStatus } from '../_type_'

export function statusRenderer(
  status: ReportStatus,
  config?: { silent?: boolean },
) {
  switch (status) {
    case 'NONE':
      return ''
    case 'ERROR':
      return '🔴'
    case 'WARNING':
      return '🟡'
    case 'OK':
      return config?.silent ? '' : '🟢'
    default:
      break
  }
}
