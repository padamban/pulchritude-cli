import { FileBuilderFactory, GenericFileContentBuilder } from '../_type_'

/**
 * Chainable file content builder utility.
 */
export interface ChainableRawWriter {
  /**
   * Add a line of content.
   * @param text
   * @returns
   */
  addLine: (text: string) => ChainableRawWriter
  /**
   * Add a number of new lines to the content.
   * @param nl
   * @returns
   */
  newLine: (nl?: number) => ChainableRawWriter
}

/**
 * File content builder instance.
 */
export type RawFileContentBuilder =
  GenericFileContentBuilder<ChainableRawWriter>

/**
 * File content builder instance factory.
 */
export type RawFileContentBuilderFactory = FileBuilderFactory<
  () => RawFileContentBuilder
>
