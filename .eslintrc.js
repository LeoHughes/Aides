module.exports = {
  "extends": "eslint:recommended",
  "env": {
    "browser": true,
    "node": true,
    "commonjs": true
  },
  "parserOptions": {
    "ecmaVersion": 6
  },
  "globals": {
    "$": true,
    "require": true,
    "module": true,
    "Vue": true
  },
  "rules": {
    "semi": ["error", "always"],
    "quotes": ["error", "single"],
    "no-console": ["off"],
    "indent": ["error", 2],
    "comma-dangle": ["error", {
      "objects": "always"
    }],
    "no-alert": 2,
    "no-class-assign": 2,
    "no-debugger": 1,
    "no-useless-escape": 0,
    "no-undef": 1
  }
};