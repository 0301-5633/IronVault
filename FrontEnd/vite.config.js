import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // 👈 Adds relative pathing for built assets
  server: {
    proxy: {
      '/api': { // All calls through api get routed to the proxy for the back end in dev
        target: 'https://127.0.0.1:8000',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
