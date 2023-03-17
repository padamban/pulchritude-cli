import { IOptions } from 'glob'

export interface CliFileManagerProps {
  cwd: string
}

type ListOptions = Pick<IOptions, 'ignore'>

export type CliFileManager = (props: CliFileManagerProps) => {
  writeFile: (filePath: string | undefined, content: string) => void
  ensureDir: (dirPath: string) => void
  listFiles: (pattern: string, options: ListOptions) => string[]
}
