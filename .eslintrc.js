module.exports = {
  env: {
    es2021: true,
    node: true,
    'jest/globals': true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'linebreak-style': 0,
    'operator-linebreak': 0,
    'comma-dangle': 0,
  },
};
