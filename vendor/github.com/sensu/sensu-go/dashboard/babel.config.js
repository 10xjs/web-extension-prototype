/* eslint-disable metalab/import/no-commonjs */

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
      },
    ],
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
          '': './src',
          '@sensu/lib': './lib',
        },
      },
    ],
  ],
};
