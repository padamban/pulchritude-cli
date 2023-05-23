import fs from 'fs'
import { GlobOptions } from 'glob'
import { PlatformPath } from 'path'
import url from 'url'

import { Obj } from '../utils'

/**
 * Arguments of the file CRUD utility.
 */
export interface FileManagerArgs {
  /**
   * Current working directory.
   */
  cwd: string
}

/**
 * Options for the file lister.
 */
export type ListOptions = Pick<GlobOptions, 'ignore'>

/**
 *
 */
export interface FileManagerInstance {
  /**
   * Create a file.
   */
  writeFile: (filePath: string | undefined, content: string) => void

  /**
   * Checks if the directory exists.
   */
  ensureDir: (dirPath: string) => void

  /**
   * List files using a glob pattern.
   */
  listFiles: (pattern: string, options: ListOptions) => string[]

  /**
   * Remove a file or directory.
   */
  remove: (path: string) => void

  /**
   * Copy a file or directory.
   */
  copy: (fromPath: string, toPath: string) => void

  /**
   * Copy template directory.
   */
  copyTemplate: (fromPath: string, toPath: string, templateValues: Obj) => void

  /**
   * Same as `require('fs')`.
   */
  _fs: typeof fs

  /**
   * Same as `require('path')`.
   */
  _path: PlatformPath

  /**
   * Same as `require('url')`.
   */
  _url: typeof url
}

/**
 * Create/read/list files.
 */
export type FileManager = (props: FileManagerArgs) => FileManagerInstance
