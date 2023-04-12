interface GetPositionalArgs {
  rawArgs: any[]
}

/**
 * Get the options from the raw argument.
 */
function getOptions({ rawArgs }: GetPositionalArgs) {
  const [, options] = [...rawArgs].reverse()

  return options
}

export { getOptions }
