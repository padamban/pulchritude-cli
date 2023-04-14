const fs = require('fs')
const path = require('path')

/**
 * Originally the package.json's main property links the `src/index.ts` file.
 * This is useful for linking the projects during development.
 *
 * This function replaces those links with `dist/index.js` paths.
 */
function revisePackageJsonFile({ filePath }) {
  const data = fs.readFileSync(filePath, 'utf8')
  const parsed = JSON.parse(data)

  parsed.main = 'dist/index.js'
  parsed.types = 'dist/index.d.ts'
  parsed.module = 'dist/index.mjs'

  fs.writeFileSync(filePath, JSON.stringify(parsed, null, 2) + '\n')
}

/**
 * Iterate over every published package, and modify them.
 */
function reviseNpmPackages({ packagesFolder }) {
  const folders = fs.readdirSync(packagesFolder).filter(f => !f.startsWith('.'))

  folders.forEach(folder => {
    const folderPath = path.resolve(packagesFolder, folder)

    const packageJsonPath = path.join(folderPath, `package.json`)

    revisePackageJsonFile({ filePath: packageJsonPath })
  })
}

reviseNpmPackages({ packagesFolder: './cli' })
