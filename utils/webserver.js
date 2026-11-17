// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const config = require('../webpack.config');
const env = require('./env');
const path = require('path');

config.plugins = [new webpack.HotModuleReplacementPlugin()].concat(
  config.plugins || []
);

const compiler = webpack(config);

const server = new WebpackDevServer(
  {
    host: '0.0.0.0',
    port: env.PORT,
    hot: true,
    static: {
      directory: path.join(__dirname, '../build'),
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    allowedHosts: 'all',
    devMiddleware: {
      writeToDisk: true,
    },
  },
  compiler
);

server.start().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
