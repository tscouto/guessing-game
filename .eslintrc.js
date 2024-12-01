module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-console': 'warn',
    'no-plusplus': 'off',
    'no-use-before-define': 'off',
    'no-debugger': 'error',
    'no-alert': 'error',
    'no-var': 'error',
    'prefer-const': 'error',
    'no-unused-vars': ['error', { args: 'none' }],
    'no-empty': 'error',
    'no-extra-semi': 'error',
    quotes: ['error', 'single'],
    'no-warning-comments': 'off',
    'no-undef': 'error',
  },
};
