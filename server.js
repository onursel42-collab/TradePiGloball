import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

// ESM için __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// JSON body parser
app.use(express.json());

// Statik dosyaları servis et
app.use("/assets", express.static(path.join(__dirname, "assets")));
app.use("/varliklar", express.static(path.join(__dirname, "varliklar")));
app.use("/src", express.static(path.join(__dirname, "src")));
app.use("/pages", express.static(path.join(__dirname, "pages")));

// Ana sayfa - index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ ok: true, timestamp: new Date().toISOString() });
});

// validation-key.txt endpoint
app.get("/validation-key.txt", (req, res) => {
  res.sendFile(path.join(__dirname, "validation-key.txt"));
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`TradePiGloball Web Service listening on port ${PORT}`);
});
