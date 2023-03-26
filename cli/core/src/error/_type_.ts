export interface ErrorInfo {
  type: 'warn' | 'error'
  issue: string
  location?: string
  recommendation?: string
  error?: string
  payload?: string
}

export type LogError = (info: ErrorInfo) => void
