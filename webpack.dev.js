const path = require('path');
const configurator = require('./config/webpack.config');

const env = 'dev';
const src = path.resolve(__dirname, 'src');
const dist = path.resolve(__dirname, 'lib');

module.exports = {
  ...configurator(__dirname, env, src, dist)
};
