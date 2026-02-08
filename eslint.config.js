// eslint.config.js
import js from '@eslint/js'
import nextPlugin from '@next/eslint-plugin-next'
import tsEslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'

export default [
  { 
    files: ['**/*.{js,mjs,cjs,ts,tsx}'],
    plugins: {
      '@next/next': nextPlugin,
      '@typescript-eslint': tsEslint
    },
    languageOptions: {
      parser: tsParser,
      sourceType: 'module'
    },
    rules: {
      ...js.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules
    }
  },
  {
    ignores: ['node_modules/**', 'dist/**', '.next/**']
  }
]