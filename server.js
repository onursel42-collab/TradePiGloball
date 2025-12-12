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

// __dirname ayarı (ESM)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Statik dosyalar: public klasörü (index.html, styles.css, main.js)
app.use(express.static(path.join(__dirname, "public")));

// Sağlık kontrolü
app.get("/health", (req, res) => {
  res.json({ ok: true, message: "TradePiGlobal backend çalışıyor ✅" });
});

// TÜM PLANLAR (JSON)
app.get("/api/plans", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("fair_plans")
      .select("*")
      .eq("is_active", true)
      .order("monthly_price", { ascending: true });

    if (error) {
      console.error("Supabase error (/api/plans):", error);
      return res.status(500).json({ error: "supabase error", details: error });
    }

    res.json({ plans: data || [] });
  } catch (err) {
    console.error("Server error (/api/plans):", err);
    res.status(500).json({ error: "server error", details: err.message });
  }
});

// ANA SAYFA İÇİN 3 ÖNE ÇIKAN PLAN
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
      console.error("Supabase error (/api/plans/home):", error);
      return res.status(500).json({ error: "supabase error", details: error });
    }

    res.json({ plans: data || [] });
  } catch (err) {
    console.error("Server error (/api/plans/home):", err);
    res.status(500).json({ error: "server error", details: err.message });
  }
});

// Sektör listesi (fallback'li)
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
      console.warn("Supabase error (sectors), fallback kullanılacak:", error.message);
      return res.json({ sectors: FALLBACK_SECTORS });
    }

    if (!data || data.length === 0) {
      return res.json({ sectors: FALLBACK_SECTORS });
    }

    res.json({ sectors: data.map((s) => s.name) });
  } catch (err) {
    console.error("Server error (/api/sectors):", err);
    res.json({ sectors: FALLBACK_SECTORS });
  }
});

// RFQ kaydetme API
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

    res.status(201).json({ ok: true, rfq: data });
  } catch (err) {
    console.error("Server error (/api/rfq):", err);
    res.status(500).json({ error: "server error", details: err.message });
  }
});

// Ana sayfa (index.html) – garanti olsun diye
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// SUNUCU
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server running at port:", port);
});
