import { CliSetupDetails } from '../_type_'
import { CliSetup } from './_type_'
import { resolveProgramDetails } from './resolve-program-details'

/**
 * Add/infer some required properties from the config object.
 */
export function RESOLVE_SETUP(config: CliSetup): CliSetupDetails {
  return {
    name: config.name ?? 'CLI',
    version: config.version ?? '0.0.0',
    description: config.description ?? '',
    programs: config.programs?.map(resolveProgramDetails) ?? [],
  }
}
