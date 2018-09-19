/*eslint-disable*/
const merge = require('webpack-merge');
const common = require('./__config/webpack.common');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');
const {InjectManifest} = require('workbox-webpack-plugin');

const config = merge(common('production'), {
  devtool: 'nosources-source-map',
  devServer: {
    contentBase: path.join(__dirname, '__build'),
    port: 8080,
    open: true,
    stats: 'minimal',
    historyApiFallback: true
    // useLocalIp: true
  },
  plugins: [
    new UglifyJsPlugin({
      sourceMap: true,
      cache: true,
      parallel: true,
      extractComments: true,
      uglifyOptions: {
        compress: {
          warnings: false
        }
      }
    }),
    new InjectManifest({
      swSrc: './sw.js',
      swDest: 'sw.js',
      exclude: [/\.LICENSE$/, /\.map\.js$/]
    })
  ]
});

module.exports = config;
