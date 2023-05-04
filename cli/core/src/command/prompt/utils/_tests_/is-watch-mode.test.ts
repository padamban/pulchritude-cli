import { resolveCommandDetails } from '../../../resolve-setup/resolve-command-details'
import { isWatchMode } from '../'

const createDemoCommand = ({ watchMode }: { watchMode: boolean }) =>
  resolveCommandDetails({
    id: 'cmd',
    script: () => async () => {},
    options: watchMode ? [{ id: 'watch', watchMode }] : [],
  })

describe('isWatchMode', () => {
  test('not watchable command, no watch flag', () => {
    const command = createDemoCommand({ watchMode: false })
    const watchMode = isWatchMode({ command, options: {} })
    expect(watchMode).toBe(false)
  })

  test('watchable command, no watch flag', () => {
    const command = createDemoCommand({ watchMode: true })
    const watchMode = isWatchMode({ command, options: {} })
    expect(watchMode).toBe(false)
  })

  test('not watchable command, watch flag', () => {
    const command = createDemoCommand({ watchMode: false })
    const watchMode = isWatchMode({ command, options: { watch: true } })
    expect(watchMode).toBe(false)
  })

  test('watchable command, watch flag', () => {
    const command = createDemoCommand({ watchMode: true })
    const watchMode = isWatchMode({ command, options: { watch: true } })
    expect(watchMode).toBe(true)
  })
})
