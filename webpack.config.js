// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require('path');

module.exports = {
  cache: false,
  entry: {
    app: path.join(process.cwd(), 'src', 'script', 'index.ts'),
  },
  mode: 'production',
  module: {
    rules: [
      {
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
        },
        test: /\.ts?$/,
      },
    ],
  },
  output: {
    filename: 'script.js',
    path: path.join(process.cwd(), 'dist'),
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@': path.join(process.cwd(), 'src'),
    },
  },
  stats: 'errors-only',
};
