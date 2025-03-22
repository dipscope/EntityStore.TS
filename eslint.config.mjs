import { defineConfig, globalIgnores } from 'eslint/config';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import styleisticPlugin from '@stylistic/eslint-plugin-ts';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([globalIgnores(['**/dist', '**/node_modules', '**/webpack.config.js']), {
    extends: compat.extends(
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended'
    ),

    ignores: [
        'dist',
        'node_modules',
        'webpack.config.js'
    ],

    plugins: {
        '@typescript-eslint': typescriptEslint,
        '@stylistic': styleisticPlugin
    },

    languageOptions: {
        parser: tsParser
    },

    rules: {
        'no-prototype-builtins': 'off',
        'brace-style': 'off',
        'comma-dangle': 'off',
        quotes: 'off',
        'default-param-last': 'off',
        'no-control-regex': 'off',
        '@stylistic/no-explicit-any': 'off',
        '@stylistic/no-non-null-assertion': 'off',
        '@stylistic/explicit-module-boundary-types': 'off',
        '@stylistic/no-inferrable-types': 'off',
        '@stylistic/brace-style': ['error', 'allman'],
        '@stylistic/comma-dangle': ['error', 'never'],
        '@stylistic/quotes': ['error', 'single'],
        '@typescript-eslint/default-param-last': ['error'],

        '@typescript-eslint/no-unsafe-function-type': 'off',
        '@typescript-eslint/no-explicit-any': 'off'
    }
}]);
