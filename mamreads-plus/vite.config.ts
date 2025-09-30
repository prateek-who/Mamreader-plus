import { defineConfig } from 'vite';
import path from 'path';
import fs from 'fs';
import pkg from './package.json';

// Read userscript meta template and replace version placeholder
const meta = fs
  .readFileSync(path.resolve(__dirname, 'userscript.meta.js'), 'utf-8')
  .replace('__VERSION__', pkg.version);

export default defineConfig({
  build: {
    outDir: 'dist',
    target: 'esnext',
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'MamreadsPlus',
      formats: ['iife'], // immediately-invoked for userscripts
      fileName: () => 'mamreads-plus.user.js', // important: .user.js extension
    },
    minify: false, // optional, but safer for userscripts
    rollupOptions: {
      output: {
        banner: meta, // prepend header
      },
    },
  },
});
