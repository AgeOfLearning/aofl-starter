/*eslint-disable*/
const merge = require('webpack-merge');
const common = require('./webpack.common');
const path = require('path');
const {InjectManifest} = require('workbox-webpack-plugin');
const commonConfig = common('production');
const TerserPlugin = require('terser-webpack-plugin');

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
    new InjectManifest({
      swSrc: path.join(__dirname, 'sw.js'),
      swDest: 'sw.js',
      exclude: [/\.LICENSE$/, /\.map\.js$/]
    })
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        sourceMap: true,
        terserOptions: {
          output: {
            comments: /\#/i
          }
        },
        extractComments: true
      })
    ]
  }
});

module.exports = config;
