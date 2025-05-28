// @ts-check
import eslint from '@eslint/js';
import { tanstackConfig } from '@tanstack/eslint-config';
import eslintPluginJsxA11y from 'eslint-plugin-jsx-a11y';
// Assuming this is a general config
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const commonTSRules = {
  '@typescript-eslint/array-type': ['error', { default: 'array' }],
  '@typescript-eslint/no-floating-promises': 'warn',
  '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
  '@typescript-eslint/no-duplicate-imports': [
    'error',
    { includeExports: true },
  ],
  // '@typescript-eslint/consistent-type-imports': 'off', // User preference
  // 'import/order': 'off', // Usually handled by Prettier plugin if one is used for imports
};

export default [
  {
    // Global ignores, applied to all configurations
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
      // vite.config.js and other root configs are often fine to lint if they are .js/ts
      // but if they cause issues, they can be ignored here or in specific blocks.
      // 'vite.config.js',
      // 'apps/*/vite.config.js',
      // '*.config.js',
      'routeTree.gen.ts', // Often auto-generated
      'eslint.config.js', // Ignore self
    ],
  },
  ...tanstackConfig, // Apply TanStack config globally if intended

  // Client Application Configuration (React)
  {
    files: ['apps/client/**/*.{ts,tsx,js,jsx}'],
    plugins: {
      react: eslintPluginReact,
      'react-hooks': eslintPluginReactHooks,
      'jsx-a11y': eslintPluginJsxA11y,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node, // For build tools and Vite environment
        ...globals.jest, // If client has tests
      },
      parserOptions: {
        project: ['apps/client/tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
        ecmaFeatures: {
          jsx: true,
        },
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    settings: {
      react: {
        version: 'detect', // Automatically detect the React version
      },
    },
    rules: {
      ...eslint.configs.recommended.rules,
      ...tseslint.configs.recommendedTypeChecked.reduce(
        (acc, config) => ({ ...acc, ...config.rules }),
        {},
      ),
      ...eslintPluginReact.configs.recommended.rules,
      ...eslintPluginReactHooks.configs.recommended.rules,
      ...eslintPluginJsxA11y.configs.recommended.rules,
      ...eslintPluginPrettierRecommended.rules,
      ...commonTSRules,
      '@typescript-eslint/no-explicit-any': 'warn', // More lenient for client-side rapid dev
      '@typescript-eslint/no-unsafe-argument': 'warn',
      // Client-specific rule overrides or additions:
      'react/react-in-jsx-scope': 'off', // Not needed with new JSX transform
      'react/prop-types': 'off', // Usually handled by TypeScript
    },
  },

  // Server Application Configuration (NestJS)
  {
    files: ['apps/server/**/*.ts'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest, // If server has tests
      },
      parserOptions: {
        project: ['apps/server/tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      ...eslint.configs.recommended.rules,
      ...tseslint.configs.recommendedTypeChecked.reduce(
        (acc, config) => ({ ...acc, ...config.rules }),
        {},
      ),
      ...eslintPluginPrettierRecommended.rules,
      ...commonTSRules,
      '@typescript-eslint/no-explicit-any': 'warn', // Or 'error' for stricter server code
      '@typescript-eslint/no-unsafe-argument': 'error', // Stricter for server
      // Server-specific rule overrides or additions:
      // e.g., rules specific to NestJS or Node.js patterns
    },
  },
];
