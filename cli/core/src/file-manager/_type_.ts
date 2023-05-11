import { GlobOptions } from 'glob'

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
}

/**
 * Create/read/list files.
 */
export type FileManager = (props: FileManagerArgs) => FileManagerInstance
