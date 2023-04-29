/// <reference types="vitest" />
import { defineConfig } from 'vite'

import {} from './all.config'

export default defineConfig({
  test: {
    globals: true,
    include: ['**/*.spec.ts'],
  },
})
