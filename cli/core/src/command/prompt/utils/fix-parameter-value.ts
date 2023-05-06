import { ArgumentDetails, OptionDetails } from '../../_type_'

interface Args {
  parameter: OptionDetails | ArgumentDetails
  value: unknown
}

interface Retval {
  value: unknown
}

/**
 * Ensure that the parameter (argument or option) __value__ is of the correct type.
 */
function fixParameterValue(args: Args): Retval {
  const { parameter, value } = args
  const { type, choices } = parameter

  let newValue = value

  if (Array.isArray(value)) {
    newValue = value.map(v => {
      return fixParameterValue({ parameter, value: v }).value
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
  } else if (!Array.isArray(value) && !!choices?.length) {
    if (choices.find(c => c.value === value)) {
      newValue = value
    } else if (choices.find(c => c.value === Number(value))) {
      newValue = Number(value)
    } else {
      newValue = undefined
    }
  }

  return {
    value: newValue,
  }
}

export { fixParameterValue }
