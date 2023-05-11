import { FileBuilders } from './_type_'
import { createRawFile } from './builders/raw/create-raw-file'
import { createTsFile } from './builders/ts/create-ts-file'

/**
 * Creates a singleton that helps to create file content.
 */
const FILE_BUILDER: FileBuilders = props => ({
  raw: createRawFile(props),
  ts: createTsFile(props),
})

export { FILE_BUILDER }
