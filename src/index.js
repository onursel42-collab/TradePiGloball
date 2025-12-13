import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 10000;
const publicDir = path.join(__dirname, "..", "public");

app.use(express.static(publicDir));
app.get("/health", (_req, res) => res.status(200).send("ok"));
app.get("*", (_req, res) => res.sendFile(path.join(publicDir, "index.html")));

app.listen(PORT, "0.0.0.0", () => console.log(`listening ${PORT}`));
