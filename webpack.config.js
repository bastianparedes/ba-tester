const path = require('path');
const WebpackShellPluginNext = require('webpack-shell-plugin-next');

const entryPath = path.join(__dirname, 'prepare', 'generateScript.ts');
const outputPath = path.join(__dirname, 'dist');

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
  plugins: [
    new WebpackShellPluginNext({
      onAfterDone: {
        blocking: true,
        parallel: false,
        scripts: [
          'echo "Generating campaigns.js"',
          'npx ts-node prepare/generateScriptWithCampaigns.ts'
        ]
      }
    })
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  stats: 'errors-only'
};
