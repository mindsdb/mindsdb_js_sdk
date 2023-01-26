// vite.config.ts
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://alpha.mindsdb.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/cloud': {
        target: 'https://alpha.mindsdb.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/cloud/, ''),
      },
    },
  },
  build: {
    sourcemap: false,
    manifest: true,
    minify: true,
    reportCompressedSize: true,
    lib: {
      entry: resolve(__dirname, 'lib/main.js'),
      name: 'MindsDB-SDK',
      fileName: 'mindsdb-js-sdk',
    },
  },
});
