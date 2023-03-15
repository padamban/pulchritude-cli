import { bundleRequire } from 'bundle-require';
import JoyCon from 'joycon';
import path from 'path';
import { LoadConfigArgs, LoadConfigRetval } from './_types_';

const joycon = new JoyCon();

export async function loadConfig<C extends object>(args: LoadConfigArgs<C>): Promise<LoadConfigRetval<C>> {
  const { defaultConfig, validConfigFilePaths } = args;

  const CURRENT_WORKING_DIRECTORY = process.cwd();

  const configPath = await joycon.resolve(
    validConfigFilePaths,
    CURRENT_WORKING_DIRECTORY,
    path.parse(CURRENT_WORKING_DIRECTORY).root
  );

  if (configPath) {
    try {
      const rootDir = path.dirname(configPath);

      const configModule = await bundleRequire({
        filepath: configPath,
      });

      const config: C = configModule.mod.config || configModule.mod.default;

      return {
        value: {
          ...defaultConfig,
          ...config,
        },
        cwd: rootDir,
        state: 'success',
      };
    } catch (error) {
      return { value: defaultConfig, cwd: undefined, state: 'error', error: String(error) };
    }
  }

  return { value: defaultConfig, cwd: undefined, state: 'missing-config-file' };
}
