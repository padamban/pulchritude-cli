import { delay, loadConfig, REPORTER } from '@pulchritude-cli/core'

import { displayBanner } from './display/banner'

const RUN = async () => {
  displayBanner()

  const reporter = REPORTER({
    progressBarArgs: {
      barSize: 49,
    },
  })

  await delay(1000)
  reporter.progress?.setSectionCount(3)

  await delay(1000)

  reporter.initSection({
    id: 'ad',
    arguments: 'anu',
    description: 'ewe',
    title: 'eqwe  weqw qwe eqew',
  })

  await delay(1000)

  reporter.endSection()

  await delay(1000)

  const config = await loadConfig({
    defaultConfig: {},
    validConfigFilePaths: ['cli.config.ts', 'dev-cli.config.ts'],
  })

  setTimeout(() => {
    console.log('\n', { config })

    process.exit()
  })
}

export { RUN }
