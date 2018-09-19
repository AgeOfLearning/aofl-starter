const merge = require('webpack-merge');
const devConfig = require('./webpack.dev');
const UnitTesting = require('@aofl/unit-testing-plugin');

const config = merge(devConfig, {
  plugins: [
    new UnitTesting({
      exclude: [
        '**/__build*',
        '**/node_modules',
        '**/node_modules_sourced',
        '**/documentation{,!(/tests/**)}',
        '**/__config',
        '**/*-instance/**',
        '**/*-polyfill/**'
      ],
      scripts: [
        'runtime',
        'init-polyfill-service',
        'custom-elements-es5-adapter'
      ]
    })
  ]
});

module.exports = config;
