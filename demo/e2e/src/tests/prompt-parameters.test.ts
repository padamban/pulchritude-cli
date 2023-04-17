import { getTerminal } from '../utils/terminal'

describe.skip('CLI prompt', () => {
  describe('arguments', () => {
    test('specify argument values, check values', async () => {
      const env = await getTerminal()

      await env.writeConfig('argument-params')

      const { getStdout, wait, writeText, pressKey } = await env.spawnCli('p c')

      let stdout = await getStdout()

      expect(stdout).includes('Selected program:    Program')
      expect(stdout).includes('Selected command(s): Command')
      expect(stdout).includes('Command parameters')
      expect(stdout).includes('?  - argument - arg1 (number) ›')

      await writeText('777')
      await wait(100)
      await pressKey('enter')
      await wait(100)

      stdout = await getStdout()

      expect(stdout).includes('✔  - argument - arg1 (number) … 777')
      expect(stdout).includes(
        '?  - argument - arg2 (choice) › - Use arrow-keys. Return to submit.',
      )

      await pressKey('arrowDown')
      await pressKey('enter')

      stdout = await getStdout()

      expect(stdout).includes('✔  - argument - arg2 (choice) › Arg B')
      expect(stdout).includes('?  - argument - arg3 (number list) ›')

      await writeText('234,435,343')
      await wait(100)
      await pressKey('enter')
      await wait(1000)

      stdout = await getStdout()

      expect(stdout).includes(
        '✔  - argument - arg3 (number list) … 234,435,343',
      )
      expect(stdout).includes('CLI program command 777 B 234 435 343 -np')

      const report = await env.readReport()
      const args = report?.sections[0]?.arguments ?? {}
      const opts = report?.sections[0]?.options ?? {}

      expect(args.arg1).to.equal(777)
      expect(args.arg2).to.equal('B')
      expect(args.arg3).to.deep.equal([234, 435, 343])
      expect(opts.prompt).to.equal(true)

      await env.cleanup()
    })

    test('skip argument values, check default values', async () => {
      const env = await getTerminal()

      await env.writeConfig('argument-params')

      const { getStdout, wait, pressKey } = await env.spawnCli('p c')

      let stdout = await getStdout()

      expect(stdout).includes('Selected program:    Program')
      expect(stdout).includes('Selected command(s): Command')
      expect(stdout).includes('Command parameters')
      expect(stdout).includes('?  - argument - arg1 (number) ›')

      await pressKey('enter')

      stdout = await getStdout()

      expect(stdout).includes('✔  - argument - arg1 (number) …')
      expect(stdout).includes(
        '?  - argument - arg2 (choice) › - Use arrow-keys. Return to submit.',
      )

      await pressKey('enter')

      stdout = await getStdout()

      expect(stdout).includes('✔  - argument - arg2 (choice) › Arg A')
      expect(stdout).includes('?  - argument - arg3 (number list) ›')

      await pressKey('enter')
      await wait(1000)

      stdout = await getStdout()

      expect(stdout).includes('✔  - argument - arg3 (number list) …')
      expect(stdout).includes('CLI program command 0 A 0 -np')

      const report = await env.readReport()
      const args = report?.sections[0]?.arguments ?? {}
      const opts = report?.sections[0]?.options ?? {}

      expect(args.arg1).to.equal(0)
      expect(args.arg2).to.equal('A')
      expect(args.arg3).to.deep.equal([0])
      expect(opts.prompt).to.equal(true)

      await env.cleanup()
    })
  })

  describe('options', () => {
    test('specify option values, check values', async () => {
      const env = await getTerminal()

      await env.writeConfig('option-params')

      const { getStdout, wait, writeText, pressKey } = await env.spawnCli('p c')

      let stdout = await getStdout()

      expect(stdout).includes('Selected program:    Program')
      expect(stdout).includes('Selected command(s): Command')
      expect(stdout).includes('Command parameters')
      expect(stdout).includes('?  - Select options that need specifying! ›')

      await writeText('a')
      await wait(100)
      await pressKey('enter')
      await wait(100)

      stdout = await getStdout()

      expect(stdout).includes(
        '✔  - Select options that need specifying! › opt1, opt2',
      )
      expect(stdout).includes('?  - option - opt1 (number list) ›')

      await writeText('34,45')
      await wait(100)
      await pressKey('enter')

      stdout = await getStdout()

      expect(stdout).includes('✔  - option - opt1 (number list) … 34,45')
      expect(stdout).includes(
        '?  - option - opt2 (undefined) › - Use arrow-keys. Return to submit.',
      )

      await pressKey('enter')
      await wait(100)

      stdout = await getStdout()

      expect(stdout).includes('✔  - option - opt2 (undefined) › Opt A')
      expect(stdout).includes('CLI program command --opt1 34,45 --opt2 A -np')

      const report = await env.readReport()
      const args = report?.sections[0]?.arguments ?? {}
      const opts = report?.sections[0]?.options ?? {}

      expect(opts.prompt).to.equal(true)
      expect(opts.opt1).to.deep.equal([34, 45])
      expect(opts.opt2).to.equal('A')
      expect(args).to.deep.equal({})

      await env.cleanup()
    })
  })
})
