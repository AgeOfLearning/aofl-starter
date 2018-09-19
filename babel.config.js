module.exports = function(api) {
  const env = api.env();
  const presets = [
    '@babel/preset-env'
  ];

  const plugins = [
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-optional-chaining',
    [
      '@babel/plugin-transform-runtime',
      {
        'corejs': false,
        'helpers': false,
        'regenerator': true,
        'useESModules': false
      }
    ]
  ];

  if (env === 'test') {
    plugins.push([
      'istanbul',
      {
        'include': [
          '**/*.js'
        ],
        'exclude': [
          '**/node_modules/*',
          '**/*.spec.*',
          '**/tests-dest/*',
          '**/node_modules_sourced/*',
          '**/__config/*'
        ]
      }
    ]);
  }

  return {
    presets,
    plugins
  };
};
