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
  | 'js-based'

type ConfigExtension = 'ts' | 'js' | (string & {})

type ConfigContent = string

interface Args {
  configFolder: string
}

type Retval = Map<
  ConfigName,
  {
    extension: ConfigExtension
    content: ConfigContent
  }
>

function getConfigContents(args: Args): Retval {
  const { configFolder } = args
  const configFilePaths = fs.readdirSync(configFolder)

  const contents = configFilePaths.reduce<Retval>(
    (map, p) =>
      map.set(
        p.split('.')[0] as any,

        {
          extension: p.split('.')[2] ?? 'ts',
          content: fs.readFileSync(path.resolve(configFolder, p), {
            encoding: 'utf8',
          }),
        },
      ),
    new Map(),
  )

  return contents
}

export { getConfigContents }
export type { ConfigName }
