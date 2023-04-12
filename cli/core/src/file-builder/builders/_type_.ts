import { LogError } from '../../error'

/**
 * All file builders must support these arguments.
 */
export interface FileBuilderFactoryArgs {
  /**
   * Called when an error ocurred.
   */
  onError?: LogError
}

/**
 * Signature of every file builder factory function.
 */
export type FileBuilderFactory<Builder> = (
  args?: FileBuilderFactoryArgs,
) => Builder
