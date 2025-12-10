import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  // Render'ın Node web service'i ile port kavgası olmasın
  server: {
    host: true
  }
})
