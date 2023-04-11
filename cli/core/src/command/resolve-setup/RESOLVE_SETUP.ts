import { CliSetupDetails } from '../_type_'
import { CliSetup } from './_type_'
import { resolveProgramDetails } from './resolve-program-details'

/**
 * Add/infer some required properties from the config object.
 * - allows us to provide a less verbose CLI config
 * - while most of the public config properties are optional,
 *   internally they are required
 *
 * @example
 * const setup = RESOLVE_SETUP(config.value)
 */
export function RESOLVE_SETUP(config: CliSetup): CliSetupDetails {
  return {
    name: config.name ?? 'CLI',
    version: config.version ?? '0.0.0',
    description: config.description ?? '',
    programs: config.programs?.map(resolveProgramDetails) ?? [],
  }
}
