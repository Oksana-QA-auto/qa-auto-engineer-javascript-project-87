import globals from 'globals'
import js from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
import importPlg from 'eslint-plugin-import'

export default [
  js.configs.recommended,
  stylistic.configs.recommended,

  {
    plugins: { import: importPlg },

    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },

    rules: {
      'import/order': ['error', { 'newlines-between': 'always' }],
    },
  },
]
