const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const AofLTemplatingPlugin = require('@aofl/templating-plugin/index');
const htmlWebpackConfig = require('./html-webpack-config');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (mode) => {
  const outputDirName = '__build';
  const outputDirRoot = path.join(__dirname, '..');
  const publicPath = '/';

  const config = {
    entry: {
      'custom-elements-es5-adapter':
        './node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js',
      'main': './modules/index.js'
    },
    output: {
      path: path.join(outputDirRoot, outputDirName),
      publicPath,
      filename: '[chunkhash].min.js'
    },
    mode,
    module: {
      rules: [
        {
          test: /\.html$/,
          exclude: /template\.html/,
          use: [
            {
              loader: 'html-loader',
              options: {
                minimize: true,
                attrs: [
                  'aofl-img:aofl-src',
                  'aofl-source:srcset',
                  'aofl-img:src',
                  'source:srcset',
                  ':src'
                ]
              }
            }
          ]
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: false
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: false
              }
            }
          ]
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: '@aofl/webcomponent-css-loader',
              options: {
                sourceMap: false,
                path: path.resolve(__dirname, '..', 'templates', 'main', 'css', 'index.css')
              }
            }
          ]
        },
        {
          test: /@webcomponents/,
          loader: 'imports-loader?this=>window'
        },
        {
          test: /i18n\/index\.js$/,
          use: '@aofl/i18n-loader'
        },
        {
          enforce: 'pre',
          test: /\.js$/,
          exclude: /(node_modules|sw)/,
          use: {
            loader: 'eslint-loader',
            options: {
              configFile: path.resolve('.eslintrc.js')
            }
          }
        },
        {
          test: /\.js$/,
          exclude: /node_modules\/(?!@aofl|@polymer|lit-html).*/,
          use: {
            loader: 'babel-loader',
            options: {
              'cacheDirectory': true,
              ...require('./.babelrc.json')
            }
          }
        },
        {
          test: /\.(png|jpe?g|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[path][name]-[hash].[ext]',
                limit: 2000
              }
            },
            {
              loader: 'img-loader',
              options: {
                pngquant: {
                  speed: 1
                },
                mozjpeg: {
                  progressive: true,
                  quality: 80
                }
              }
            }
          ]
        },
        {
          test: /\.(woff|woff2|ttf|eot)$/,
          use: {
            loader: 'file-loader',
            options: {
              name: '[hash].[ext]',
              limit: 1
            }
          }
        }
      ]
    },
    plugins: [
      new webpack.HashedModuleIdsPlugin(),
      new CleanWebpackPlugin(outputDirName, {
        root: outputDirRoot
      }),
      new AofLTemplatingPlugin({
        template: {
          name: 'main',
          template: path.resolve(__dirname, '..', 'templates', 'main', 'template.ejs'),
          filename: path.join('templates', 'main', 'template.html'),
          ...htmlWebpackConfig(mode)
        },
        routes: {
          mainRoutes: path.join(__dirname, '..', 'routes'),
          pattern: [
            path.join('routes', '**', 'index.js')
          ],
          ignore: ['**/__build/**/*', '**/node_modules/**/*']
        }
      }),
      new WebpackPwaManifest({
        'name': 'Aofl Starter App',
        'short_name': 'AoflStarter',
        'description': 'Aofl Starter App',
        'display': 'standalone',
        'theme-color': '#fdf667',
        'background_color': '#fdf667',
        'crossorigin': 'use-credentials', // can be null, use-credentials or anonymous
        'ios': {
          'apple-mobile-web-app-title': 'Aofl Starter App',
          'apple-mobile-web-app-status-bar-style': '#fdf667'
        },
        'icons': [
          {
            src: 'assets/manifest/icon-48x48.png',
            sizes: '48x48'
          },
          {
            src: 'assets/manifest/icon-72x72.png',
            sizes: '72x72'
          },
          {
            src: 'assets/manifest/icon-96x96.png',
            sizes: '96x96'
          },
          {
            src: 'assets/manifest/icon-144x144.png',
            sizes: '144x144'
          },
          {
            src: 'assets/manifest/icon-192x192.png',
            sizes: '192x192'
          },
          {
            src: 'assets/manifest/icon-512x512.png',
            sizes: '512x512'
        }
        ]
      }),
      new CopyWebpackPlugin([{
        from: 'assets/favicon.ico',
        to: 'favicon.ico'
      }])
    ],
    resolve: {
      modules: [
        path.resolve('./'),
        './node_modules/'
      ]
    },
    watchOptions: {
      ignored: [/node_modules\//]
    },
    stats: 'minimal',
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendors: false,
          default: false,
          common: {
            name: 'common',
            chunks(chunk) {
              if (chunk.name === null) {
                return true;
              }
              return (['custom-elements-es5-adapter', 'main'].indexOf(chunk.name) === -1 && (chunk.name.indexOf('AoflUnitTestingPlugin') === -1));
            },
            minChunks: 2,
            minSize: 0,
            maxSize: 0,
            maxAsyncRequests: 5,
            maxInitialRequests: 3
          }
        }
      }
    }
  };

  return config;
};
