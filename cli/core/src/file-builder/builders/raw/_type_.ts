import { BuiltInParserName } from 'prettier'

import { FileBuilderFactory } from '../_type_'

export interface ChainableRawWriter {
  addLine: (text: string) => ChainableRawWriter
  newLine: (nl?: number) => ChainableRawWriter
}

export interface RawFileContentBuilder {
  write: ChainableRawWriter
  isEmpty: () => boolean
  compileContent: (parser?: BuiltInParserName) => Promise<string>
}

export type RawFileContentBuilderFactory = FileBuilderFactory<
  () => RawFileContentBuilder
>
