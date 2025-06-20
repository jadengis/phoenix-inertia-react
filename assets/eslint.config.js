import js from '@eslint/js'
import json from '@eslint/json'
import markdown from '@eslint/markdown'
import react from 'eslint-plugin-react'
import { defineConfig } from 'eslint/config'
import globals from 'globals'
import ts from 'typescript-eslint'

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    ignores: ['./vendor/**'],
    plugins: { js, ts },
    languageOptions: { globals: globals.browser },
    extends: [js.configs.recommended, ts.configs.recommended],
  },
  {
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    ignores: ['./vendor/**'],
    plugins: { react },
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    extends: [react.configs.flat.recommended, react.configs.flat['jsx-runtime']],
  },
  {
    files: ['**/*.json'],
    ignores: ['./package-lock.json'],
    plugins: { json },
    language: 'json/json',
    extends: [json.configs.recommended],
  },
  { files: ['**/*.jsonc'], plugins: { json }, language: 'json/jsonc', extends: [json.configs.recommended] },
  { files: ['**/*.json5'], plugins: { json }, language: 'json/json5', extends: [json.configs.recommended] },
  { files: ['**/*.md'], plugins: { markdown }, language: 'markdown/gfm', extends: [markdown.configs.recommended] },
])
