import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';

export default defineConfig(() => {
  return {
    base: '/playout/',
    resolve: {
      alias: {
        '~': resolve(__dirname, './src'),
      },
    },
    build: {
      outDir: 'build/playout',
      rollupOptions: {
        input: {
          main: resolve(__dirname, "index.html"),
        },
      },
    },
    plugins: [react(), eslint()],
  };
});
