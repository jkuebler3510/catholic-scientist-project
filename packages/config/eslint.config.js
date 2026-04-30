import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

/**
 * Shared base ESLint flat config for the monorepo.
 *
 * Apps extend this and may layer on framework-specific configs
 * (e.g. apps/web layers eslint-config-next on top).
 */
export default tseslint.config(
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'dist/**',
      '.turbo/**',
      'coverage/**',
      'build/**',
      '.sanity/**',
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-explicit-any': [
        'error',
        {
          ignoreRestArgs: true,
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
    },
  }
);
