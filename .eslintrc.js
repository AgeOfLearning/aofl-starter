const config = {
  extends: ['aofl'],
  parser: 'babel-eslint',
  root: true,
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true,
    mocha: true
  },
  globals: {
    getTestContainer: true,
    cleanTestContainer: true,
    __webpack_public_path__: true,
    aofljsConfig: true
  }
};

module.exports = config;
