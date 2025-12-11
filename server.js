
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { supabase } from "./src/config/supabaseClient.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
// Sağlık kontrolü (test)
app.get("/", (req, res) => {
  res.send("TradePiGloball Backend Çalışıyor ✔");
});

// 🔹 API endpoint: JSON döner
app.get("/api/plans", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("fair_plans")
      .select("*")
      .order("monthly_price", { ascending: true });

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({ error: "supabase error", details: error });
    }

    return res.json({ plans: data });
  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({
      error: "server error",
      details: err.message,
    });
  }
});

// 🔹 HTML sayfa için helper
function buildPlansHtml(plans) {
  return `<!doctype html>
<html lang="tr">
<head>
  <meta charset="utf-8" />
  <title>Satıcı Üyelik Paketleri | TradePiGlobal</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    body {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      margin: 0;
      padding: 24px;
      background: #020617;
      color: #f9fafb;
    }
    h1 {
      margin: 0 0 16px 0;
      font-size: 24px;
    }
    .subtitle {
      margin-bottom: 24px;
      color: #9ca3af;
      font-size: 14px;
    }
    .grid {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
    }
    .card {
      background: #030712;
      border-radius: 16px;
      padding: 16px 18px;
      width: 100%;
      max-width: 320px;
      box-shadow: 0 18px 35px rgba(15, 23, 42, 0.6);
      border: 1px solid #1f2937;
    }
    .badge {
      display: inline-block;
      font-size: 11px;
      padding: 2px 8px;
      border-radius: 999px;
      border: 1px solid #22c55e;
      color: #bbf7d0;
      background: rgba(34, 197, 94, 0.12);
      margin-bottom: 6px;
    }
    .name {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 4px;
    }
    .slot {
      font-size: 13px;
      color: #9ca3af;
      margin-bottom: 8px;
    }
    .desc {
      font-size: 13px;
      color: #e5e7eb;
      margin-bottom: 12px;
      min-height: 40px;
    }
    .price-row {
      font-size: 14px;
      margin-bottom: 4px;
    }
    .price-row strong {
      color: #e5e7eb;
    }
    .footer {
      margin-top: 24px;
      font-size: 12px;
      color: #6b7280;
    }
  </style>
</head>
<body>
  <h1>Satıcı Üyelik Paketleri</h1>
  <div class="subtitle">TradePiGlobal fair_plans tablosundan canlı veri ⚡</div>

  <div class="grid">
    ${plans
      .map(
        (p) => `
      <div class="card">
        <div class="badge">${p.is_active ? "Aktif Paket" : "Pasif Paket"}</div>
        <div class="name">${p.name}</div>
        <div class="slot">${p.slot_count || 0} slot • ${p.level || "Genel seviye"}</div>
        <div class="desc">${p.description || ""}</div>
        <div class="price-row"><strong>Aylık:</strong> ${p.monthly_price} ₺</div>
        <div class="price-row"><strong>3 Aylık:</strong> ${p.quarterly_price} ₺</div>
        <div class="price-row"><strong>Yıllık:</strong> ${p.yearly_price} ₺</div>
      </div>
    `
      )
      .join("")}
  </div>

  <div class="footer">
    Backend: Node + Express • DB: Supabase • Domain: tradepigloball.co
  </div>
</body>
</html>`;
}

// 🔹 HTML endpoint: okunabilir paket listesi
app.get("/plans", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("fair_plans")
      .select("*")
      .order("monthly_price", { ascending: true });

    if (error) {
      console.error("Supabase error:", error);
      return res
        .status(500)
        .send(`<h1>Supabase Hatası</h1><pre>${error.message}</pre>`);
    }

    const html = buildPlansHtml(data || []);
    return res.send(html);
  } catch (err) {
    console.error("Server error:", err);
    return res
      .status(500)
      .send(`<h1>Sunucu Hatası</h1><pre>${err.message}</pre>`);
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Server running at port:", port);
});
