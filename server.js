const express = require('express');
const path = require('path');
const app = express();

const port = process.env.PORT || 10000;

// dist klasörünü statik sun
app.use(express.static(path.join(__dirname, 'dist')));

// SPA fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda çalışıyor...`);
});
