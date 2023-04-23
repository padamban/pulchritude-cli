import { getTerminal } from '../utils/terminal'

describe.skip('Use JS config file', () => {
  test('load minimal config', async () => {
    const env = await getTerminal()

    await env.writeConfig('js-based')

    const { getStdout, terminate } = await env.spawnCli('program command -h')

    const stdout = await getStdout()

    expect(stdout).includes('Description:  Javascript based config')

    terminate()

    await env.cleanup()
  })
})
