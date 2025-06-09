import path from 'node:path';

import { includeIgnoreFile } from '@eslint/compat';
import js from '@eslint/js';
// import { configs, plugins } from 'eslint-config-airbnb-extended'; // https://github.com/NishargShah/eslint-config-airbnb-extended/issues/8
import { rules as prettierConfigRules } from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import importX from 'eslint-plugin-import-x';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactRefresh from 'eslint-plugin-react-refresh';
import vanillaExtract from '@antebudimir/eslint-plugin-vanilla-extract';
import stylistic from '@stylistic/eslint-plugin';

export const projectRoot = path.resolve('.');
export const gitignorePath = path.resolve(projectRoot, '.gitignore');

/** @type {import('eslint').Linter.Config[]} */
const jsConfig = [
  // ESLint Recommended Rules
  {
    name: 'js/config',
    ...js.configs.recommended,
    rules: {
      'consistent-return': 'error',
      'arrow-body-style': ['error', 'as-needed'],
    },
  },

  // Stylistic Plugin
  stylistic.configs.recommended,
  // plugins.stylistic,
  // Import X Plugin
  {
    name: 'importX',
    plugins: {
      'import-x': importX,
    },
    settings: {
      'import-x/resolver': {
        typescript: true,
        node: true,
      },
    },
    rules: {
      ...importX.flatConfigs.recommended.rules,
      'import-x/no-named-default': 'error',
      'import-x/prefer-default-export': 'off',
      'import-x/order': [
        'error',
        {
          'newlines-between': 'always-and-inside-groups',
          consolidateIslands: 'never',
        },
      ],
    },
  },
  // plugins.importX,
  // Airbnb Base Recommended Config
  // ...configs.base.recommended,
  // Overrides
  // {
  //   rules: {
  //     'import-x/prefer-default-export': 'off',
  //     'import-x/order': [
  //       'error',
  //       {
  //         'newlines-between': 'always-and-inside-groups',
  //         consolidateIslands: 'never',
  //       },
  //     ],
  //   },
  // },
];

/** @type {import('eslint').Linter.Config[]} */
const reactConfig = [
  // React Plugin
  {
    name: 'react',
    plugins: {
      react: reactPlugin,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: reactPlugin.configs.recommended.rules,
  },
  // React Plugin
  // plugins.react,
  // React Hooks Plugin
  // plugins.reactHooks,
  // React JSX A11y Plugin
  // plugins.reactA11y,
  // Airbnb React Recommended Config
  // ...configs.react.recommended,
  // Rules of hooks -> included in airbnb config
  {
    name: 'react-hooks',
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: reactHooks.configs.recommended.rules,
  },
  {
    name: 'jsxA11y',
    plugins: {
      'jsx-a11y': jsxA11y,
    },
    rules: jsxA11y.configs.recommended.rules,
  },
  // Refresh
  reactRefresh.configs.recommended,
  // Vanilla extract
  vanillaExtract.configs.recommended,
  // Overrides
  {
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/require-default-props': 'off',
    },
  },
];

/** @type {import('eslint').Linter.Config[]} */
const typescriptConfig = [
  // tseslint -> included in airbnb config
  ...tseslint.configs.recommended,
  // TypeScript ESLint Plugin
  // plugins.typescriptEslint,
  // Airbnb Base TypeScript Config
  // ...configs.base.typescript,
  // Airbnb React TypeScript Config
  // ...configs.react.typescript,
  // Overrides
  {
    rules: {
      // 'import-x/extensions': ['ts', '.tsx', '.mts', '.css.ts'],
      // 'import-x/extensions': 'off',
      '@typescript-eslint/consistent-type-definitions': 'off',
    },
  },
];

/** @type {import('eslint').Linter.Config[]} */
const prettierConfig = [
  // Prettier Plugin
  {
    name: 'prettier/plugin/config',
    plugins: {
      prettier: prettierPlugin,
    },
  },
  // Prettier Config
  {
    name: 'prettier/config',
    rules: {
      ...prettierConfigRules,
      'prettier/prettier': 'error',
    },
  },
];

/** @type {import('eslint').Linter.Config<Linter.RulesRecord>[]} */
export default [
  // Ignore .gitignore files/folder in eslint
  includeIgnoreFile(gitignorePath),
  // Javascript Config
  ...jsConfig,
  // React Config
  ...reactConfig,
  // TypeScript Config
  ...typescriptConfig,
  // Prettier Config
  ...prettierConfig,
];
