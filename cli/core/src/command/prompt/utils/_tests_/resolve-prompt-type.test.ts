import { resolvePromptType } from '../'

describe('resolvePromptType', () => {
  test('text', () => {
    const types = [
      resolvePromptType({}),
      resolvePromptType({ variadic: true }),
      resolvePromptType({ variadic: true, choices: [] }),
      resolvePromptType({ choices: [] }),
      resolvePromptType({ type: 'string' }),
    ]
    expect(types).toMatchObject(Array(types.length).fill('text'))
  })

  test('number', () => {
    const types = [resolvePromptType({ type: 'number' })]
    expect(types).toMatchObject(Array(types.length).fill('number'))
  })

  test('toggle', () => {
    const types = [resolvePromptType({ type: 'boolean' })]
    expect(types).toMatchObject(Array(types.length).fill('toggle'))
  })

  test('select', () => {
    const types = [
      resolvePromptType({ choices: [{}] }),
      resolvePromptType({ choices: [{}], type: 'boolean' }),
      resolvePromptType({ choices: [{}], type: 'string' }),
      resolvePromptType({ choices: [{}], type: 'number' }),
    ]
    expect(types).toMatchObject(Array(types.length).fill('select'))
  })

  test('multiselect', () => {
    const types = [
      resolvePromptType({ variadic: true, choices: [{}] }),
      resolvePromptType({ variadic: true, choices: [{}], type: 'boolean' }),
      resolvePromptType({ variadic: true, choices: [{}], type: 'string' }),
      resolvePromptType({ variadic: true, choices: [{}], type: 'number' }),
    ]
    expect(types).toMatchObject(Array(types.length).fill('multiselect'))
  })
})
