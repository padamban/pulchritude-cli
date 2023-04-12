import fs from 'fs'
import glob from 'glob'
import path from 'path'

import { FileManager, ListOptions } from './_type_'

/**
 * Create/read/list files.
 */
const FILE_MANAGER: FileManager = ({ cwd }) => {
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

  function listFiles(pattern: string, options: ListOptions): string[] {
    return glob.sync(pattern, options)
  }

  return {
    ensureDir,
    writeFile,
    listFiles,
  }
}

export { FILE_MANAGER }
