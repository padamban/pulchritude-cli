import { EOL } from 'os'

import { tryToFormatWithPrettier } from '../../../prettier'
import {
  ChainableRawWriter,
  RawFileContentBuilder,
  RawFileContentBuilderFactory,
} from './_type_'

/**
 * Has chainable utility functions for creating some file content.
 */
export const createRawFile: RawFileContentBuilderFactory = args => () => {
  const lines: string[] = []

  const options: RawFileContentBuilder = {
    write: addChainableOptions(lines),
    isEmpty: () => lines.length === 0,
    compileContent: async parser => {
      const content = lines.reduce((content, line) => content + line + EOL)
      if (parser) {
        return await tryToFormatWithPrettier({
          input: content,
          parser,
          onError: args?.onError,
        })
      }
      return content
    },
  }

  return options
}

/**
 * Create the chainable utility that adds lines to the input array.
 * @param lines Mutable array holding the content lines.
 */
const addChainableOptions = (lines: string[]) => {
  const options: ChainableRawWriter = {
    newLine: (nl = 1) => {
      if (nl > 0) lines.push(EOL.repeat(+nl - 1))
      return options
    },
    addLine: text => {
      lines.push(text)
      return options
    },
  }

  return options
}
