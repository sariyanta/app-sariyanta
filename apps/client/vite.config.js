import tailwindcss from '@tailwindcss/vite';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import viteReact from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

// Helper to resolve paths correctly in ESM
const currentDir = new URL('.', import.meta.url).pathname;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite({
      autoCodeSplitting: true,
      routesDirectory: resolve(currentDir, './src/routes'),
      generatedRouteTree: resolve(currentDir, './src/routeTree.gen.ts'),
    }),
    viteReact(),
    tailwindcss(),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
  },
  resolve: {
    alias: {
      '@': resolve(currentDir, './src'),
    },
  },
  build: {
    outDir: resolve(currentDir, '../../dist/public'),
    emptyOutDir: true,
  },
});
