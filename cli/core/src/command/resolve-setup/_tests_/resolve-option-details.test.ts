import { OptionDetails } from '../../_type_'
import { resolveOptionDetails } from '../resolve-option-details'

describe('resolveOptionDetails', () => {
  test('check default values', () => {
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

  test('check given values', () => {
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
