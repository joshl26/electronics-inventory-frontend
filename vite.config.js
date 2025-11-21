import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      data: path.resolve(__dirname, 'src/data'),
      context: path.resolve(__dirname, 'src/context'),
      config: path.resolve(__dirname, 'src/config'),
      components: path.resolve(__dirname, 'src/components'),
      features: path.resolve(__dirname, 'src/features'),
      auth: path.resolve(__dirname, 'src/features/auth'),
      shared: path.resolve(__dirname, 'src/shared'),
      app: path.resolve(__dirname, 'src/app'),
      utils: path.resolve(__dirname, 'src/utils'),
      hooks: path.resolve(__dirname, 'src/hooks'),
      img: path.resolve(__dirname, 'src/img'),
      svg: path.resolve(__dirname, 'src/svg'),
    },
  },
});