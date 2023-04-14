const fs = require('fs')
const path = require('path')

/**
 * Delete the non-relevant parts of the package.json file.
 */
function revisePackageJsonFile({ filePath }) {
  const data = fs.readFileSync(filePath, 'utf8')
  const parsed = JSON.parse(data)

  delete parsed.devDependencies
  delete parsed.scripts

  fs.writeFileSync(filePath, JSON.stringify(parsed, null, 2) + '\n')
}

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
  const folders = fs.readdirSync(packagesFolder).filter(f => !f.startsWith('.'))

  folders.forEach(folder => {
    const folderPath = path.resolve(packagesFolder, folder)

    const npmIgnorePath = path.join(folderPath, `.npmignore`)
    const packageJsonPath = path.join(folderPath, `package.json`)

    addNpmIgnore({ filePath: npmIgnorePath })
    revisePackageJsonFile({ filePath: packageJsonPath })
  })
}

reviseNpmPackages({ packagesFolder: './cli' })
