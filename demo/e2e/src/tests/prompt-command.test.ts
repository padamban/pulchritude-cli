import { getTerminal } from '../utils/terminal'

describe('CLI prompt', () => {
  describe('command selection', () => {
    test('shows program selector', async () => {
      const env = await getTerminal()

      await env.writeConfig('only-command-info')

      const { getStdout, terminate } = await env.spawnCli()

      const stdout = await getStdout()

      expect(stdout).includes(
        '? Select a program! › - Use arrow-keys. Return to submit.',
      )
      expect(stdout.at(-1)).to.equal('❯   Program - (p) Demo program')
      expect(stdout).not.includes(
        '? Select a Program command! › - Use arrow-keys. Return to submit.',
      )

      terminate()

      await env.cleanup()
    })

    test('select program and shows command selector', async () => {
      const env = await getTerminal()

      await env.writeConfig('only-command-info')

      const { getStdout, terminate, pressKey } = await env.spawnCli()

      await pressKey('enter')

      const stdout = await getStdout()

      expect(stdout).includes(
        '? Select a program! › - Use arrow-keys. Return to submit.',
      )
      expect(stdout).includes('❯   Program - (p) Demo program')
      expect(stdout).includes('✔ Select a program! › Program')
      expect(stdout).includes(
        '? Select a Program command! › - Use arrow-keys. Return to submit.',
      )
      expect(stdout.at(-1)).is.equal('❯   Command - (c) Demo command')
      expect(stdout).not.include('✔ Select a Program command! › Command')

      terminate()

      await env.cleanup()
    })

    test('selects program and command and skips parameter (empty) selector', async () => {
      const env = await getTerminal()

      await env.writeConfig('only-command-info')

      const { getStdout, pressKey, terminate, wait } = await env.spawnCli()

      await pressKey('enter')
      await wait(50)
      await pressKey('enter')
      await wait(50)

      let stdout = await getStdout()

      expect(stdout).includes(
        '? Select a program! › - Use arrow-keys. Return to submit.',
      )
      expect(stdout).includes('❯   Program - (p) Demo program')
      expect(stdout).includes('✔ Select a program! › Program')
      expect(stdout).includes(
        '? Select a Program command! › - Use arrow-keys. Return to submit.',
      )
      expect(stdout).include('❯   Command - (c) Demo command')
      expect(stdout).include('✔ Select a Program command! › Command')

      expect(stdout).include('Report files')
      expect(stdout).include('json     ./.cli-report/report.json')

      expect(stdout).include('Rerun terminal commands')
      expect(stdout).include('CLI program command -np')

      expect(await env.exists('./.cli-report/report.json')).to.equal(true)
      expect(await env.exists('./.cli-report/report.md')).to.equal(true)

      terminate()

      await env.cleanup()
    })
  })
})
