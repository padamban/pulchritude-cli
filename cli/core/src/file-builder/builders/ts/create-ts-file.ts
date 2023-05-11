/* eslint-disable no-console */
import { EOL } from 'os'

import { tryToFormatWithPrettier } from '../../../prettier'
import {
  ChainableTsWriter,
  TsFileContentBuilder,
  TsFileContentBuilderFactory,
} from './_type_'

/**
 * Has chainable utility functions for creating typescript file content.
 * @example
 * const file = createTsFile({})()
 *
 * file.write.
 *   .addDoNotEditWarning()
 *   .addDisableLinter()
 */
export const createTsFile: TsFileContentBuilderFactory = args => () => {
  const { onError } = args ?? {}

  const lines: string[] = []

  const options: TsFileContentBuilder = {
    write: addChainableOptions(lines),
    isEmpty: () => lines.length === 0,
    compileContent: async () => {
      try {
        const text = lines.reduce((content, line) => content + line + EOL)

        const formattedContent = await tryToFormatWithPrettier({
          input: text,
          parser: 'typescript',
          onError,
        })

        return formattedContent
      } catch (error) {
        onError?.({
          type: 'error',
          location: 'createTsFile',
          issue: 'Failed to create TS file.',
          error: String(error),
        })
      }

      return ''
    },
  }

  return options
}

/**
 * Create the chainable utility.
 */
function addChainableOptions(lines: string[]) {
  const options: ChainableTsWriter = {
    addDisableLinter: () => {
      lines.unshift(`/* eslint-disable */${EOL}`)
      return options
    },
    addDoNotEditWarning: () => {
      lines.unshift(`// GENERATED FILE - DO NOT EDIT IT MANUALLY${EOL}`)
      return options
    },
    addDocComment: commentLines => {
      lines.push(
        '/**',
        ' * GENERATED',
        ' *',
        ...(Array.isArray(commentLines) ? commentLines : [commentLines]).map(
          cl => ' * ' + cl,
        ),
        ' */',
      )
      return options
    },
    addCommentTitle: comment => {
      lines.push('// ## ' + comment + ' ' + '#'.repeat(50 - comment.length))
      return options
    },
    addComment: comment => {
      lines.push('// ' + comment)
      return options
    },
    addCommentBullet: comment => {
      lines.push('//  • ' + comment)
      return options
    },
    addCommentHeader: comment => {
      if (typeof comment === 'string')
        lines.unshift(
          '// ##' + '#'.repeat(comment.length + 4) + '##',
          '// ##  ' + comment + '  ##',
          '// ##' + '#'.repeat(comment.length + 4) + `##${EOL}`,
        )
      return options
    },

    addInterface: interfaceName => {
      lines.push(`export interface ${interfaceName} {`)
      return options
    },
    addType: typeName => {
      lines.push(`export type ${typeName} = {`)
      return options
    },
    addClosingBrace: () => {
      lines.push('}')
      return options
    },
    addLines: newLines => {
      lines.push(...newLines)
      return options
    },
    addLine: newLine => {
      lines.push(newLine)
      return options
    },
    newLine: (nl = 1) => {
      if (nl > 0) lines.push(EOL.repeat(+nl - 1))
      return options
    },
  }

  return options
}
