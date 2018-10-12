/* eslint-env node */

import webpack from 'webpack';
import CleanPlugin from 'clean-webpack-plugin';

import vendorConfig from './vendorConfig.json';

import path from 'path';

import base from './base.webpack.config.js';

export const context = __dirname;
export const outputPath = path.join(context, 'dist', 'lib');

const lib = base({
  context,

  entry: {
    lib: [path.join(context, 'lib')].concat(vendorConfig),
  },

  output: {
    path: path.join(outputPath, 'public'),
  },

  plugins: [new CleanPlugin(outputPath, {root: context})],
});

lib.plugins.push(
  new webpack.DllPlugin({
    name: lib.output.library,
    path: path.join(outputPath, '[name].manifest.json'),
  }),
);

export default lib;
