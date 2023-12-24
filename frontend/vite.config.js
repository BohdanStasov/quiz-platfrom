import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    port: 5173,
    strictPort: true,
  },
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    origin: "http://0.0.0.0:5173",
    proxy: {
      "/api": "http://127.0.0.1:8000/",
    },    
  },
})
