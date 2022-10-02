module.exports = {
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    "semi": ["error", "always"],
    "quotes": ["error", "single"],
    "indent": ["error", 2],
    "comma-style": ["error", "last"],
    "comma-spacing": ["error"],
    "comma-dangle": ["error", "never"],
    "no-multi-spaces": ["error", {}],
    "function-paren-newline": ["error", "consistent"],
    "function-call-argument-newline": ["error", "consistent"],
    "no-multiple-empty-lines": ["error", { "max": 1, "maxEOF": 0 }],
    "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
    "@typescript-eslint/no-empty-interface": ["off"],
    "@typescript-eslint/no-namespace": ["off"],
    "sort-imports": ["error", { "allowSeparatedGroups": false, "ignoreDeclarationSort": true }],
    "no-empty-interface": "off",
    //"no-unused-vars": ["off", { "args": "none" }]
  },
  root: true,
};
