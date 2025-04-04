import globals from 'globals'
import pluginJs from '@eslint/js'
import pluginReact from 'eslint-plugin-react'
import pluginPrettier from 'eslint-plugin-prettier/recommended'

export default [
  {
    ignores: ['node_modules/'],
  },
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
  },
  {
    languageOptions: { globals: globals.browser },
  },
  pluginReact.configs.flat.recommended,
  pluginJs.configs.recommended,
  pluginPrettier,
]
