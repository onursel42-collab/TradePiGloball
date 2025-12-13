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

// JSON body (webhook vs.)
app.use(express.json());

// 1) Health
app.get("/health", (req, res) => res.status(200).json({ ok: true }));

// 2) Pi validation-key.txt
// - Önce dosya varsa onu döndürür (kök dizindeki validation-key.txt)
// - Yoksa env PI_VALIDATION_KEY varsa onu döndürür
app.get("/validation-key.txt", (req, res) => {
  res.setHeader("Content-Type", "text/plain; charset=utf-8");

  const filePath = path.join(ROOT_DIR, "validation-key.txt");
  if (fs.existsSync(filePath)) {
    return res.status(200).send(fs.readFileSync(filePath, "utf8"));
  }

  if (process.env.PI_VALIDATION_KEY) {
    return res.status(200).send(process.env.PI_VALIDATION_KEY);
  }

  return res.status(404).send("PI validation key not found");
});

// 3) Escrow webhook
app.use("/webhooks/escrow", escrowWebhookRouter);

// 4) Statik dosyaları kökten servis et (index.html, assets, varliklar, vs.)
app.use(express.static(ROOT_DIR, { extensions: ["html"] }));

// 5) Ana sayfa: kökte index.html varsa onu bas
app.get("/", (req, res) => {
  const indexPath = path.join(ROOT_DIR, "index.html");
  if (fs.existsSync(indexPath)) return res.sendFile(indexPath);

  // index.html yoksa fallback
  return res.status(200).send(`
    <html>
      <head><title>TradePiGloball</title></head>
      <body style="font-family:Arial;padding:24px">
        <h1>TradePiGloball ✅</h1>
        <p>Site canlı. Frontend yakında.</p>
        <p><a href="/health">Health Check</a></p>
      </body>
    </html>
  `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`TradePiGloball running on port ${PORT}`));
