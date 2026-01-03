import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import { defineConfig, globalIgnores } from 'eslint/config';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default defineConfig([
  tseslint.configs.recommended,
  eslintPluginPrettierRecommended,
  pluginReact.configs.flat.recommended,
  globalIgnores(['next-env.d.ts', '.next', 'coverage', 'dist', 'node_modules']),
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      'no-unused-vars': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/no-unknown-property': ['error', { ignore: ['jsx'] }],
      'prettier/prettier': [
        'error',
        {
          printWidth: 120,
          singleQuote: true,
          endOfLine: 'auto',
          tabWidth: 2,
          useTabs: false,
        },
      ],
    },
  },
]);
