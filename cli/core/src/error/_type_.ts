import { Obj, SingleOrArray } from '../utils'

/**
 * Error logger function signature.
 */
export type LogError = (info: ErrorInfo) => void

/**
 * Error describer object.
 */
export interface ErrorInfo {
  /**
   * Error type.
   */
  type: 'warn' | 'error'

  /**
   * What is the issue?
   */
  issue: string

  /**
   * Where did the error happen?
   */
  location?: string

  /**
   * What can be done to avoid this issue?
   */
  recommendation?: SingleOrArray<string>

  /**
   * The original error info.
   */
  error?: string

  /**
   * Provide additional info.
   */
  payload?: string | Obj
}
