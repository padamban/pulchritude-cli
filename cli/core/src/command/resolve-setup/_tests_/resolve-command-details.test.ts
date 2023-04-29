import { CommandDetails } from '../../_type_'
import { CommandSetup } from '../_type_'
import { resolveCommandDetails } from '../resolve-command-details'

describe('resolveCommandDetails', () => {
  test('check default values', () => {
    const setup: CommandSetup = {
      id: 'myCmd',
      script: () => async () => {},
    }

    const resolved = resolveCommandDetails(setup)

    expect(resolved).toMatchObject<CommandDetails>({
      _type: 'command',
      id: 'myCmd',
      title: 'myCmd',
      alias: 'mc',
      name: 'my-cmd',
      description: '',
      script: setup.script,
      arguments: undefined,
      options: undefined,
    })
  })

  test('check given values', () => {
    const setup: CommandSetup = {
      id: 'myCmd',
      title: 'My Command Altered',
      alias: 'mca',
      name: 'my-cmd-alter',
      description: 'My Command Altered Include',
      script: () => async () => {},
    }

    const resolved = resolveCommandDetails(setup)

    expect(resolved).toMatchObject<CommandDetails>({
      _type: 'command',
      id: 'myCmd',
      title: 'My Command Altered',
      alias: 'mca',
      name: 'my-cmd-alter',
      description: 'My Command Altered Include',
      script: setup.script,
      arguments: undefined,
      options: undefined,
    })
  })

  test('resolves parameter arrays', () => {
    const setup: CommandSetup = {
      id: 'myCmd',
      script: () => async () => {},
      arguments: [{ id: 'myArg' }],
      options: [{ id: 'myOpt' }],
    }

    const resolved = resolveCommandDetails(setup)

    expect(resolved).toMatchObject<CommandDetails>({
      _type: 'command',
      id: 'myCmd',
      title: 'myCmd',
      alias: 'mc',
      name: 'my-cmd',
      description: '',
      script: setup.script,
      arguments: [
        {
          _type: 'argument',
          description: '',
          id: 'myArg',
          name: 'my-arg',
          title: 'myArg',
          type: undefined,
        },
      ],
      options: [
        {
          _type: 'option',
          alias: '-mo',
          description: '',
          id: 'myOpt',
          name: '--my-opt',
          title: 'myOpt',
          type: undefined,
        },
      ],
    })
  })
})
