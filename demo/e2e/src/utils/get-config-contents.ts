import fs from 'fs'
import path from 'path'

type ConfigName =
  | 'only-cli-info'
  | 'only-program-info'
  | 'only-command-info'
  | 'invalid-params'
  | 'valid-params'
  | 'argument-params'
  | 'option-params'

type ConfigContent = string

interface Args {
  configFolder: string
}

function getConfigContents(args: Args): Map<ConfigName, ConfigContent> {
  const { configFolder } = args
  const configFilePaths = fs.readdirSync(configFolder)

  const contents = configFilePaths.reduce(
    (map, p) =>
      map.set(
        p.split('.')[0] as any,
        fs.readFileSync(path.resolve(configFolder, p), { encoding: 'utf8' }),
      ),
    new Map<ConfigName, ConfigContent>(),
  )

  return contents
}

export { getConfigContents }
export type { ConfigName }
