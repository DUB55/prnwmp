import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true
  },
  define: {
    CESIUM_BASE_URL: JSON.stringify('/cesium/')
  },
  optimizeDeps: {
    exclude: ['cesium']
  },
  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks: {
          cesium: ['cesium']
        }
      }
    }
  }
})
