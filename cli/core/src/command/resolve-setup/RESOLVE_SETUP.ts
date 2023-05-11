import { CliSetupDetails } from '../_type_'
import { ResolveSetupArgs } from './_type_'
import { resolveProgramDetails } from './resolve-program-details'

/**
 * Add/infer some required properties from the config object.
 * - allows us to provide a less verbose CLI config
 * - while most of the public config properties are optional,
 * internally they are required.
 * @example
 * const setup = RESOLVE_SETUP(config.value)
 */
export function RESOLVE_SETUP(args: ResolveSetupArgs): CliSetupDetails {
  const { rawSetup, packageVersion, theme } = args

  return {
    name: rawSetup?.name ?? 'CLI',
    packageVersion: packageVersion ?? 'unknown',
    version: rawSetup?.version ?? 'unknown',
    description: rawSetup?.description ?? '',
    programs: rawSetup?.programs?.map(resolveProgramDetails) ?? [],
    theme,
  }
}
