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

// __dirname (ESM)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// public klasörü statik (index.html, showroom.html vs.)
app.use(express.static(path.join(__dirname, "public")));

// Health
app.get("/health", (req, res) => {
  res.json({ ok: true, message: "Backend çalışıyor ✅" });
});

// Expo sayfaları
app.get(["/expo", "/expo/:slug", "/showroom", "/showroom/:slug"], (req, res) => {
  res.sendFile(path.join(__dirname, "public", "showroom.html"));
});

// Expo API
app.get("/api/expo/:slug", async (req, res) => {
  try {
    const { slug } = req.params;

    // 1) company
    const { data: company, error: eCompany } = await supabase
      .from("companies")
      .select("id,name,slug,sector,country,city,website,created_at,updated_at")
      .eq("slug", slug)
      .single();

    if (eCompany || !company) {
      return res
        .status(404)
        .json({ company: null, products: [], error: "Firma bulunamadı" });
    }

    // 2) plan/limit
    const { data: membership } = await supabase
      .from("company_memberships")
      .select("status, plan_id, membership_plans ( product_limit, featured, code, name )")
      .eq("company_id", company.id)
      .eq("status", "active")
      .maybeSingle();

    const limit = membership?.membership_plans?.product_limit ?? 20;
    const featured = !!membership?.membership_plans?.featured;

    // 3) products  ✅ BURASI DEĞİŞTİ (product_images eklendi)
    const { data: products, error: eProducts } = await supabase
      .from("products")
      .select(`
        id,
        company_id,
        category_id,
        name,
        sku,
        description,
        base_price,
        currency,
        moq,
        weight_kg,
        width_cm,
        height_cm,
        length_cm,
        hs_code,
        is_active,
        created_at,
        updated_at,
        product_images ( image_url, sort )
      `)
      .eq("company_id", company.id)
      .eq("is_active", true)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (eProducts) {
      return res.status(500).json({ error: eProducts.message });
    }

    return res.json({
      company,
      products: products || [],
      limit,
      featured,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Ana sayfa garanti
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Server running on port:", port));
