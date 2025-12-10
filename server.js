const express = require('express');
const path = require('path');
const app = express();

// Port ayarı (Render otomatik atar)
const port = process.env.PORT || 3000;

// Vue'nun oluşturacağı "dist" klasörünü dışarıya aç
app.use(express.static(path.join(__dirname, 'dist')));

// Herhangi bir sayfaya girilirse ana sayfayı gönder
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda çalışıyor...`);
});
