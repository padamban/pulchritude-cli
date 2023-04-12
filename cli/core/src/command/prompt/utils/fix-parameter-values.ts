import { Obj } from '../../../utils'
import { CommandDetails } from '../../_type_'
import { fixParameterValue } from './fix-parameter-value'

interface Args {
  command: CommandDetails | undefined
  argumentValues: Obj
  optionValues: Obj
}

interface Retval {
  argumentValues: Obj
  optionValues: Obj
}

/**
 * Ensure that the parameter (argument or option) __values__ are of the correct type.
 */
function fixParameterValues(args: Args): Retval {
  const { command, argumentValues, optionValues } = args

  let fixedArgumentValues = argumentValues
  let fixedOptionValues = optionValues

  Object.entries(argumentValues).forEach(([id, value]) => {
    const argument = command?.arguments?.find(arg => arg.id === id)

    if (argument) {
      fixedArgumentValues[id] = fixParameterValue({
        parameter: argument,
        value,
      }).value
    }
  })

  Object.entries(optionValues).forEach(([id, value]) => {
    const option = command?.options?.find(opt => opt.id === id)

    if (option) {
      fixedOptionValues[id] = fixParameterValue({
        parameter: option,
        value,
      }).value
    }
  })

  return {
    argumentValues: fixedArgumentValues,
    optionValues: fixedOptionValues,
  }
}

export { fixParameterValues }
