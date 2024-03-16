/* eslint-disable no-console */
import path from 'path';
// import { build } from 'vite';
import webpack from 'webpack';

import {
  getAudiencesForFrontend,
  getCampaignsForFrontend
} from '../prepare/utils/database';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
/* const buildFunctionVite = async () => {
  const config = async () => {
    return {
      assetsInclude: [],
      build: {
        copyPublicDir: false,
        emptyOutDir: false,
        minify: 'terser',
        rollupOptions: {
          input: {
            script: path.join(process.cwd(), 'prepare', 'script.ts')
          },
          output: {
            dir: path.join(process.cwd(), 'dist'),
            entryFileNames: 'script.js',
            format: 'umd'
          }
        }
      },
      cacheDir: 'node_modules/.vite',
      define: {
        INYECTED_AUDIENCES_DATA: JSON.stringify(
          await getAudiencesForFrontend()
        ),
        INYECTED_CAMPAIGNS_DATA: JSON.stringify(await getCampaignsForFrontend())
      },
      plugins: [
        {
          enforce: 'pre',
          exclude: /node_modules/,
          test: /\.(js|ts|jsx|tsx)$/,
          use: 'ts-loader'
        }
      ],
      resolve: {
        extensions: ['.tsx', '.ts', '.js']
      }
    };
  };

  await build(config() as any);
}; */

const buildFunctionWebpack = async () => {
  const INYECTED_AUDIENCES_DATA = JSON.stringify(
    await getAudiencesForFrontend()
  );
  const INYECTED_CAMPAIGNS_DATA = JSON.stringify(
    await getCampaignsForFrontend()
  );

  return new Promise((resolve, reject) => {
    webpack(
      {
        cache: false,
        entry: {
          app: path.join(process.cwd(), 'prepare', 'script.ts')
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
        plugins: [
          new webpack.DefinePlugin({
            INYECTED_AUDIENCES_DATA,
            INYECTED_CAMPAIGNS_DATA
          })
        ],
        resolve: {
          extensions: ['.ts', '.js']
        },
        stats: 'errors-only'
      },
      (err, stats) => {
        if (err || stats?.hasErrors()) {
          reject();
        } else {
          resolve(true);
        }
      }
    );
  });
};

export default buildFunctionWebpack;
