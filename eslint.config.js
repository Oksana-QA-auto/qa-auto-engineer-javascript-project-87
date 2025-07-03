import js from '@eslint/js'
import globals from 'globals'
import { defineConfig } from 'eslint/config'
import stylistic from '@stylistic/eslint-plugin'
import jestPlugin from 'eslint-plugin-jest';   // npm i -D eslint-plugin-jest

export default defineConfig([
  stylistic.configs.recommended,

  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js },
    extends: ['js/recommended'],
  },

  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: { globals: globals.node },
  },

  {
    files: [
      '**/__tests__/**/*.js',
      '**/?(*.)+(spec|test).js',
    ],
    plugins: { jest: jestPlugin },
    ...jestPlugin.configs.recommended,
    languageOptions: {
      globals: {
        jest: true,
        test: true,
        expect: true,
        describe: true,
        beforeEach: true,
        afterEach: true,
      },
    },
    extends: ['plugin:jest/recommended'],
  },
])
