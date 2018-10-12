/* eslint-env node */

import webpack from 'webpack';
import StatsPlugin from 'stats-webpack-plugin';

const chunkName =
  process.env.NODE_ENV !== 'production' ? '[name]' : '[name]_[chunkHash:8]';

export default ({
  context,
  entry,
  output,
  plugins,
  module: {rules = [], ...module} = {},
  ...config
} = {}) => ({
  context,
  target: 'web',
  mode: process.env.NODE_ENV !== 'production' ? 'development' : 'production',
  devtool: process.env.NODE_ENV !== 'production' ? 'source-map' : 'false',

  entry: {
    ...entry,
  },

  output: {
    filename: `${chunkName}.js`,
    chunkFilename: `${chunkName}.js`,
    library: chunkName,
    ...output,
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: require.resolve('source-map-loader'),
        },
        enforce: 'pre',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: require.resolve('babel-loader'),
        },
      },
      ...rules,
    ],
    ...module,
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new StatsPlugin('../stats.json', {
      chunks: false,
      chunkGroups: false,
      chunkModules: false,
      modules: false,
    }),
    ...plugins,
  ],

  ...config,
});
