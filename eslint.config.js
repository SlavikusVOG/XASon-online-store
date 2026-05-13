// @ts-check
const eslint = require('@eslint/js');
const { defineConfig } = require('eslint/config');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');

module.exports = defineConfig([
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommended,
      tseslint.configs.stylistic,
      angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        { type: 'attribute', prefix: 'xas', style: 'camelCase' },
      ],
      '@angular-eslint/component-selector': [
        'error',
        { type: 'element', prefix: 'xas', style: 'kebab-case' },
      ],
      'no-console': ['error', { allow: ['warn', 'error'] }],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@angular-eslint/prefer-standalone': 'error',
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@angular/common'],
              importNames: ['NgIf', 'NgFor', 'NgSwitch', 'NgSwitchCase', 'NgSwitchDefault'],
              message: 'Use control flow instead',
            },
            {
              group: ['@angular/common'],
              importNames: ['NgClass', 'NgStyle'],
              message: 'Use [class] and [style] instead',
            },
            {
              group: ['@angular/common'],
              importNames: ['CommonModule'],
              message: 'Use standalone imports instead',
            },
            {
              group: ['@angular/core'],
              importNames: ['NgModule'],
              message: 'No NgModules allowed',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['**/*.html'],
    extends: [angular.configs.templateRecommended, angular.configs.templateAccessibility],
    rules: {
      '@angular-eslint/template/prefer-control-flow': 'error',
      '@angular-eslint/template/prefer-self-closing-tags': 'error',
    },
  },
  eslintPluginPrettierRecommended,
]);
