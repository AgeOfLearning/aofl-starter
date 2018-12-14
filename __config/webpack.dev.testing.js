const merge = require('webpack-merge');
const common = require('./webpack.common');
const UnitTesting = require('@aofl/unit-testing-plugin');
const webpack = require('webpack');
const path = require('path');

const config = merge(common('development'), {
  output: {
    path: path.join(__dirname, '..', '__build'),
    filename: '[name]-[chunkhash].min.js',
    publicPath: '/__build/'
  },
  devtool: 'none',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules_sourced|node_modules|\.spec\.|__build|__config)/,
        enforce: 'post',
        use: {
          loader: 'istanbul-instrumenter-loader',
          options: {
            esModules: true
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    }),
    new UnitTesting({
      config: path.join(__dirname, '.wctrc.json'),
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
        'common',
        'main'
      ]
    })
  ]
});

module.exports = config;
