import fs from 'fs'
import glob from 'glob'
import path from 'path'

type Options = Pick<glob.IOptions, 'ignore'>

import { CliFileManager } from './_type_'

export const FILE_MANAGER: CliFileManager = ({ cwd }) => {
  function ensureDir(dirPath: string) {
    const { dir } = path.parse(dirPath)

    if (fs.existsSync(dir)) return

    fs.mkdirSync(dir, { recursive: true })
  }

  function writeFile(filePath: string | undefined, content: string) {
    if (filePath === undefined) return

    const fullFilePath = path.resolve(cwd, filePath)

    ensureDir(fullFilePath)

    fs.writeFileSync(fullFilePath, content)
  }

  function listFiles(pattern: string, options: Options): string[] {
    return glob.sync(pattern, options)
  }

  return {
    ensureDir,
    writeFile,
    listFiles,
  }
}
