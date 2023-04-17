import { getTerminal } from '../utils/terminal'

describe('CLI setup validator', () => {
  test(
    'shows error if the cli has no programs',
    async () => {
      const env = await getTerminal()

      await env.writeConfig('only-cli-info')

      const { code, stdout } = await env.executeCli()

      expect(code).toBe(1)
      expect(stdout).includes('CLI SETUP ISSUES')
      expect(stdout).includes('ERROR - The CLI has no programs.')
      expect(stdout).includes('Exiting due to setup validation errors...')

      await env.cleanup()
    },
    { timeout: 20000 },
  )

  // test('shows error if the cli programs has no command', async () => {
  //   const env = await getTerminal()

  //   await env.writeConfig('only-program-info')

  //   const { code, stdout } = await env.executeCli()

  //   expect(code).toBe(1)
  //   expect(stdout).includes('CLI SETUP ISSUES')
  //   expect(stdout).includes(
  //     'ERROR - The CLI program (Program) has no commands.',
  //   )
  //   expect(stdout).includes('Exiting due to setup validation errors...')

  //   await env.cleanup()
  // })

  // test('does not show error if the cli program command has no parameters', async () => {
  //   const env = await getTerminal()

  //   await env.writeConfig('only-command-info')

  //   const { code, stdout } = await env.executeCli('--help')

  //   expect(code).toBe(0)
  //   expect(stdout).not.includes('CLI SETUP ISSUES')

  //   await env.cleanup()
  // })

  // test(`parameter validation passed`, async () => {
  //   const env = await getTerminal()

  //   await env.writeConfig('valid-params')

  //   const { code, stdout } = await env.executeCli(`--help`)

  //   expect(code).toBe(0)
  //   expect(stdout).not.includes('CLI SETUP ISSUES')

  //   await env?.cleanup()
  // })

  // describe('parameter validation found issues', () => {
  //   let env: TerminalEnvironment | undefined
  //   let code: number
  //   let stdout: string[]

  //   beforeAll(async () => {
  //     env = await getTerminal()

  //     await env.writeConfig('invalid-params')

  //     const exe = await env.executeCli(`--help`)

  //     code = exe.code
  //     stdout = exe.stdout

  //     expect(code).toBe(1)
  //     expect(stdout).includes('CLI SETUP ISSUES')
  //   })

  //   afterAll(async () => {
  //     await env?.cleanup()
  //   })

  //   test('required arguments must be at the front', async () => {
  //     expect(stdout).includes(
  //       'ERROR - The required arguments must be at the front.',
  //     )
  //     expect(stdout).includes('> It happened at: program.command')
  //   })

  //   test('variadic argument must be at the end', async () => {
  //     expect(stdout).includes('ERROR - Only the last argument can be variadic.')
  //     expect(stdout).includes('> It happened at: program.command')
  //   })

  //   test(`argument choice shouldn't have type`, async () => {
  //     expect(stdout).includes(
  //       `WARN - The argument's type property is not needed with choices array.`,
  //     )
  //     expect(stdout).includes('> It happened at: program.command.arg2')
  //   })

  //   test(`option choice shouldn't have type`, async () => {
  //     expect(stdout).includes(
  //       `WARN - The option's type property is not needed with choices array.`,
  //     )
  //     expect(stdout).includes('> It happened at: program.command.opt2')
  //   })
  // })
})
