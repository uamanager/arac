module.exports = {
  dev: {
    name: 'development',
    configFile: 'config/tsconfig.dev.json',
    exclude: undefined,
  },
  prod: {
    name: 'production',
    configFile: 'config/tsconfig.prod.json',
    exclude: /node_modules/,
  }
};