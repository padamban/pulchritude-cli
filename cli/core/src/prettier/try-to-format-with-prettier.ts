import prettier from 'prettier'

import { LogError } from '../error'

interface Args {
  input: string
  parser: 'typescript' | 'markdown' | 'mdx' | 'json' | 'scss'
  onError?: LogError
}

/**
 * Try to format with prettier, but fall back to input if failed.
 */
export const tryToFormatWithPrettier = async (args: Args) => {
  const { input, parser, onError } = args

  try {
    const config = await prettier.resolveConfig(process.cwd(), {
      editorconfig: true,
    })

    return prettier.format(input, { ...config, parser })
  } catch (error) {
    onError?.({
      type: 'error',
      issue: 'Failed to format with prettier.',
      location: 'tryToFormatWithPrettier',
      error: String(error),
      payload: input,
      recommendation: 'Check if the content is syntactically correct.',
    })
  }

  return input
}
