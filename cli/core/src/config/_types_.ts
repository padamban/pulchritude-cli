/**
 * Possible response states of the config loader.
 */
export type LoadConfigState = 'success' | 'error' | 'missing-config-file'

/**
 * Arguments of the config loader.
 */
export interface LoadConfigArgs<CONFIG> {
  /**
   * The possible filenames that will be loaded automatically.
   * @example
   * ['cli.config.ts', 'dev-cli.config.ts']
   */
  validConfigFilePaths: string[]

  /**
   * Default config object.
   */
  defaultConfig: CONFIG
}

/**
 * Config loader's return value.
 */
export interface LoadConfigRetval<CONFIG> {
  /**
   * Loaded config object.
   */
  value: CONFIG

  /**
   * Current working directory.
   */
  cwd: string | undefined

  /**
   * Possible response states of the config loader.
   */
  state: LoadConfigState

  /**
   * Error info.
   */
  error?: string
}
