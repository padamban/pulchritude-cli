const fs = require('fs')
const path = require('path')

/**
 * Create an npmignore file inside the published folder.
 */
function addNpmIgnore({ filePath }) {
  const ignore = ['node_modules', 'CHANGELOG.md', '.turbo', 'src']

  const content = ignore.join('\n') + '\n'

  fs.writeFileSync(filePath, content)
}

/**
 * Iterate over every publishable package, and modify them.
 */
function reviseNpmPackages({ packagesFolder }) {
  const folders = fs.readdirSync(packagesFolder)

  folders.forEach(folder => {
    const folderPath = path.resolve(packagesFolder, folder)

    const npmIgnorePath = path.join(folderPath, `.npmignore`)

    addNpmIgnore({ filePath: npmIgnorePath })
  })
}

reviseNpmPackages({ packagesFolder: './cli' })
