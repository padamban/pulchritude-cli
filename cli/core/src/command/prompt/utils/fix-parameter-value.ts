import { ResolvedArgumentDetails, ResolvedOptionDetails } from '../../_type_'

interface Args {
  parameterDetails: ResolvedOptionDetails | ResolvedArgumentDetails
  value: unknown
}

interface Retval {
  value: unknown
}

function fixParameterValue(args: Args): Retval {
  const { parameterDetails, value } = args
  const { type, choices } = parameterDetails

  let newValue = value

  if (Array.isArray(value)) {
    newValue = value.map(v => {
      return fixParameterValue({ parameterDetails, value: v }).value
    })
  }

  if (!Array.isArray(value) && !choices?.length) {
    if (type === 'number' && typeof value !== 'number') {
      newValue = Number(value)
    }

    if (type === 'string' && typeof value !== 'string') {
      newValue = String(value)
    }

    if (type === 'boolean' && typeof value !== 'boolean') {
      newValue = Boolean(value)
    }
  }

  return {
    value: newValue,
  }
}

export { fixParameterValue }
