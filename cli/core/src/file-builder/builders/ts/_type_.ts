/* eslint-disable jsdoc/require-jsdoc */
import { FileBuilderFactory, GenericFileContentBuilder } from '../_type_'

/**
 * Chainable typescript content builder utility.
 */
export interface ChainableTsWriter {
  addLine: (text: string) => ChainableTsWriter
  newLine: (nl?: number) => ChainableTsWriter
  addLines: (newLines: string[]) => ChainableTsWriter
  // code
  addInterface: (interfaceName: string) => ChainableTsWriter
  addType: (typeName: string) => ChainableTsWriter
  addClosingBrace: () => ChainableTsWriter
  // comment
  addDisableLinter: () => ChainableTsWriter
  addDoNotEditWarning: () => ChainableTsWriter
  addDocComment: (commentLines: string | string[]) => ChainableTsWriter
  addCommentTitle: (comment: string, nl?: number) => ChainableTsWriter
  addComment: (comment: string, nl?: number) => ChainableTsWriter
  addCommentBullet: (comment: string, nl?: number) => ChainableTsWriter
  addCommentHeader: (comment: string, nl?: number) => ChainableTsWriter
}

/**
 * Typescript file content builder instance.
 */
export type TsFileContentBuilder = GenericFileContentBuilder<ChainableTsWriter>

/**
 * Typescript file content builder instance factory.
 */
export type TsFileContentBuilderFactory = FileBuilderFactory<
  () => TsFileContentBuilder
>
