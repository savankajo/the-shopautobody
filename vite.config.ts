import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
      // FIX (Critical): Required for BrowserRouter in development.
      // Without this, refreshing the page on any route other than /
      // returns a 404 from the Vite dev server.
      // For production (GitHub Pages), this is handled by 404.html.
    },
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    },
    // FIX (Critical): Tells Vite's preview server to serve index.html
    // for all routes — mirrors the 404.html production fix.
    preview: {
      port: 3000,
    },
  };
});
