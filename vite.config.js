// vite.config.ts
import { resolve } from 'path'
import { defineConfig } from 'vite';

export default defineConfig({
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
