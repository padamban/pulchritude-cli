import { CliFileBuilders } from './_type_'
import { createRawFile } from './builders/raw/create-raw-file'
import { createTsFile } from './builders/ts/create-ts-file'

export const FILE_BUILDER: CliFileBuilders = props => ({
  ts: createTsFile(props),
  raw: createRawFile(props),
})
