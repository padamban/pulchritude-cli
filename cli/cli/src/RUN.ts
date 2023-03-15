import { displayBanner, loadConfig } from '@pulchritude-cli/core'

const RUN = async () => {
  displayBanner()

  const config = await loadConfig({
    defaultConfig: {},
    validConfigFilePaths: ['cli.config.ts', 'dev-cli.config.ts'],
  })

  console.log({
    config,
  })
}

export { RUN }
