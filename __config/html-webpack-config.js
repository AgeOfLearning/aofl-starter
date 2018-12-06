const jsStringEscape = require('js-string-escape');

module.exports = (environment = 'production') => {
  return {
    inject: false,
    minify: {
      minifyJS: environment === 'production',
      minifyCSS: environment === 'production',
      collapseWhitespace: environment === 'production',
      removeComments: environment === 'production'
    },
    cache: true,
    alwaysWriteToDisk: true,
    templateParameters(compilation, assets, options) {
      let assetsMap = {};

      for (const key in compilation.chunks) {
        if (!compilation.chunks.hasOwnProperty(key)) continue;
        const chunk = compilation.chunks[key];
        if (typeof chunk.name === 'string' && chunk.name.length > 0) {
          const url = assets.publicPath + chunk.files[0];
          const source = compilation.assets[chunk.files[0].replace(/\?.*/, '')].source();
          let sourceStr = jsStringEscape(source);
          assetsMap[chunk.name] = {
            url,
            source,
            sourceStr
          };
        }
      }

      return {
        compilation: compilation,
        webpack: compilation.getStats().toJson(),
        webpackConfig: compilation.options,
        htmlWebpackPlugin: {
          files: assets,
          options: options
        },
        assetsMap
      };
    }
  };
};
