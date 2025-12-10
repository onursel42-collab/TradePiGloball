// server.js
const express = require('express');
const path = require('path');
const app = express();

// Port ayarı (Render otomatik verir, olmazsa 3000)
const port = process.env.PORT || 3000;

// dist klasörünü public yap
app.use(express.static(path.join(__dirname, 'dist')));

// Vue router nedeniyle tüm yollar index'e yönlendirilmeli
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Sunucuyu başlat
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda çalışıyor...`);
});
