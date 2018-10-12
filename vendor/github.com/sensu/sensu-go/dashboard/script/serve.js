#!/usr/bin/env node -r source-map-support/register -r esm
/* eslint-disable no-console */

import express from 'express';

import path from 'path';

import clientConfig, {
  outputPath as clientOutputPath,
} from '../client.webpack.config';
import libConfig, {outputPath as libOutputPath} from '../lib.webpack.config';

const clientStats = require(path.join(clientOutputPath, 'stats.json'));
const libStats = require(path.join(libOutputPath, 'stats.json'));

const app = express();

app.use(express.static(libConfig.output.path));
app.use(express.static(clientConfig.output.path));

const mapAssets = (stats) =>
  Object.keys(stats.assetsByChunkName)
    .map((key) => {
      const chunks = Array.isArray(stats.assetsByChunkName[key])
        ? stats.assetsByChunkName[key]
        : [stats.assetsByChunkName[key]];

      return chunks
        .filter((file) => /\.js$/.test(file))
        .map((file) => `    <script src="${file}"></script>`)
        .join('/n');
    })
    .join('/n');

const index = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="initial-scale=1, viewport-fit=cover">
    <title>Sensu Web UI</title>
  </head>
  <body>
${mapAssets(libStats)}
${mapAssets(clientStats)}
  </body>
</html>
`;

app.get('*', (req, res) => {
  res.end(index);
});

app.listen(8080, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Listening at http://localhost:8080/');
  }
});
