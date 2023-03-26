import { BuiltInParserName } from 'prettier'

import { LogError } from '../error'
import { RawFileContentBuilderFactory } from './builders/raw/_type_'
import { TsFileContentBuilderFactory } from './builders/ts/_type_'

export interface CliFileBuilderLogger {
  error: (text: string) => void
}

export interface CliFileBuilderFactoryProps {
  logger?: CliFileBuilderLogger
  onError?: LogError
}

export interface CliFileBuilderProps {
  logger?: CliFileBuilderLogger
  fileType?: string
}

export type CliRawFileBuilderFactory = (
  props: CliFileBuilderProps,
) => () => CliRawFileContentBuilder

export type CliFileBuilderFactory = (
  props: CliFileBuilderProps,
) => () => CliFileContentBuilder

export type CliFileBuilders = (props?: CliFileBuilderFactoryProps) => {
  raw: ReturnType<RawFileContentBuilderFactory>
  ts: ReturnType<TsFileContentBuilderFactory>
}

export interface CliChainableBase {
  addLine: (text: string) => CliChainableBase
  newLine: (nl?: number) => CliChainableBase
}

export interface CliRawFileContentBuilder {
  write: CliChainableBase
  isEmpty: () => boolean
  getLines: () => string[]
  compileContent: (parser?: BuiltInParserName) => Promise<string>
  log: () => void
}

export interface CliFileContentBuilder {
  write: CliChainableBase
  comment: CliChainableComments
  code: CliChainableCode
  isEmpty: () => boolean
  getLines: () => string[]
  compileContent: (parser?: BuiltInParserName) => Promise<string>
  log: () => void
}

export interface CliChainableComments {
  addDisableLinter: () => CliChainableComments
  addDoNotEditWarning: () => CliChainableComments
  addDocComment: (commentLines: string | string[]) => CliChainableComments
  addCommentTitle: (comment: string, nl?: number) => CliChainableComments
  addComment: (comment: string, nl?: number) => CliChainableComments
  addCommentBullet: (comment: string, nl?: number) => CliChainableComments
  addCommentHeader: (comment: string, nl?: number) => CliChainableComments
}

export interface CliChainableCode {
  addInterface: (interfaceName: string) => CliChainableCode
  addType: (typeName: string) => CliChainableCode
  addClosingBrace: () => CliChainableCode
  addLines: (newLines: string[]) => CliChainableCode
  addLine: (newLine: string) => CliChainableCode
}

export interface CliChainableTs {
  addLine: (text: string) => CliChainableTs
  newLine: (nl?: number) => CliChainableTs
  // Code
  addInterface: (interfaceName: string) => CliChainableTs
  addType: (typeName: string) => CliChainableTs
  addClosingBrace: () => CliChainableTs
  addLines: (newLines: string[]) => CliChainableTs
  // Comment
  addDisableLinter: () => CliChainableTs
  addDoNotEditWarning: () => CliChainableTs
  addDocComment: (commentLines: string | string[]) => CliChainableTs
  addCommentTitle: (comment: string, nl?: number) => CliChainableTs
  addComment: (comment: string, nl?: number) => CliChainableTs
  addCommentBullet: (comment: string, nl?: number) => CliChainableTs
  addCommentHeader: (comment: string, nl?: number) => CliChainableTs
}
