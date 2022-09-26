module.exports = {
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    "array-type": [true, "array"],
    "quotes": ["error", "single"],
    "function-call-argument-newline": ["error", "always"]
  },
  root: true,
};
