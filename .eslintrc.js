module.exports = {
  root: true,
  env: {
    node: true,
    es2020: true
  },
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json'
  },
  plugins: [
    '@typescript-eslint'
  ],
  rules: {
    // TypeScript関連
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    
    // 一般的なJavaScript/TypeScript
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'prefer-const': 'error',
    'no-var': 'error',
    
    // コードスタイル
    'indent': ['error', 2],
    'quotes': ['error', 'single'],
    'semi': ['error', 'never'],
    'comma-dangle': ['error', 'never'],
    
    // 微信小程序特有
    'no-undef': 'off' // wx, getApp等のグローバル変数のため
  },
  globals: {
    wx: 'readonly',
    getApp: 'readonly',
    Page: 'readonly',
    App: 'readonly',
    Component: 'readonly',
    getCurrentPages: 'readonly',
    __wxConfig: 'readonly'
  },
  ignorePatterns: [
    'dist/',
    'node_modules/',
    '*.min.js'
  ]
}