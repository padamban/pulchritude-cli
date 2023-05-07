module.exports = {
  env: {
    node: true,
  },
  globals: {
    test: true,
    expect: true,
    NodeJS: true,
    describe: 'readonly',
    beforeAll: 'readonly',
    afterAll: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:jsdoc/recommended-typescript',
  ],
  plugins: ['prettier', '@typescript-eslint', 'simple-import-sort', 'jsdoc'],
  rules: {
    'no-console': 'warn',
    camelcase: 'error',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'jsdoc/require-example': [
      // The Error level should be `error`, `warn`, or `off` (or 2, 1, or 0)
      'error',
      // The options vary by rule, but are generally added to an options
      //  object as follows:
      {
        checkConstructors: true,
        exemptedBy: ['type'],
      },
    ],
    'jsdoc/require-jsdoc': [
      'warn',
      {
        publicOnly: true,
        require: {
          ArrowFunctionExpression: true,
          ClassDeclaration: true,
          ClassExpression: true,
          FunctionDeclaration: true,
          FunctionExpression: true,
          MethodDefinition: true,
        },
        contexts: [
          'ArrowFunctionExpression',
          'FunctionDeclaration',
          'FunctionExpression',
          'MethodDefinition',
          'Property',
          'TSDeclareFunction',
          'TSEnumDeclaration',
          'TSInterfaceDeclaration',
          'TSMethodSignature',
          'TSPropertySignature',
          'TSTypeAliasDeclaration',
          'VariableDeclaration',
        ],
        checkGetters: true,
        enableFixer: false,
      },
    ],
  },
  overrides: [],
  ignorePatterns: ['node_modules', 'dist', '.coverage'],
}
