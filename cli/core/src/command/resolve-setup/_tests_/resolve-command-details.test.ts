import { CommandDetails } from '../../_type_'
import { resolveCommandDetails } from '../resolve-command-details'

describe('resolveCommandDetails', () => {
  test('provided only: id, script', () => {
    const setup = {
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

  // test('provided required properties of the details', () => {
  //   const resolved = resolveOptionDetails({
  //     id: 'myOption',
  //     title: 'My Option',
  //     alias: '-moa',
  //     name: '--my-option-altered',
  //     description: 'My option description',
  //     type: 'string',
  //   })

  //   expect(resolved).toMatchObject<OptionDetails>({
  //     _type: 'option',
  //     id: 'myOption',
  //     title: 'My Option',
  //     alias: '-moa',
  //     name: '--my-option-altered',
  //     description: 'My option description',
  //     type: 'string',
  //   })
  // })
})
