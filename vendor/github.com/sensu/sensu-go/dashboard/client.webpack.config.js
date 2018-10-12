/* eslint-env node */

import webpack from 'webpack';
import CleanPlugin from 'clean-webpack-plugin';

import path from 'path';

import base from './base.webpack.config.js';

import {outputPath as libOutputPath} from './lib.webpack.config.js';

export const context = __dirname;
export const outputPath = path.join(context, 'dist', 'client');
export const entryPath = path.join(context, 'src');

export default base({
  context: context,

  entry: {
    client: [entryPath],
  },

  output: {
    path: path.join(outputPath, 'public'),
  },

  plugins: [
    new CleanPlugin(outputPath, {root: context}),
    new webpack.DllReferencePlugin({
      manifest: require(path.join(libOutputPath, 'lib.manifest.json')),
    }),
  ],
});
