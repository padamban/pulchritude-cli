import prettier, { BuiltInParserName } from 'prettier'

interface Args {
  input: string
  parser: BuiltInParserName
  onError?: (err: string) => void
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
    onError?.(
      `ERROR in tryToFormatWithPrettier:\n\n${error}\n\nInput:\n${input}`,
    )
  }

  return input
}
