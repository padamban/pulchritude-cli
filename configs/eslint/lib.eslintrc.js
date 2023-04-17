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
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  plugins: ['prettier', '@typescript-eslint', 'simple-import-sort'],
  rules: {
    'no-console': 'warn',
    camelcase: 'error',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
  },
  overrides: [],
  ignorePatterns: ['node_modules', 'dist', '.coverage'],
}
