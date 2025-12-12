// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { supabase } from "./src/config/supabaseClient.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// __dirname (ESM için)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Statik dosyalar (public klasörü: index.html, styles.css, main.js vs.)
app.use(express.static("public"));

/**
 * HEALTH CHECK
 */
app.get("/health", (req, res) => {
  res.json({ ok: true, message: "TradePiGlobal backend çalışıyor ✅" });
});

/**
 * ANA SAYFA
 * / -> public/index.html
 */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

/**
 * API: TÜM PLANLAR (JSON)
 */
app.get("/api/plans", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("fair_plans")
      .select("*")
      .eq("is_active", true)
      .order("monthly_price", { ascending: true });

    if (error) {
      console.error("Supabase error (all plans):", error);
      return res.status(500).json({ error: "supabase error", details: error });
    }

    return res.json({ plans: data });
  } catch (err) {
    console.error("Server error (/api/plans):", err);
    return res
      .status(500)
      .json({ error: "server error", details: err.message });
  }
});

/**
 * API: ANA SAYFA İÇİN ÖNE ÇIKAN 3 PLAN
 */
app.get("/api/plans/home", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("fair_plans")
      .select("*")
      .eq("is_active", true)
      .eq("is_featured", true)
      .order("monthly_price", { ascending: true })
      .limit(3);

    if (error) {
      console.error("Supabase error (home plans):", error);
      return res.status(500).json({ error: "supabase error", details: error });
    }

    return res.json({ plans: data });
  } catch (err) {
    console.error("Server error (/api/plans/home):", err);
    return res
      .status(500)
      .json({ error: "server error", details: err.message });
  }
});

/**
 * /plans -> TÜM PAKETLERİ LİSTELEYEN HTML SAYFASI
 */
function buildPlansHtml(plans) {
  return `<!doctype html>
<html lang="tr">
<head>
  <meta charset="utf-8" />
  <title>Satıcı Üyelik Paketleri | TradePiGlobal</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="stylesheet" href="/styles.css" />
</head>
<body class="plans-shell">
  <h1>Satıcı Üyelik Paketleri</h1>
  <p class="subtitle">Veriler Supabase fair_plans tablosundan canlı gelir.</p>

  <div class="plans-grid">
    ${plans
      .map(
        (p) => `
      <article class="plan-card">
        <div class="plan-card-header">
          ${p.badge ? `<span class="badge">${p.badge}</span>` : ""}
          <h2>${p.name}</h2>
          ${p.segment ? `<p class="segment">${p.segment}</p>` : ""}
        </div>
        <p class="slot-info">${p.slot_count} slot · ${p.description || ""}</p>
        <div class="price-block">
          <p><strong>Aylık:</strong> ${p.monthly_price.toLocaleString(
            "tr-TR"
          )} ₺</p>
          <p><strong>3 Aylık:</strong> ${p.quarterly_price.toLocaleString(
            "tr-TR"
          )} ₺</p>
          <p><strong>Yıllık:</strong> ${p.yearly_price.toLocaleString(
            "tr-TR"
          )} ₺</p>
        </div>
        <p class="meta">
          TL · USD · Pi yapılandırılabilir
        </p>
      </article>
    `
      )
      .join("")}
  </div>

  <footer class="plans-footer">
    <a href="/" class="back-link">← Ana sayfaya dön</a>
  </footer>
</body>
</html>`;
}

app.get("/plans", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("fair_plans")
      .select("*")
      .eq("is_active", true)
      .order("monthly_price", { ascending: true });

    if (error) {
      console.error("Supabase error (/plans):", error);
      return res.status(500).send("Planlar yüklenemedi.");
    }

    const html = buildPlansHtml(data || []);
    res.send(html);
  } catch (err) {
    console.error("Server error (/plans):", err);
    res.status(500).send("Sunucu hatası.");
  }
});

/**
 * API: SEKTÖRLER
 */
const FALLBACK_SECTORS = [
  "Sanayi & Üretim",
  "Gıda & Tarım",
  "Tekstil & Konfeksiyon",
  "Elektronik & Cihazlar",
  "Yapı & İnşaat",
  "Mobilya & Dekorasyon",
  "Kimya & Plastikler",
  "Lojistik & Taşımacılık",
  "Enerji & Maden",
  "Sağlık & Medikal",
];

app.get("/api/sectors", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("sectors")
      .select("name")
      .order("id", { ascending: true });

    if (error) {
      console.warn(
        "Supabase error (sectors), fallback kullanılacak:",
        error.message
      );
      return res.json({ sectors: FALLBACK_SECTORS });
    }

    if (!data || data.length === 0) {
      return res.json({ sectors: FALLBACK_SECTORS });
    }

    return res.json({ sectors: data.map((s) => s.name) });
  } catch (err) {
    console.error("Server error (/api/sectors):", err);
    return res.json({ sectors: FALLBACK_SECTORS });
  }
});

/**
 * RFQ OLUŞTURMA - API
 */
app.post("/api/rfq", async (req, res) => {
  try {
    const payload = req.body || {};

    const { data, error } = await supabase
      .from("rfqs")
      .insert([payload])
      .select()
      .single();

    if (error) {
      console.error("Supabase error (/api/rfq):", error);
      return res.status(500).json({ error: "supabase error", details: error });
    }

    return res.status(201).json({ ok: true, rfq: data });
  } catch (err) {
    console.error("Server error (/api/rfq):", err);
    return res
      .status(500)
      .json({ error: "server error", details: err.message });
  }
});

/**
 * RFQ FORM SAYFASI
 */
app.get("/rfq", (req, res) => {
  res.send(`<!doctype html>
<html lang="tr">
<head>
  <meta charset="utf-8" />
  <title>RFQ Oluştur | TradePiGlobal</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="stylesheet" href="/styles.css" />
</head>
<body class="rfq-shell">
  <h1>RFQ / Teklif Talebi Oluştur</h1>
  <form class="rfq-form" method="post" action="/api/rfq">
    <label>Firma Adı
      <input name="company_name" required />
    </label>
    <label>İlgili Kişi
      <input name="contact_name" />
    </label>
    <label>E-posta
      <input type="email" name="email" />
    </label>
    <label>Telefon
      <input name="phone" />
    </label>
    <label>Sektör
      <input name="sector" />
    </label>
    <label>Ürün / Talep Başlığı
      <input name="product_title" required />
    </label>
    <label>Miktar
      <input type="number" step="0.01" name="quantity" />
    </label>
    <label>Birim
      <input name="unit" />
    </label>
    <label>Hedef Ülke
      <input name="target_country" />
    </label>
    <label>Hedef Fiyat
      <input type="number" step="0.01" name="target_price" />
    </label>
    <label>Para Birimi
      <input name="currency" placeholder="USD, EUR, TL, Pi..." />
    </label>
    <label>Notlar
      <textarea name="notes"></textarea>
    </label>

    <button type="submit">RFQ Gönder</button>
  </form>

  <p><a href="/">← Ana sayfaya dön</a></p>
</body>
</html>`);
});

/**
 * DİJİTAL EXPO SAYFASI (PLACEHOLDER)
 */
app.get("/expo", (req, res) => {
  res.send(`<!doctype html>
<html lang="tr">
<head>
  <meta charset="utf-8" />
  <title>3D Digital Expo | TradePiGlobal</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="stylesheet" href="/styles.css" />
</head>
<body class="expo-shell">
  <h1>3D Digital Expo</h1>
  <p>Bu alan 3D dijital fuar alanının önizlemesi içindir.</p>
  <p>Tam sürümde Unreal Engine / Babylon.js sahnesi buraya gömülecek.</p>

  <div class="expo-placeholder">
    3D sahne için placeholder alan
  </div>

  <p><a href="/">← Ana sayfaya dön</a></p>
</body>
</html>`);
});

/**
 * SUNUCUYU BAŞLAT
 */
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server running at port:", port);
});
