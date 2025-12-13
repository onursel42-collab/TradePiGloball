import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 10000;
const PUBLIC_DIR = path.join(__dirname, "..", "public");

app.use(express.static(PUBLIC_DIR));

app.get("/health", (_, res) => res.send("ok"));

app.get("*", (_, res) =>
  res.sendFile(path.join(PUBLIC_DIR, "index.html"))
);

app.listen(PORT, "0.0.0.0", () => {
  console.log("TradePiGlobal running");
});
