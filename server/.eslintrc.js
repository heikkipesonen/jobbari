module.exports = {
  "env": {
     "browser": true
   },
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
    }
  },
  "extends": "eslint:recommended",
  "rules": {
      "no-unused-expressions": ["error", "always"],
      "semi": ["error", "always"],
      "quotes": ["error", "single"]
  }
}
