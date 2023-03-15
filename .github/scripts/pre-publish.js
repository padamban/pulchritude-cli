const fs = require('fs');
const path = require('path');

function revisePackageJsonFile({ filePath }) {
  const data = fs.readFileSync(filePath, 'utf8');
  const parsed = JSON.parse(data);

  parsed.main = 'dist/index.js';
  parsed.types = 'dist/index.d.ts';
  parsed.module = 'dist/index.mjs';

  delete parsed.devDependencies;
  delete parsed.scripts;

  fs.writeFileSync(filePath, JSON.stringify(parsed, null, 2) + '\n');
}

function addNpmIgnore({ filePath }) {
  const lines = [
    // Ignored files and folders
    'node_modules',
    'CHANGELOG.md',
    '.turbo',
    'src',
  ];

  const content = lines.join('\n') + '\n';

  fs.writeFileSync(filePath, content);
}

function reviseNpmPackages({ packagesFolder }) {
  const folders = fs.readdirSync(packagesFolder);

  folders.forEach((folder) => {
    const folderPath = path.resolve(PACKAGE_FOLDER, folder);

    const packageJsonPath = path.join(folderPath, `package.json`);
    revisePackageJsonFile({ filePath: packageJsonPath });

    const npmIgnorePath = path.join(folderPath, `.npmignore`);

    addNpmIgnore({ filePath: npmIgnorePath });
  });
}

function RUN() {
  reviseNpmPackages({ packagesFolder: './cli' });
}

RUN();
