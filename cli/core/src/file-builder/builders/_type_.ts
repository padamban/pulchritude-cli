import { LogError } from '../../error'

export interface FileBuilderFactoryArgs {
  onError?: LogError
}

export type FileBuilderFactory<Builder> = (
  args?: FileBuilderFactoryArgs,
) => Builder
