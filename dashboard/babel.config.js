const vendorConfig = require('../vendor/github.com/sensu/sensu-go/dashboard/vendorConfig.json');

const vendorAliases = {};

vendorConfig.forEach((package) => {
  vendorAliases[
    package
  ] = `../vendor/github.com/sensu/sensu-go/dashboard/node_modules/${package}`;
});

module.exports = {
  presets: [
    ['@babel/preset-env', {modules: false}],
    '@babel/preset-react',
    '@babel/preset-flow',
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-dynamic-import',
    [
      'module-resolver',
      {
        cwd: 'babelrc',
        alias: {
          '': './src/',
          '@sensu/lib': '../vendor/github.com/sensu/sensu-go/dashboard/lib',
          ...vendorAliases,
        },
      },
    ],
  ],
};
