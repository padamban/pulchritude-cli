import { ArgumentDetails } from '../../_type_'
import { resolveArgumentDetails } from '../resolve-argument-details'

describe('resolveArgumentDetails', () => {
  test('check default values', () => {
    const resolved = resolveArgumentDetails({ id: 'myArgument' })

    expect(resolved).toMatchObject<ArgumentDetails>({
      _type: 'argument',
      id: 'myArgument',
      title: 'myArgument',
      name: 'my-argument',
      description: '',
      type: undefined,
    })
  })

  test('check given values', () => {
    const resolved = resolveArgumentDetails({
      id: 'myArgument',
      title: 'My Argument',
      name: 'my-argument-altered',
      description: 'My argument description',
      type: 'string',
    })

    expect(resolved).toMatchObject<ArgumentDetails>({
      _type: 'argument',
      id: 'myArgument',
      title: 'My Argument',
      name: 'my-argument-altered',
      description: 'My argument description',
      type: 'string',
    })
  })
})
