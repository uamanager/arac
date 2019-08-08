const environments = require('./environments');

const CleanWebpackPlugin = require('clean-webpack-plugin');

const webpackConfig = function (root, env, srcPath, distPath, customConfig = {}) {
  const _env = environments[env];

  return {
    mode: _env.name,
    context: srcPath,
    entry: {
      index: srcPath + "/index.ts"
    },
    output: {
      path: distPath
    },
    resolve: {
      extensions: [".ts", ".js", ".json"],
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          loader: 'ts-loader',
          exclude: _env.exclude,
          options: {
            configFile: _env.configFile
          }
        },
        {
          test: /\.node$/,
          use: 'node-loader'
        }
      ],
    },
    plugins: [
      new CleanWebpackPlugin(distPath, {
        root: root,
        allowExternal: true
      })
    ],
    target: 'node',
    ...customConfig
  };
};

module.exports = webpackConfig;
