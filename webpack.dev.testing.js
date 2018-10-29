const merge = require('webpack-merge');
const common = require('./__config/webpack.common');
const UnitTesting = require('@aofl/unit-testing-plugin');
const webpack = require('webpack');

const config = merge(common('development'), {
  devtool: 'none',
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    }),
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
