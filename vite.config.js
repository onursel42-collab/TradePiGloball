import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  // İŞTE BU EKSİKTİ 👇
  build: {
    outDir: 'dist', // Çıktı klasörünün adını 'dist' olarak zorluyoruz
  },
  server: {
    host: true
  }
})

