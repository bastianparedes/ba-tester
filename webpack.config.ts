import path from 'path';
import WebpackShellPluginNext from 'webpack-shell-plugin-next';

const entryPath = path.join(__dirname, 'prepare', 'generateScript.ts');
const outputPath = path.join(__dirname, 'dist');

export default async (): Promise<any> => {
  return {
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
        },
        onBeforeNormalRun: {
          blocking: true,
          parallel: false,
          scripts: ['echo "Generating script.js"']
        }
      })
    ],
    resolve: {
      extensions: ['.tsx', '.ts', '.js']
    },
    stats: 'errors-only'
  };
};
