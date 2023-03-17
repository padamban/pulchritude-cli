export interface FileBuilderLogger {
  error: (text: string) => void
}

export interface FileBuilderFactoryProps {
  logger?: FileBuilderLogger
}

export type FileBuilderFactory<Builder> = (
  props?: FileBuilderFactoryProps,
) => Builder
