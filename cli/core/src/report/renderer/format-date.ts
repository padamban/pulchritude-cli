/**
 * Format date timestamp to date format.
 */
function formatDate(
  /**
   * Date timestamp.
   */
  timestamp: number | undefined,

  /**
   * Output format.
   */
  format?: 'yyyy:mm:dd hh:mm:ss' | 'hh:mm:ss' | 'yyyy:mm:dd',
) {
  if (!timestamp) return ''

  const date = new Date(timestamp)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hour = String(date.getHours()).padStart(2, '0')
  const minute = String(date.getMinutes()).padStart(2, '0')
  const second = String(date.getSeconds()).padStart(2, '0')

  const hhmmss = `${hour}:${minute}:${second}`
  const yyyymmdd = `${year}-${month}-${day}`

  if (format === 'hh:mm:ss') {
    return hhmmss
  }

  if (format === 'yyyy:mm:dd') {
    return yyyymmdd
  }

  return `${yyyymmdd} ${hhmmss}`
}

export { formatDate }
