import { OptionDetails } from '../../_type_'
import { resolveOptionDetails } from '../resolve-option-details'

describe('resolveOptionDetails', () => {
  test('provided only: id', () => {
    const resolved = resolveOptionDetails({ id: 'myOption' })

    expect(resolved).toMatchObject<OptionDetails>({
      _type: 'option',
      id: 'myOption',
      title: 'myOption',
      alias: '-mo',
      name: '--my-option',
      description: '',
      type: undefined,
    })
  })

  test('provided required properties of the detail object', () => {
    const resolved = resolveOptionDetails({
      id: 'myOption',
      title: 'My Option',
      alias: '-moa',
      name: '--my-option-altered',
      description: 'My option description',
      type: 'string',
    })

    expect(resolved).toMatchObject<OptionDetails>({
      _type: 'option',
      id: 'myOption',
      title: 'My Option',
      alias: '-moa',
      name: '--my-option-altered',
      description: 'My option description',
      type: 'string',
    })
  })
})
