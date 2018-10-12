/* eslint-env node */

import webpack from 'webpack';
import nearest from 'find-nearest-file';
import CleanPlugin from 'clean-webpack-plugin';
import StatsPlugin from 'stats-webpack-plugin';
import glob from 'glob';

import path from 'path';

import base from '../vendor/github.com/sensu/sensu-go/dashboard/base.webpack.config.js';
import {outputPath as libOutputPath} from '../vendor/github.com/sensu/sensu-go/dashboard/lib.webpack.config.js';

export const context = path.dirname(nearest('package.json'));
export const outputPath = path.join(context, 'dist', 'module');
export const entryPath = path.join(context, 'src', 'module');

const chunkName =
  process.env.NODE_ENV !== 'production' ? '[name]' : '[name]_[chunkHash:8]';

export default base({
  context,

  entry: glob.sync(`${entryPath}/**/index.js`).reduce((entries, file) => {
    const match = /^(?:\/.*)\/(.*)\/index\.js$/.exec(file);
    if (match) {
      entries[match[1]] = file;
    }
    return entries;
  }, {}),

  output: {
    path: path.join(outputPath, 'public'),
  },

  plugins: [
    new CleanPlugin(outputPath, {root: context}),
    new webpack.DllReferencePlugin({
      context: path.join(
        __dirname,
        '../vendor/github.com/sensu/sensu-go/dashboard/',
      ),
      manifest: require(path.join(libOutputPath, 'lib.manifest.json')),
    }),
  ],
});
