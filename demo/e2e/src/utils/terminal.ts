import { prepareEnvironment } from '@gmrchk/cli-testing-library'
import { ExecResult } from '@gmrchk/cli-testing-library/lib/createExecute'
import {
  CLITestEnvironment,
  SpawnResult,
} from '@gmrchk/cli-testing-library/lib/types'
import { Report } from '@pulchritude-cli/cli'
import path from 'path'

import { ConfigName, getConfigContents } from './get-config-contents'

const LOG = (..._args: any) => {
  // eslint-disable-next-line no-console
  // console.log(..._args)
}

const CLI = path.join(__dirname, '..', 'run.ts')

const CONFIG = getConfigContents({
  configFolder: path.join(__dirname, '..', 'configs'),
})

type TerminalSpawnResult = Omit<SpawnResult, 'getStdout'> & {
  terminate: () => void
  getStdout: () => Promise<string[]>
}

type TerminalSpawn = (
  ...params: Parameters<CLITestEnvironment['spawn']>
) => Promise<TerminalSpawnResult>

type TerminalCliSpawn = (params?: string) => Promise<TerminalSpawnResult>
type TerminalCliExecute = (params?: string) => Promise<ExecResult>

interface TerminalEnvironment {
  writeConfig: (configName: ConfigName) => Promise<void>
  writeFile: CLITestEnvironment['writeFile']
  spawn: TerminalSpawn
  spawnCli: TerminalCliSpawn
  cleanup: CLITestEnvironment['cleanup']
  ls: CLITestEnvironment['ls']
  exists: CLITestEnvironment['exists']
  execute: CLITestEnvironment['execute']
  executeCli: TerminalCliExecute
  readReport: () => Promise<Report | undefined>
}

const getTerminal = async (): Promise<TerminalEnvironment> => {
  const env = await prepareEnvironment()

  const spawn: TerminalSpawn = async (...params) => {
    const s = await env.spawn(...params)

    const getStdout = async () => {
      await s.wait(100)
      const stdout = s.getStdout()
      LOG(stdout)
      return stdout
    }

    const terminate = () => s.kill('SIGKILL')

    return { ...s, getStdout, terminate }
  }

  const spawnCli: TerminalCliSpawn = async params => {
    const s = await spawn('tsx', `${CLI} ${params ?? ''}`)
    await s.waitForText('0.0.0')
    await s.wait(500)
    return s
  }

  const executeCli: TerminalCliExecute = async params => {
    const exe = await env.execute('tsx', `${CLI} ${params ?? ''}`)
    LOG(exe.stdout)
    LOG({ code: exe.code })
    return exe
  }

  const writeConfig: TerminalEnvironment['writeConfig'] = async configName => {
    const config = CONFIG.get(configName)

    if (!config) return

    await env.writeFile(`./cli.config.${config.extension}`, config.content)
  }

  const readReport: TerminalEnvironment['readReport'] = async () => {
    const content = await env.readFile('./.cli-report/report.json')

    const unknownJson = JSON.parse(content)

    if ('sections' in unknownJson) {
      return unknownJson as Report
    }
  }

  return {
    writeFile: env.writeFile,
    cleanup: env.cleanup,
    ls: env.ls,
    exists: env.exists,
    execute: env.execute,
    executeCli,
    spawn,
    spawnCli,
    writeConfig,
    readReport,
  }
}

export { getTerminal }
export type { TerminalEnvironment }
