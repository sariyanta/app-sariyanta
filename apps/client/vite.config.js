import tailwindcss from '@tailwindcss/vite';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import viteReact from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite({
      autoCodeSplitting: true,
      routesDirectory: resolve(__dirname, './src/routes'),
      generatedRouteTree: resolve(__dirname, './src/routeTree.gen.ts'),
    }),
    viteReact(),
    tailwindcss(),
    viteStaticCopy({
      targets: [
        {
          src: resolve(__dirname, './public'),
          dest: '',
        },
      ],
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: resolve(__dirname, '../../dist'),
    emptyOutDir: false,
  },
});
