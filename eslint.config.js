import globals from 'globals';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  eslint.configs.recommended,

  ...tseslint.configs.recommended,

  {
    files: ["**/*.{js,ts}"],

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },

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
      "sort-imports": ["error", { "allowSeparatedGroups": false, "ignoreDeclarationSort": true }],
      "eol-last": ["error", "always"],
      "no-shadow": "off",
      "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
      "@typescript-eslint/no-empty-interface": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-namespace": "off",
      "@typescript-eslint/no-shadow": "warn",
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
];