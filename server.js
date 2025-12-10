// server.js
const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Vue'nun build ettiği "dist" klasörünü statik olarak servis et
app.use(express.static(path.join(__dirname, 'dist')));

// Herhangi bir route'a girilince SPA'nin ana sayfasını döndür
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Sunucuyu başlat
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda çalışıyor...`);
});
