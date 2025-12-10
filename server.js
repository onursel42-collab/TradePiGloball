// Basit Express server: Vite'in build ettiği "dist" klasörünü serve eder

const express = require('express')
const path = require('path')

const app = express()
const port = process.env.PORT || 3000

// Vite build çıktısını (dist) statik olarak servis et
app.use(express.static(path.join(__dirname, 'dist')))

// Her route'ta Vue app'in ana HTML'ini gönder
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda çalışıyor...`)
})
