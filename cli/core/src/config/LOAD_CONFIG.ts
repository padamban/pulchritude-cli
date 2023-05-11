import { bundleRequire } from 'bundle-require'
import JoyCon from 'joycon'
import path from 'path'

import { LoadConfigArgs, LoadConfigRetval } from './_type_'

const joycon = new JoyCon()

/**
 * Load config TS file.
 * - internally uses joycon
 * - beware the dependency bundles of the config file.
 * @example
 * const config = await LOAD_CONFIG<CliSetup>({
 *   defaultConfig: {},
 *   validConfigFilePaths: ['cli.config.ts'],
 * })
 */
export async function LOAD_CONFIG<C extends object>(
  args: LoadConfigArgs,
): Promise<LoadConfigRetval<C>> {
  const { validConfigFilePaths } = args

  const CURRENT_WORKING_DIRECTORY = process.cwd()

  const configPath = await joycon.resolve(
    validConfigFilePaths,
    CURRENT_WORKING_DIRECTORY,
    path.parse(CURRENT_WORKING_DIRECTORY).root,
  )

  if (configPath) {
    try {
      const rootDir = path.dirname(configPath)

      const configModule = await bundleRequire({
        filepath: configPath,
      })

      const config: C = configModule.mod.config || configModule.mod.default

      return {
        value: {
          ...config,
        },
        cwd: rootDir,
        state: 'success',
      }
    } catch (error) {
      return {
        value: undefined,
        cwd: undefined,
        state: 'error',
        error: String(error),
      }
    }
  }

  return {
    value: undefined,
    cwd: undefined,
    state: 'missing-config-file',
  }
}
