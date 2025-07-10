import { defineConfig } from 'eslint/config'
import js from '@eslint/js'
import globals from 'globals'
import importPlugin from 'eslint-plugin-import'
import jestPlugin from 'eslint-plugin-jest'
import stylistic from '@stylistic/eslint-plugin'

export default defineConfig([
  stylistic.configs.recommended,
  js.configs.recommended,

  {
    files: ['**/__tests__/**/*.js', '**/*.test.js'],
    plugins: {
      jest: jestPlugin,
    },
    rules: {
      ...jestPlugin.configs.recommended.rules,
    },
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'module',
    },
  },

  {
    ignores: ['dist/'],
    plugins: {
      import: importPlugin,
    },
    rules: {
      'import/order': ['error', { 'newlines-between': 'always' }],
    },
    languageOptions: {
      globals: {
        ...globals.node,
      },
      sourceType: 'module',
    },
  },
])
