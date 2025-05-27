// @ts-check
import eslint from '@eslint/js';
import { tanstackConfig } from '@tanstack/eslint-config';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  {
    ignores: [
      'node_modules/',
      'dist/',
      '.yarn/',
      '.nx/',
      '.nyc_output/',
      'coverage/',
      '*.min.js',
      '*.bundle.js',
      '*.cjs',
      '*.mjs',
      '*.lock',
      '*.log',
      'apps/*/dist/',
      'apps/*/node_modules/',
      'vite.config.js',
      '*.config.js',
      '*.config.mjs',
      '*.config.cjs',
    ],
  },
  ...tanstackConfig,
  ...tseslint.config(
    {
      ignores: ['eslint.config.js'],
    },
    eslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    eslintPluginPrettierRecommended,
    {
      languageOptions: {
        globals: {
          ...globals.node,
          ...globals.jest,
        },
        ecmaVersion: 5,
        sourceType: 'module',
        parserOptions: {
          projectService: true,
          tsconfigRootDir: import.meta.dirname,
        },
      },
    },
    {
      rules: {
        '@typescript-eslint/array-type': ['error', { default: 'array' }],
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-floating-promises': 'warn',
        '@typescript-eslint/no-unsafe-argument': 'warn',
        'no-duplicate-imports': 'error',
      },
    },
  ),
];
