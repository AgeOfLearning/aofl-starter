const path = require('path');

module.exports = {
  name: 'Aofl Starter',
  build: {
    eslint: {
      options: {
        config: path.join(__dirname, '.eslintrc.js')
      }
    }
  }
};
