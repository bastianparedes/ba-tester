import path from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'build',
    emptyOutDir: false,
    minify: false,
    rollupOptions: {
      input: path.resolve(process.cwd(), 'src/script/index.ts'),
      output: {
        entryFileNames: 'script.js',
      },
    },
  },

  resolve: {
    alias: {
      '@/domain': path.resolve(process.cwd(), '..', 'domain'),
      '@': path.resolve(process.cwd(), 'src'),
    },
    extensions: ['.ts', '.js'],
  },
});
