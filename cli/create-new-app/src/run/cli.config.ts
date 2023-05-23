import { CliSetup, CommandSetup, ProgramSetup } from '@pulchritude-cli/core'

const PACKAGE_MANAGERS = ['npm', 'pnpm', 'yarn'] as const
const CONFIGURABLE_FEATURES = [
  'eslint',
  'prettier',
  'vitest',
  'storybook',
] as const

const command: CommandSetup<
  { outputDir: string; organizationName: string },
  {
    packageManager: typeof PACKAGE_MANAGERS
    configure: (typeof CONFIGURABLE_FEATURES)[]
  }
> = {
  id: 'createMonorepo',
  title: 'Create monorepo',
  description: 'Create turborepo based monorepo project.',
  arguments: [
    {
      id: 'organizationName',
      title: 'Organization Name',
      description: 'The organization name that combines these npm packages.',
      type: 'string',
      example: '@my-org',
      defaultValue: '@my-org-name',
    },
    {
      id: 'outputDir',
      title: 'Output directory',
      description: 'The directory where the generated code will go.',
      type: 'string',
      example: './new-monorepo',
      defaultValue: './new-monorepo',
    },
  ],
  options: [
    {
      id: 'packageManager',
      title: 'Package manager',
      description: 'The package manager of the repository.',
      defaultValue: PACKAGE_MANAGERS[0],
      choices: PACKAGE_MANAGERS.map(value => ({ value })),
    },
    {
      id: 'configure',
      title: 'Configure',
      description:
        'Add configuration for linting, testing and similar features.',
      variadic: true,
      defaultValue: [...CONFIGURABLE_FEATURES],
      choices: CONFIGURABLE_FEATURES.map(value => ({ value })),
    },
  ],
  script:
    ({ args, fileManager }) =>
    async () => {
      const resolve = fileManager._path.resolve
      const fileURLToPath = fileManager._url.fileURLToPath
      const __dirname = fileURLToPath(new URL('.', import.meta.url))

      fileManager.remove(args.outputDir)
      fileManager.writeFile(resolve(args.outputDir + '/README.md'), 'Hello')

      fileManager.copyTemplate(
        resolve(__dirname, '../../templates/monorepo'),
        args.outputDir,
        {
          orgName: args.organizationName,
          repoName: 'repo',
        },
      )
    },
}

const program: ProgramSetup = {
  id: 'generateCode',
  title: 'Generate code',
  description: 'Create new application code using predefined templates.',
  commands: [command],
}

const CONFIG: CliSetup = {
  name: 'cna',
  description: 'Scaffold applications code.',
  version: '0.0.0',
  programs: [program],
}

export { CONFIG }
