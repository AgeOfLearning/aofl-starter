const merge = require('webpack-merge');
const common = require('./__config/webpack.common');
const UnitTesting = require('@aofl/unit-testing-plugin');
const webpack = require('webpack');

const config = merge(common('development'), {
  output: {
    filename: '[name]-[chunkhash].min.js'
  },
  devtool: 'none',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'istanbul-instrumenter-loader',
          options: {
            esModules: true
          }
        },
        exclude: /(node_modules|\.spec\.|__build|__config)/
      }
    ]
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    }),
    new UnitTesting({
      config: '.wctrc.json',
      exclude: [
        '**/__build*',
        '**/node_modules',
        '**/node_modules_sourced',
        '**/documentation{,!(/tests/**)}',
        '**/__config',
        '**/*-instance/**',
        '**/*-polyfill/**',
        '**/init-router-service'
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
