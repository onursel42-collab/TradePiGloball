import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  // Render port ayarlarıyla çakışmaması için
  server: {
    host: true
  }
})
