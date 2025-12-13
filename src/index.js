import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { escrowWebhookRouter } from "./escrow/webhook.js";

const app = express();

// ESM için __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Repo kök dizini (src'nin bir üstü)
const ROOT_DIR = path.resolve(__dirname, "..");

// 1) Health
app.get("/health", (req, res) => res.status(200).json({ ok: true }));

// 2) Pi validation-key.txt
// - Önce dosya varsa onu döndürür (kök dizindeki validation-key.txt)
// - Yoksa env PI_VALIDATION_KEY varsa onu döndürür
app.get("/validation-key.txt", async (req, res) => {
  res.setHeader("Content-Type", "text/plain; charset=utf-8");

  const filePath = path.join(ROOT_DIR, "validation-key.txt");
  try {
    const content = await fs.promises.readFile(filePath, "utf8");
    return res.status(200).send(content);
  } catch (err) {
    // Dosya yoksa env variable'ı dene
    if (process.env.PI_VALIDATION_KEY) {
      return res.status(200).send(process.env.PI_VALIDATION_KEY);
    }
    return res.status(404).send("PI validation key not found");
  }
});

// 3) Escrow webhook (kendi raw body parser'ını kullanır)
app.use("/webhooks/escrow", escrowWebhookRouter);

// 4) JSON body parser (webhook'tan sonra, diğer route'lar için)
app.use(express.json());

// 5) Statik dosyaları kökten servis et (index.html, assets, varliklar, vs.)
app.use(express.static(ROOT_DIR, { extensions: ["html"] }));

// 6) Ana sayfa: kökte index.html varsa onu bas
app.get("/", (req, res) => {
  const indexPath = path.join(ROOT_DIR, "index.html");
  res.sendFile(indexPath, (err) => {
    if (err) {
      // index.html yoksa fallback
      res.status(200).send(`
    <html>
      <head><title>TradePiGloball</title></head>
      <body style="font-family:Arial;padding:24px">
        <h1>TradePiGloball ✅</h1>
        <p>Site canlı. Frontend yakında.</p>
        <p><a href="/health">Health Check</a></p>
      </body>
    </html>
  `);
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`TradePiGloball running on port ${PORT}`));
