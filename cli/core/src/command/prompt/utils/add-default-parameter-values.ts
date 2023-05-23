import { Obj } from '../../../utils'
import { CommandDetails } from '../../_type_'

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
 * Add the parameter with the default value, if the values are not defined.
 */
function addDefaultParameterValues(args: Args): Retval {
  const { command, argumentValues, optionValues } = args

  let fixedArgumentValues = { ...argumentValues }
  let fixedOptionValues = { ...optionValues }

  command?.options?.forEach(({ id, defaultValue }) => {
    if (defaultValue !== undefined && fixedOptionValues[id] === undefined) {
      fixedOptionValues[id] = defaultValue
    }
  })

  command?.arguments?.forEach(({ id, defaultValue }) => {
    if (defaultValue !== undefined && fixedOptionValues[id] === undefined) {
      fixedArgumentValues[id] = defaultValue
    }
  })

  return {
    argumentValues: fixedArgumentValues,
    optionValues: fixedOptionValues,
  }
}

export { addDefaultParameterValues }
