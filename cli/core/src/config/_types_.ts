export type LoadConfigState = 'success' | 'error' | 'missing-config-file'

export interface LoadConfigArgs<CONFIG> {
  validConfigFilePaths: string[]
  defaultConfig: CONFIG
}

export interface LoadConfigRetval<CONFIG> {
  value: CONFIG
  cwd: string | undefined
  state: LoadConfigState
  error?: string
}

export type LoadConfig<CONFIG> = (
  args: LoadConfigArgs<CONFIG>,
) => Promise<LoadConfigRetval<CONFIG>>
