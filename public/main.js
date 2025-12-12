const $ = (sel) => document.querySelector(sel);

let activeSector = "";

async function fetchJSON(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}

function chip(label, active, onClick) {
  const b = document.createElement("button");
  b.className = "chip" + (active ? " active" : "");
  b.type = "button";
  b.textContent = label;
  b.addEventListener("click", onClick);
  return b;
}

async function loadSectors() {
  const box = $("#sectorChips");
  if (!box) return;

  box.innerHTML = "";
  const all = chip("Tümü", activeSector === "", () => {
    activeSector = "";
    loadCompanies();
    loadSectors();
  });
  box.appendChild(all);

  try {
    const { sectors } = await fetchJSON("/api/sectors");
    sectors.forEach((s) => {
      box.appendChild(
        chip(s, activeSector === s, () => {
          activeSector = s;
          loadCompanies();
          loadSectors();
        })
      );
    });
  } catch (e) {
    // sessiz geç
  }
}

function companyCard(c) {
  const div = document.createElement("div");
  div.className = "card";

  const title = document.createElement("div");
  title.className = "card-title";
  title.textContent = c.name || c.slug || "Firma";

  const meta = document.createElement("div");
  meta.className = "card-meta";
  const parts = [];
  if (c.sector) parts.push(c.sector);
  if (c.city) parts.push(c.city);
  if (c.country) parts.push(c.country);
  meta.textContent = parts.join(" · ") || "Sektör";

  const actions = document.createElement("div");
  actions.className = "card-actions";

  const badge = document.createElement("span");
  badge.className = "badge";
  badge.textContent = "3D Showroom";

  const btn = document.createElement("a");
  btn.className = "btn btn-ghost btn-small";
  btn.href = `/showroom/${encodeURIComponent(c.slug || "")}`;
  btn.textContent = "Expo’ya Gir";

  actions.appendChild(badge);
  actions.appendChild(btn);

  div.appendChild(title);
  div.appendChild(meta);
  div.appendChild(actions);
  return div;
}

async function loadCompanies() {
  const grid = $("#companyGrid");
  if (!grid) return;

  const params = new URLSearchParams();
  params.set("limit", "12");
  if (activeSector) params.set("sector", activeSector);

  grid.innerHTML = "";

  try {
    const { companies } = await fetchJSON(`/api/companies?${params.toString()}`);
    (companies || []).forEach((c) => grid.appendChild(companyCard(c)));
    if (!companies?.length) {
      const empty = document.createElement("div");
      empty.className = "muted";
      empty.textContent = "Firma bulunamadı.";
      grid.appendChild(empty);
    }
  } catch (e) {
    const err = document.createElement("div");
    err.className = "muted";
    err.textContent = "Firmalar yüklenemedi.";
    grid.appendChild(err);
  }
}

function planCard(p) {
  const div = document.createElement("div");
  div.className = "card";

  const title = document.createElement("div");
  title.className = "card-title";
  title.textContent = p.name || "Paket";

  const meta = document.createElement("div");
  meta.className = "card-meta";
  meta.textContent = `Ürün limiti: ${p.product_limit ?? "-"} · Kod: ${p.code ?? "-"}`;

  const actions = document.createElement("div");
  actions.className = "card-actions";

  const badge = document.createElement("span");
  badge.className = "badge";
  badge.textContent = p.featured ? "Öne Çıkan" : "Standart";

  const btn = document.createElement("button");
  btn.className = "btn btn-primary btn-small";
  btn.type = "button";
  btn.textContent = "Detay";

  actions.appendChild(badge);
  actions.appendChild(btn);

  div.appendChild(title);
  div.appendChild(meta);
  div.appendChild(actions);
  return div;
}

async function loadPlans() {
  const grid = $("#planGrid");
  if (!grid) return;

  grid.innerHTML = "";
  try {
    const { plans } = await fetchJSON("/api/plans/home");
    (plans || []).forEach((p) => grid.appendChild(planCard(p)));
    if (!plans?.length) {
      const empty = document.createElement("div");
      empty.className = "muted";
      empty.textContent = "Plan bulunamadı.";
      grid.appendChild(empty);
    }
  } catch (e) {
    const err = document.createElement("div");
    err.className = "muted";
    err.textContent = "Planlar yüklenemedi.";
    grid.appendChild(err);
  }
}

function bindRFQ() {
  const form = $("#rfqForm");
  const status = $("#rfqStatus");
  if (!form) return;

  form.addEventListener("submit", async (ev) => {
    ev.preventDefault();
    status.textContent = "Gönderiliyor...";

    const fd = new FormData(form);
    const payload = Object.fromEntries(fd.entries());

    try {
      const r = await fetch("/api/rfq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(data.error || "Hata");

      status.textContent = "✅ RFQ alındı";
      form.reset();
    } catch (e) {
      status.textContent = "❌ " + (e.message || "Hata");
    }
  });
}

$("#refreshCompanies")?.addEventListener("click", () => loadCompanies());

loadSectors();
loadCompanies();
loadPlans();
bindRFQ();
