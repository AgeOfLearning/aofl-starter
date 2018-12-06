/*eslint-disable*/
const merge = require('webpack-merge');
const common = require('./webpack.common');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');
const {InjectManifest} = require('workbox-webpack-plugin');
const commonConfig = common('production');

const config = merge(commonConfig, {
  devtool: 'nosources-source-map',
  devServer: {
    contentBase: commonConfig.output.path,
    openPage: commonConfig.output.publicPath === '/' ? '': commonConfig.output.publicPath,
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
      swSrc: path.join(__dirname, '..', 'sw.js'),
      swDest: 'sw.js',
      exclude: [/\.LICENSE$/, /\.map\.js$/]
    })
  ]
});

module.exports = config;
