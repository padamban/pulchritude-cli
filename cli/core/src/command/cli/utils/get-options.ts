interface GetPositionalArgs {
  rawArgs: any[]
}

function getOptions({ rawArgs }: GetPositionalArgs) {
  const [, options] = [...rawArgs].reverse()

  return options
}

export { getOptions }
