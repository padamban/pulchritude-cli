import { GlobOptions } from 'glob'

export interface FileManagerArgs {
  cwd: string
}

export type ListOptions = Pick<GlobOptions, 'ignore'>

export interface FileManagerInstance {
  writeFile: (filePath: string | undefined, content: string) => void
  ensureDir: (dirPath: string) => void
  listFiles: (pattern: string, options: ListOptions) => string[]
}

/**
 * Create/read/list files.
 */
export type FileManager = (props: FileManagerArgs) => FileManagerInstance
