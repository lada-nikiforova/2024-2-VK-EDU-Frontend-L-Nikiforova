import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/

export default defineConfig({
  plugins: [react()],
  base: "/2024-2-VK-EDU-Frontend-L-Nikiforova/",
  server: {
    proxy: {
      '/api': {
        target: 'https://api.mymemory.translated.net/get',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
    watch: {
      usePolling: true,
    },
  },
});