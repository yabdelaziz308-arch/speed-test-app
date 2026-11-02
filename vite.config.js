import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  server: {
    watch: {
      ignored: ['**/node_modules/**', '**/dist/**', '**/.git/**']
    }
  }
})
