import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 10000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// statik dosyalar
app.use(express.static(__dirname));

// ana sayfa
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// health check (Render sever)
app.get("/health", (req, res) => {
  res.send("OK");
});

app.listen(PORT, () => {
  console.log("Server listening on port", PORT);
});
