module.exports = {
  env: {
    'jest/globals': true
  },
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['./node_modules', './']
      }
    }
  },
  extends: ['./node_modules/@maarkllc/code-config/js/base/eslint'],
  plugins: ['jest'],
  rules: {
    'no-restricted-syntax': 0,
    'no-await-in-loop': 0,
    'import/no-extraneous-dependencies': 0
  }
}
