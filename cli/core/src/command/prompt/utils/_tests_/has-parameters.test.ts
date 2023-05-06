import { resolveCommandDetails } from '../../../resolve-setup/resolve-command-details'
import { hasParameters } from '../'

const createDemoCommand = ({
  hasArguments,
  hasOptions,
}: {
  hasArguments?: boolean
  hasOptions?: boolean
}) =>
  resolveCommandDetails({
    id: 'cmd',
    script: () => async () => {},
    arguments: hasArguments ? [{ id: 'arg' }] : undefined,
    options: hasOptions ? [{ id: 'opt' }] : undefined,
  })

describe('hasParameters', () => {
  test('no parameters', () => {
    const command = createDemoCommand({})
    const hasParams = hasParameters({ command })
    expect(hasParams).toBe(false)
  })

  test('has option, no argument', () => {
    const command = createDemoCommand({ hasOptions: true })
    const hasParams = hasParameters({ command })
    expect(hasParams).toBe(true)
  })

  test('no option, has argument', () => {
    const command = createDemoCommand({ hasArguments: true })
    const hasParams = hasParameters({ command })
    expect(hasParams).toBe(true)
  })

  test('has option, has argument', () => {
    const command = createDemoCommand({ hasArguments: true, hasOptions: true })
    const hasParams = hasParameters({ command })
    expect(hasParams).toBe(true)
  })
})
