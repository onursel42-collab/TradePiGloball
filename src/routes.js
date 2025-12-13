import express from "express";
import { supabase } from "./supabaseClient.js";

export const router = express.Router();

/** Health */
router.get("/health", (req, res) => res.json({ ok: true, ts: Date.now() }));

/** Pages (real routing) */
router.get("/why", (req, res) => res.send(page("Why TradePiGlobal", "Showroom-first yaklaşım, doğrulama katmanları, güven odaklı B2B akışı.")));
router.get("/pi-ready", (req, res) => res.send(page("Pi-ready", "Pi entegrasyonu planlı. Şimdilik platform akışı + doğrulama + RFQ canlı.")));

router.get("/memberships", (req, res) => res.send(page("Memberships", membershipHtml())));
router.get("/categories", (req, res) => res.send(page("Categories", categoriesHtml())));

router.get("/signin", (req, res) => res.send(page("Sign in", signInHtml())));
router.get("/get-started", (req, res) => res.send(page("Get started", getStartedHtml())));

router.get("/showroom/new", (req, res) => res.send(page("Create Showroom", showroomFormHtml())));
router.get("/rfq/new", (req, res) => res.send(page("Create RFQ", rfqFormHtml())));
router.get("/supplier/apply", (req, res) => res.send(page("Supplier Application", supplierFormHtml())));
router.get("/catalog", (req, res) => res.send(page("Catalog", catalogHtml())));

/** API: create showroom */
router.post("/api/showrooms", async (req, res) => {
  const { company, name, email, category, country } = req.body || {};
  if (!company || !email) return res.status(400).json({ ok: false, error: "company and email required" });

  const { data, error } = await supabase
    .from("showrooms")
    .insert([{ company, name, email, category, country }])
    .select()
    .single();

  if (error) return res.status(500).json({ ok: false, error: error.message });
  res.json({ ok: true, data });
});

/** API: create rfq */
router.post("/api/rfq", async (req, res) => {
  const { buyer_company, contact_name, email, category, details, qty, target_price } = req.body || {};
  if (!buyer_company || !email || !details) return res.status(400).json({ ok: false, error: "buyer_company, email, details required" });

  const { data, error } = await supabase
    .from("rfq")
    .insert([{ buyer_company, contact_name, email, category, details, qty, target_price }])
    .select()
    .single();

  if (error) return res.status(500).json({ ok: false, error: error.message });
  res.json({ ok: true, data });
});

/** API: supplier apply */
router.post("/api/suppliers", async (req, res) => {
  const { company, name, email, categories, country, website } = req.body || {};
  if (!company || !email) return res.status(400).json({ ok: false, error: "company and email required" });

  const { data, error } = await supabase
    .from("suppliers")
    .insert([{ company, name, email, categories, country, website }])
    .select()
    .single();

  if (error) return res.status(500).json({ ok: false, error: error.message });
  res.json({ ok: true, data });
});

function page(title, body) {
  // mevcut sitenin CSS'ini bozmadan basit, koyu temaya uyumlu bir container
  return `
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>${escapeHtml(title)} — TradePiGlobal</title>
  <link rel="stylesheet" href="/assets/css/styles.css"/>
</head>
<body>
  <header class="site-header">
    <div class="container header-inner">
      <a class="logo" href="/" aria-label="TradePiGlobal">TradePiGlobal</a>
      <nav class="nav">
        <a href="/why">Why</a>
        <a href="/memberships">Memberships</a>
        <a href="/categories">Categories</a>
        <a href="/signin">Sign in</a>
        <a class="btn btn-primary" href="/get-started">Get started</a>
      </nav>
    </div>
  </header>

  <main class="container" style="padding:24px 0;">
    <h1 style="margin:0 0 12px;">${escapeHtml(title)}</h1>
    <div class="card" style="padding:18px;">
      ${body}
    </div>
  </main>

  <script src="/assets/js/main.js"></script>
  <script>
    // forms -> api
    async function postJSON(url, payload){
      const r = await fetch(url, {method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify(payload)});
      const j = await r.json().catch(()=>({}));
      if(!r.ok) throw new Error(j.error || "Request failed");
      return j;
    }
    document.addEventListener("submit", async (e)=>{
      const f = e.target;
      if(!f.dataset.api) return;
      e.preventDefault();
      const fd = new FormData(f);
      const payload = Object.fromEntries(fd.entries());
      try{
        const out = await postJSON(f.dataset.api, payload);
        f.reset();
        alert("Saved ✅");
        console.log(out);
      }catch(err){
        alert("Error: " + err.message);
      }
    });
  </script>
</body>
</html>`;
}

function escapeHtml(s=""){ return String(s).replace(/[&<>"']/g, c=>({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c])); }

function membershipHtml(){
  return `
  <p>Verified tiers: trust + capability levels. (V23: canlı akış + başvuru)</p>
  <ul>
    <li><b>Verified</b> — basic validation</li>
    <li><b>Pro</b> — catalog + RFQ priority</li>
    <li><b>Enterprise</b> — integrations + onboarding</li>
  </ul>
  <a class="btn btn-primary" href="/supplier/apply">Apply as Supplier</a>
  `;
}
function categoriesHtml(){
  return `
  <p>Pick a category to start:</p>
  <div style="display:flex;flex-wrap:wrap;gap:10px;">
    ${["Electronics","Furniture","Apparel","Industrial","Beauty","Automotive","Food & Beverage","Packaging"]
      .map(c=>`<a class="chip" href="/get-started?cat=${encodeURIComponent(c)}">${c}</a>`).join("")}
  </div>`;
}
function signInHtml(){
  return `
  <p>V23: Sign-in sayfası canlı. (Auth sonraki sprint)</p>
  <p><b>Şimdilik:</b> Get started ile lead topla + showroom/RFQ aç.</p>
  <a class="btn btn-primary" href="/get-started">Go to Get started</a>
  `;
}
function getStartedHtml(){
  return `
  <p>Choose your path:</p>
  <div style="display:flex;gap:10px;flex-wrap:wrap;">
    <a class="btn btn-primary" href="/showroom/new">Create Showroom</a>
    <a class="btn btn-outline" href="/rfq/new">Create RFQ</a>
    <a class="btn btn-outline" href="/supplier/apply">Supplier Apply</a>
  </div>
  `;
}
function showroomFormHtml(){
  return `
  <form data-api="/api/showrooms">
    <label>Company*</label><input name="company" required />
    <label>Contact name</label><input name="name" />
    <label>Email*</label><input name="email" type="email" required />
    <label>Category</label><input name="category" placeholder="e.g. Textiles" />
    <label>Country</label><input name="country" placeholder="Turkey" />
    <button class="btn btn-primary" type="submit">Create</button>
  </form>`;
}
function rfqFormHtml(){
  return `
  <form data-api="/api/rfq">
    <label>Buyer company*</label><input name="buyer_company" required />
    <label>Contact name</label><input name="contact_name" />
    <label>Email*</label><input name="email" type="email" required />
    <label>Category</label><input name="category" placeholder="e.g. Furniture" />
    <label>Quantity</label><input name="qty" />
    <label>Target price</label><input name="target_price" />
    <label>Details*</label><textarea name="details" required rows="5"></textarea>
    <button class="btn btn-primary" type="submit">Send RFQ</button>
  </form>`;
}
function supplierFormHtml(){
  return `
  <form data-api="/api/suppliers">
    <label>Company*</label><input name="company" required />
    <label>Contact name</label><input name="name" />
    <label>Email*</label><input name="email" type="email" required />
    <label>Categories</label><input name="categories" placeholder="Electronics, Apparel..." />
    <label>Country</label><input name="country" />
    <label>Website</label><input name="website" />
    <button class="btn btn-primary" type="submit">Apply</button>
  </form>`;
}
function catalogHtml(){
  return `
  <p>Catalog sayfası V23’te canlı. (ürün ekleme admin panel sprint)</p>
  <ul>
    <li><a href="/supplier/apply">Supplier olarak başvur</a></li>
    <li><a href="/rfq/new">RFQ oluştur</a></li>
  </ul>`;
}
