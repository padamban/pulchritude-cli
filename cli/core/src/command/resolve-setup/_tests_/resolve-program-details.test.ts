import { ProgramDetails } from '../../_type_'
import { ProgramSetup } from '../_type_'
import { resolveProgramDetails } from '../resolve-program-details'

describe('resolveProgramDetails', () => {
  test('check default values', () => {
    const setup: ProgramSetup = {
      id: 'myProgram',
      commands: [],
    }

    const resolved = resolveProgramDetails(setup)

    expect(resolved).toMatchObject<ProgramDetails>({
      _type: 'program',
      id: 'myProgram',
      title: 'myProgram',
      alias: 'mp',
      name: 'my-program',
      description: '',
      isMultiCommand: undefined,
      commands: [],
    })
  })

  test('check given values', () => {
    const setup: ProgramSetup = {
      id: 'myProgram',
      title: 'My Program',
      alias: 'mpa',
      name: 'my-program-alter',
      description: 'My Program Description',
      isMultiCommand: true,
      commands: [],
    }

    const resolved = resolveProgramDetails(setup)

    expect(resolved).toMatchObject<ProgramDetails>({
      _type: 'program',
      id: 'myProgram',
      title: 'My Program',
      alias: 'mpa',
      name: 'my-program-alter',
      description: 'My Program Description',
      isMultiCommand: true,
      commands: [],
    })
  })

  test('resolves commands array', () => {
    const setup: ProgramSetup = {
      id: 'myProgram',
      commands: [{ id: 'myCmd', script: () => async () => {} }],
    }

    const resolved = resolveProgramDetails(setup)

    expect(resolved).toMatchObject<ProgramDetails>({
      _type: 'program',
      id: 'myProgram',
      title: 'myProgram',
      alias: 'mp',
      name: 'my-program',
      description: '',
      isMultiCommand: undefined,
      commands: [
        {
          _type: 'command',
          id: 'myCmd',
          title: 'myCmd',
          name: 'my-cmd',
          alias: 'mc',
          description: '',
          arguments: undefined,
          options: undefined,
          script: setup.commands.at(0)!.script,
        },
      ],
    })
  })
})
