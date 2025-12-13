import express from "express";
import { supabase } from "./supabaseClient.js";
import { assertLimit } from "./planGuard.js";

export const productsRouter = express.Router();

productsRouter.get("/products/new", (req, res) => {
  res.send(`
    <h2>New Product</h2>
    <form data-api="/api/products">
      <label>Company ID*</label><input name="company_id" required />
      <label>Name*</label><input name="name" required />
      <label>SKU</label><input name="sku" />
      <label>Price</label><input name="base_price" />
      <label>Currency</label><input name="currency" value="USD" />
      <button type="submit">Save</button>
    </form>
    <script>
      async function post(url,p){ const r=await fetch(url,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(p)}); 
        const j=await r.json(); if(!r.ok) throw new Error(j.error||"fail"); return j; }
      document.addEventListener("submit", async (e)=>{ 
        if(!e.target.dataset.api) return; e.preventDefault();
        const fd=new FormData(e.target); const payload=Object.fromEntries(fd.entries());
        try{ await post(e.target.dataset.api,payload); alert("Saved ✅"); e.target.reset(); }
        catch(err){ alert(err.message); }
      });
    </script>
  `);
});

productsRouter.post("/api/products", async (req, res) => {
  try {
    const { company_id, name, sku, base_price, currency } = req.body || {};
    if (!company_id || !name) return res.status(400).json({ ok:false, error:"company_id and name required" });

    await assertLimit({ company_id, kind: "product" });

    const { data, error } = await supabase
      .from("products")
      .insert([{ company_id, name, sku, base_price, currency }])
      .select()
      .single();

    if (error) return res.status(500).json({ ok:false, error:error.message });
    res.json({ ok:true, data });
  } catch (e) {
    res.status(403).json({ ok:false, error: e.message });
  }
});
