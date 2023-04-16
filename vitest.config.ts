/// <reference types="vitest" />
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    globals: true,
    include: ['**/*.test.ts'],
    coverage: {
      enabled: false,
      provider: 'c8',
      reporter: ['text', 'json', 'html', 'clover', 'cobertura', 'lcov'],
      reportsDirectory: '.coverage',
      excludeNodeModules: true,
      all: true,
      exclude: ['**/*.test.ts', '**/dist'],
      include: ['cli/core'],
    },
  },
})
