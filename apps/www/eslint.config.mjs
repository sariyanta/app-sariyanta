import { dirname } from 'path';
import { fileURLToPath } from 'url';

import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: [
      'plugin:@typescript-eslint/recommended',
      'plugin:eslint-plugin-prettier/recommended',
      'next/core-web-vitals',
      'plugin:import/recommended',
    ],
    settings: {
      next: {
        rootDir: '.',
      },
    },
    rules: {
      'no-html-link-for-pages': 'off',
      'sort-imports': 'off', // Disable basic sort-imports
      'import/no-unresolved': 'off', // Disable unresolved imports
      'import/order': [
        'error',
        {
          alphabetize: { order: 'asc', caseInsensitive: true },
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          'newlines-between': 'always',
        },
      ],
    },
  }),
];

export default eslintConfig;
