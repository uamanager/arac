const path = require('path');
const configurator = require('./config/webpack.config');

const env = 'prod';
const src = path.resolve(__dirname, 'src');
const dist = path.resolve(__dirname, 'lib');

const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  ...configurator(__dirname, env, src, dist, {
    plugins: [
      new CleanWebpackPlugin([dist], {
        root: __dirname,
        allowExternal: true
      })
    ],
  })
};
