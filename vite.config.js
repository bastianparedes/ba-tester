import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  assetsInclude: [],
  build: {
    copyPublicDir: false,
    emptyOutDir: false,
    minify: 'terser',
    rollupOptions: {
      input: {
        script: path.join(process.cwd(), 'prepare', 'script.ts'),
      },
      output: {
        dir: path.join(process.cwd(), 'dist'),
        entryFileNames: 'script.js',
        format: 'umd',
      },
    },
  },
  cacheDir: 'node_modules/.vite',
  plugins: [
    {
      enforce: 'pre',
      exclude: /node_modules/,
      test: /\.(js|ts|jsx|tsx)$/,
      use: 'ts-loader',
    },
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
});
