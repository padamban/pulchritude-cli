import { MOCK_THEME } from '../../../theme/theme.mock'
import { CliSetupDetails } from '../../_type_'
import { ResolveSetupArgs } from '../_type_'
import { RESOLVE_SETUP } from '../RESOLVE_SETUP'

const theme = MOCK_THEME

describe('RESOLVE_SETUP', () => {
  test('check default values', () => {
    const setup: ResolveSetupArgs = { rawSetup: {}, theme }

    const resolved = RESOLVE_SETUP(setup)

    expect(resolved).toMatchObject<CliSetupDetails>({
      name: 'CLI',
      programs: [],
      version: 'unknown',
      packageVersion: 'unknown',
      description: '',
      theme,
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
      theme,
    }

    const resolved = RESOLVE_SETUP(setup)

    expect(resolved).toMatchObject<CliSetupDetails>({
      name: 'MyCLI',
      description: 'My CLI',
      version: '0.0.0',
      programs: [],
      packageVersion: 'unknown',
      theme,
    })
  })

  test('resolves program array', () => {
    const setup: ResolveSetupArgs = {
      rawSetup: { programs: [{ id: 'myProgram', commands: [] }] },
      theme,
    }

    const resolved = RESOLVE_SETUP(setup)

    expect(resolved).toMatchObject<CliSetupDetails>({
      name: 'CLI',
      version: 'unknown',
      packageVersion: 'unknown',
      description: '',
      theme,
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
