import { getTerminal } from '../utils/terminal'

describe('Resolve CLI command', () => {
  describe('options', () => {
    test('provide every option + no prompt flag', async () => {
      const env = await getTerminal()

      await env.writeConfig('option-params')

      const { terminate } = await env.spawnCli(
        'program command --opt1 34,45 --opt2 A -np',
      )

      const report = await env.readReport()
      const args = report?.sections[0]?.arguments ?? {}
      const opts = report?.sections[0]?.options ?? {}

      expect(opts.prompt).to.equal(false)
      expect(opts.opt1).to.deep.equal([34, 45])
      expect(opts.opt2).to.equal('A')
      expect(args).to.deep.equal({})

      terminate()

      await env.cleanup()
    })

    test('provide every option', async () => {
      const env = await getTerminal()

      await env.writeConfig('option-params')

      const { terminate } = await env.spawnCli(
        'program command --opt1 34,45 --opt2 A',
      )

      const report = await env.readReport()
      const args = report?.sections[0]?.arguments ?? {}
      const opts = report?.sections[0]?.options ?? {}

      expect(opts.prompt).to.equal(true)
      expect(opts.opt1).to.deep.equal([34, 45])
      expect(opts.opt2).to.equal('A')
      expect(args).to.deep.equal({})

      terminate()

      await env.cleanup()
    })

    test('provide first option, prompt second', async () => {
      const env = await getTerminal()

      await env.writeConfig('option-params')

      const { getStdout, terminate, pressKey, wait } = await env.spawnCli(
        'program command --opt1 34,45',
      )

      const stdout = await getStdout()

      expect(stdout).includes('Command parameters')
      expect(stdout).includes('Specified option:    opt1 = 34,45')
      expect(stdout).includes('?  - Select options that need specifying! ›')
      expect(stdout).includes('◯   opt2 - Option 2')

      await pressKey('enter')
      await wait(1000)

      const report = await env.readReport()
      const args = report?.sections[0]?.arguments ?? {}
      const opts = report?.sections[0]?.options ?? {}

      expect(opts.prompt).to.equal(true)
      expect(opts.opt1).to.deep.equal([34, 45])
      expect(opts.opt2).to.equal(undefined)
      expect(args).to.deep.equal({})

      terminate()

      await env.cleanup()
    })

    test('provide second option, prompt first', async () => {
      const env = await getTerminal()

      await env.writeConfig('option-params')

      const { getStdout, terminate, pressKey, wait } = await env.spawnCli(
        'program command --opt2 B',
      )

      const stdout = await getStdout()

      expect(stdout).includes('Command parameters')
      expect(stdout).includes('Specified option:    opt2 = B')
      expect(stdout).includes('?  - Select options that need specifying! ›')
      expect(stdout).includes('◯   opt1 - Option 1')

      await pressKey('enter')
      await wait(1000)

      const report = await env.readReport()
      const args = report?.sections[0]?.arguments ?? {}
      const opts = report?.sections[0]?.options ?? {}

      expect(opts.prompt).to.equal(true)
      expect(opts.opt1).to.equal(undefined)
      expect(opts.opt2).to.equal('B')
      expect(args).to.deep.equal({})

      terminate()

      await env.cleanup()
    })
  })
})
