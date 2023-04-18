import { getTerminal, TerminalEnvironment } from '../utils/terminal'

describe('CLI help', () => {
  describe('not shown if the CLI setup has validation errors', () => {
    test('missing programs', async () => {
      const env = await getTerminal()

      await env.writeConfig('only-cli-info')

      const { code, stdout } = await env.executeCli(`--help`)

      expect(code).toBe(1)
      expect(stdout).includes('CLI SETUP ISSUES')
      expect(stdout).not.includes('DOCUMENTATION')
      expect(stdout).includes('Exiting due to setup validation errors...')

      await env.cleanup()
    })

    test('missing commands', async () => {
      const env = await getTerminal()

      await env.writeConfig('only-program-info')

      const { code, stdout } = await env.executeCli(`--help`)

      expect(code).toBe(1)
      expect(stdout).includes('CLI SETUP ISSUES')
      expect(stdout).not.includes('DOCUMENTATION')
      expect(stdout).includes('Exiting due to setup validation errors...')

      await env.cleanup()
    })
  })

  describe('shows general information', () => {
    let env: TerminalEnvironment | undefined
    let code: number
    let stdout: string[]

    beforeAll(async () => {
      env = await getTerminal()

      await env.writeConfig('only-command-info')

      const exe = await env.executeCli(`--help`)

      code = exe.code
      stdout = exe.stdout

      expect(code).toBe(0)
      expect(stdout).includes('DOCUMENTATION')
    })

    afterAll(async () => {
      await env?.cleanup()
    })

    test('shows the cli details', async () => {
      expect(stdout).includes('DETAILS')
      expect(stdout).includes('Tool name:    CLI')
      expect(stdout).includes('Description:  Minimal command setup')
      expect(stdout).includes('Version:      0.0.0')
    })

    test('shows the cli glossary and usage example', async () => {
      expect(stdout).includes('GLOSSARY')
      expect(stdout).includes('EXAMPLE')
    })

    test('shows the global options of the cli', async () => {
      expect(stdout).includes('GLOBAL OPTIONS')
      expect(
        stdout.find(line => line.startsWith('--no-prompt -np')),
      ).toBeDefined()
      expect(stdout.find(line => line.startsWith('--help -h'))).toBeDefined()
    })

    test('shows the configured programs and their commands', async () => {
      expect(stdout).includes('CONFIGURED PROGRAMS')
      expect(stdout).includes('program p       Demo program')
      expect(stdout).includes('command c     - Demo command')
    })

    test('shows quick help (cli level)', async () => {
      expect(stdout).includes('QUICK HELP')
      expect(stdout).includes('Usage: CLI [options] [command]')
      expect(stdout).includes('-v, --version  Version of the CLI tool.')
      expect(stdout).includes(
        '-h,   --help   Display help information for the current command.',
      )
    })
  })
  describe('can be invoked', () => {
    test('with option (--help) (cli level)', async () => {
      const env = await getTerminal()

      await env.writeConfig('only-command-info')

      const { code, stdout } = await env.executeCli(`-h`)

      expect(code).toBe(0)
      expect(stdout).includes('DOCUMENTATION')

      await env.cleanup()
    })

    test('with option alias (-h) (cli level)', async () => {
      const env = await getTerminal()

      await env.writeConfig('only-command-info')

      const { code, stdout } = await env.executeCli(`-h`)

      expect(code).toBe(0)
      expect(stdout).includes('DOCUMENTATION')
      expect(stdout).includes('Usage: CLI [options] [command]')

      await env.cleanup()
    })

    test('with option alias (-h) (program level)', async () => {
      const env = await getTerminal()

      await env.writeConfig('only-command-info')

      const { code, stdout } = await env.executeCli(`p -h`)

      expect(code).toBe(0)
      expect(stdout).includes('DOCUMENTATION')
      expect(stdout).includes('Usage: CLI program|p [options] [command]')

      await env.cleanup()
    })

    test('with option alias (-h) (command level)', async () => {
      const env = await getTerminal()

      await env.writeConfig('only-command-info')

      const { code, stdout } = await env.executeCli(`p c -h`)

      expect(code).toBe(0)
      expect(stdout).includes('DOCUMENTATION')
      expect(stdout).includes('Usage: CLI program command|c [options]')

      await env.cleanup()
    })
  })
})
