import { CliSetupDetails } from '../../_type_'
import { ResolveSetupArgs } from '../_type_'
import { RESOLVE_SETUP } from '../RESOLVE_SETUP'

describe('RESOLVE_SETUP', () => {
  test('check default values', () => {
    const setup: ResolveSetupArgs = { rawSetup: {} }

    const resolved = RESOLVE_SETUP(setup)

    expect(resolved).toMatchObject<CliSetupDetails>({
      name: 'CLI',
      programs: [],
      version: 'unknown',
      packageVersion: 'unknown',
      description: '',
    })
  })

  test('check given values', () => {
    const setup: ResolveSetupArgs = {
      rawSetup: {
        name: 'MyCLI',
        description: 'My CLI',
        version: '0.0.0',
        programs: [],
      },
    }

    const resolved = RESOLVE_SETUP(setup)

    expect(resolved).toMatchObject<CliSetupDetails>({
      name: 'MyCLI',
      description: 'My CLI',
      version: '0.0.0',
      programs: [],
      packageVersion: 'unknown',
    })
  })

  test('resolves program array', () => {
    const setup: ResolveSetupArgs = {
      rawSetup: { programs: [{ id: 'myProgram', commands: [] }] },
    }

    const resolved = RESOLVE_SETUP(setup)

    expect(resolved).toMatchObject<CliSetupDetails>({
      name: 'CLI',
      version: 'unknown',
      packageVersion: 'unknown',
      description: '',
      programs: [
        {
          _type: 'program',
          alias: 'mp',
          commands: [],
          description: '',
          id: 'myProgram',
          isMultiCommand: undefined,
          name: 'my-program',
          title: 'myProgram',
        },
      ],
    })
  })
})
