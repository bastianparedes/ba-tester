const path = require('path');

const entryPath = path.join(__dirname, 'prepare', 'generateScript.ts');
const outputPath = path.join(__dirname, 'public');

module.exports = {
  cache: false,
  entry: {
    app: entryPath
  },
  mode: 'production',
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.ts?$/,
        use: 'ts-loader'
      }
    ]
  },
  output: {
    filename: 'script.js',
    path: outputPath
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  }
};
