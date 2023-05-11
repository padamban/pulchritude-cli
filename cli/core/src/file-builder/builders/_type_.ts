import { BuiltInParserName } from 'prettier'

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
 * Common file content builders functionalities.
 */
export interface GenericFileContentBuilder<W> {
  /**
   * Chainable file builder functions.
   */
  write: W

  /**
   * Checks if the content has lines.
   */
  isEmpty: () => boolean

  /**
   * Combine the lines array into a single string content.
   */
  compileContent: (parser?: BuiltInParserName) => Promise<string>
}

/**
 * Signature of every file builder factory function.
 */
export type FileBuilderFactory<Builder> = (
  args?: FileBuilderFactoryArgs,
) => Builder
