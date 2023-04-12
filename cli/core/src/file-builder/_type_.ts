import { FileBuilderFactoryArgs } from './builders/_type_'
import { RawFileContentBuilderFactory } from './builders/raw/_type_'
import { TsFileContentBuilderFactory } from './builders/ts/_type_'

export interface FileBuilderInstance {
  /**
   * General purpose, bare bones file builder.
   */
  raw: ReturnType<RawFileContentBuilderFactory>

  /**
   * Facilitates the creation of typescript file content.
   */
  ts: ReturnType<TsFileContentBuilderFactory>
}

/**
 * Supported file builders
 */
export type FileBuilders = (
  props?: FileBuilderFactoryArgs,
) => FileBuilderInstance
