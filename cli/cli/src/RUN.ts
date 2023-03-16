import { delay, loadConfig, PROGRESS } from '@pulchritude-cli/core'

import { displayBanner } from './display/banner'

const RUN = async () => {
  displayBanner()

  const p = PROGRESS({ barSize: 49 })
  p.setSectionCount(3)

  await delay(1000)
  p.nextActiveSection()

  // p.disable()
  p.setSectionTitle('Hohij lkjl')
  p.setSubSectionCount(4)
  await delay(1000)
  p.nextActiveSubSection()
  await delay(1000)
  p.nextActiveSubSection()
  await delay(1000)
  p.nextActiveSubSection()

  await delay(1000)
  p.nextActiveSection()

  await delay(1000)
  p.nextActiveSection()

  await delay(1000)

  p.finish()

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
