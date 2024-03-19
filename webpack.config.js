const path = require('path');

module.exports = {
  cache: false,
  entry: {
    app: path.join(process.cwd(), 'script', 'index.ts')
  },
  mode: 'production',
  module: {
    rules: [
      {
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true
        },
        test: /\.ts?$/
      }
    ]
  },
  output: {
    filename: 'script.js',
    path: path.join(process.cwd(), 'dist')
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  stats: 'errors-only'
};
