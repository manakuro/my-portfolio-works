module.exports = {
  extends: [
    'eslint:recommended',
    'standard',
    'prettier'
  ],
  parser: 'babel-eslint',
  plugins: ['import', 'prettier', 'standard'],
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true
  },
  rules: {
    quotes: ['error', 'single'],
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,
  }
};
