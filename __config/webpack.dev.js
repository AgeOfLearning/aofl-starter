const merge = require('webpack-merge');
const common = require('./webpack.common');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

const commonConfig = common('development');
const config = merge(commonConfig, {
  devtool: 'source-map',
  plugins: [
    new HardSourceWebpackPlugin()
  ],
  devServer: {
    contentBase: commonConfig.output.path,
    openPage: commonConfig.output.publicPath === '/' ? '': commonConfig.output.publicPath,
    port: 8080,
    open: true,
    stats: 'minimal',
    historyApiFallback: true
    // useLocalIp: true
  },
  performance: {
    maxEntrypointSize: 500000,
    maxAssetSize: 500000
  }
});

module.exports = config;
