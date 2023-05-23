import fs from 'fs'
import { glob } from 'glob'
import mustache from 'mustache'
import path from 'path'
import url from 'url'

import { Obj } from '../utils'
import { FileManager, ListOptions } from './_type_'

/**
 * CRUD utility for the file system.
 */
const FILE_MANAGER: FileManager = args => {
  const { cwd } = args

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

  function remove(resourcePath: string) {
    fs.rmSync(path.resolve(resourcePath), { recursive: true, force: true })
  }

  function copy(fromPath: string, toPath: string) {
    fs.cpSync(path.resolve(fromPath), path.resolve(toPath), { recursive: true })
  }

  function listFiles(pattern: string, options: ListOptions): string[] {
    return glob.sync(pattern, options)
  }

  function copyTemplate(fromPath: string, toPath: string, templateValues: Obj) {
    const filesToCreate = fs.readdirSync(path.resolve(fromPath))

    filesToCreate.forEach(file => {
      const origFilePath = path.resolve(fromPath, file)
      const stats = fs.statSync(origFilePath)

      if (stats.isFile()) {
        if (file === '.npmignore') file = '.gitignore'
        if (file.endsWith('.template')) file = file.replace('.template', '')

        const contents = mustache.render(
          fs.readFileSync(origFilePath, 'utf8'),
          templateValues,
          undefined,
          ['{{{', '}}}'],
        )

        const writePath = path.resolve(toPath, file)
        fs.writeFileSync(writePath, contents, 'utf8')
      } else if (stats.isDirectory()) {
        fs.mkdirSync(path.resolve(toPath, file))
        copyTemplate(
          path.resolve(`${fromPath}/${file}`),
          path.resolve(`${toPath}/${file}`),
          templateValues,
        )
      }
    })
  }

  return {
    ensureDir,
    writeFile,
    listFiles,
    remove,
    copy,
    copyTemplate,
    _fs: fs,
    _path: path,
    _url: url,
  }
}

export { FILE_MANAGER }
