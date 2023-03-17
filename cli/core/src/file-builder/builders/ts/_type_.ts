import { FileBuilderFactory } from '../_type_'

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

export interface TsFileContentBuilder {
  write: ChainableTsWriter
  isEmpty: () => boolean
  compileContent: () => Promise<string>
}

export type TsFileContentBuilderFactory = FileBuilderFactory<
  () => TsFileContentBuilder
>
