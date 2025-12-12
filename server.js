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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// static
app.use(express.static(path.join(__dirname, "public")));

// health
app.get("/health", (req, res) => {
  res.json({ ok: true, message: "Backend çalışıyor ✅" });
/**
 * PAGES
 */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/explore", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "explore.html"));
});

app.get("/seller", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "seller.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

// expo & showroom
app.get(["/expo", "/expo/:slug", "/showroom", "/showroom/:slug"], (req, res) => {
  res.sendFile(path.join(__dirname, "public", "showroom.html"));
});

 
app.get("/api/companies", async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit || "12", 10), 50);
    const sector = (req.query.sector || "").trim();

    let q = supabase
      .from("companies")
      .select("id,name,slug,sector,country,city,website,created_at,updated_at")
      .order("created_at", { ascending: false })
      .limit(limit);

    if (sector) q = q.eq("sector", sector);

    const { data, error } = await q;
    if (error) return res.status(500).json({ error: error.message });

    res.json({ companies: data || [] });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

/**
 * PLANS
 */
app.get("/api/plans", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("membership_plans")
      .select("*")
      .eq("is_active", true)
      .order("product_limit", { ascending: true });

    if (error) return res.status(500).json({ error: error.message });
    res.json({ plans: data || [] });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get("/api/plans/home", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("membership_plans")
      .select("*")
      .eq("is_active", true)
      .order("featured", { ascending: false })
      .order("product_limit", { ascending: true })
      .limit(3);

    if (error) return res.status(500).json({ error: error.message });
    res.json({ plans: data || [] });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

/**
 * SECTORS (fallback)
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

    if (error || !data?.length) return res.json({ sectors: FALLBACK_SECTORS });
    res.json({ sectors: data.map((x) => x.name) });
  } catch (e) {
    res.json({ sectors: FALLBACK_SECTORS });
  }
});

/**
 * RFQ
 */
app.post("/api/rfq", async (req, res) => {
  try {
    const payload = req.body || {};
    const { data, error } = await supabase
      .from("rfqs")
      .insert([payload])
      .select()
      .single();

    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json({ ok: true, rfq: data });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

/**
 * EXPO DATA
 * GET /api/expo/:slug
 * company + membership limit + products + product_images
 */
app.get("/api/expo/:slug", async (req, res) => {
  try {
    const { slug } = req.params;

    // company
    const { data: company, error: eCompany } = await supabase
      .from("companies")
      .select("id,name,slug,sector,country,city,website,created_at,updated_at")
      .eq("slug", slug)
      .single();

    if (eCompany || !company) {
      return res.status(404).json({ company: null, products: [], error: "Firma bulunamadı" });
    }

    // membership plan -> product_limit
    const { data: membership } = await supabase
      .from("company_memberships")
      .select("status, plan_id, membership_plans ( product_limit, featured, code, name )")
      .eq("company_id", company.id)
      .eq("status", "active")
      .maybeSingle();

    const limit = membership?.membership_plans?.product_limit ?? 20;
    const featured = !!membership?.membership_plans?.featured;

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

    if (eProducts) return res.status(500).json({ error: eProducts.message });

    const normalized = (products || []).map((p) => ({
      ...p,
      product_images: (p.product_images || []).sort((a, b) => (a.sort ?? 1) - (b.sort ?? 1)),
    }));

    return res.json({ company, products: normalized, limit, featured });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Server running on port:", port));
