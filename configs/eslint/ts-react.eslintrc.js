module.exports = {
  env: {
    browser: true,
    node: true,
  },
  globals: {
    JSX: true,
    test: true,
    expect: true,
    NodeJS: true,
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
    'plugin:react/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: [
    'react',
    'prettier',
    'react-hooks',
    '@typescript-eslint',
    'simple-import-sort',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'jsx-quotes': ['warn', 'prefer-double'],
    'react-hooks/rules-of-hooks': 'warn',
    'react-hooks/exhaustive-deps': 'warn',
    'no-console': 'warn',
    camelcase: 'error',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    'react/react-in-jsx-scope': 'off',
    'react/display-name': 'off',
    'react/prop-types': ['warn', { skipUndeclared: true }],
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
  },
  overrides: [],
  ignorePatterns: ['node_modules'],
}
