import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { router } from "./routes.js";

const app = express();
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Repo root: src/..
// Statik dosyaları root’tan servis ediyoruz (index.html + assets)
const repoRoot = path.resolve(__dirname, "..");
app.use("/assets", express.static(path.join(repoRoot, "assets")));
app.use(express.static(repoRoot));

// Pages + API
app.use(router);

// Root index.html’i ver
app.get("/", (req, res) => res.sendFile(path.join(repoRoot, "index.html")));

const port = process.env.PORT || 10000;
app.listen(port, () => console.log(`Listening on ${port}`));
