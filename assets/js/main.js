// assets/js/main.js
import { CATEGORIES, SHOWROOMS_BY_CATEGORY } from "./data.fake.js";
import { openModal } from "./modal.js";

document.addEventListener("DOMContentLoaded", () => {
  wireNavScroll();
  wireButtons();
  wireFeatureCards();
  wireCategories();
  wireShowroomCards();
  ensureYear();
  ensureCategoryResultsArea(); // kategoriye basınca aşağı demo kartlar
});

function $(sel, root = document) { return root.querySelector(sel); }
function $all(sel, root = document) { return Array.from(root.querySelectorAll(sel)); }

function ensureYear() {
  const y = $("#year");
  if (y) y.textContent = new Date().getFullYear();
}

/* ------------------------------------
   1) NAV: anchor scroll + modal fallbacks
-------------------------------------*/
function wireNavScroll() {
  // Menü linkleri (#why, #memberships, #categories)
  $all('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        closeMobileNavIfAny();
      }
    });
  });

  // Sign in / Get started yoksa bile boş bırakma:
  $all('a[href="/signin"], a[href*="signin"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      openModal({
        title: "Sign in",
        subtitle: "Auth panel coming next",
        bodyHtml: `
          <p>We’re enabling verified onboarding first.</p>
          <p style="opacity:.8">Want early access? (demo) — we can connect Supabase auth next.</p>
        `,
        primaryLabel: "Close",
        primaryHref: "#",
      });
      closeMobileNavIfAny();
    });
  });
}

/* ------------------------------------
   2) HERO BUTTONS + CTA
-------------------------------------*/
function wireButtons() {
  // “Start with a showroom” → get-started.html
  $all('a[href*="get-started"], a.btn-primary, a.btn').forEach((el) => {
    // Eğer zaten düzgün linkse dokunma
    const href = el.getAttribute("href") || "";
    if (href.includes("get-started")) return;
    // Bazı template’lerde buton anchor değil; o yüzden only anchor
  });

  const startBtn = findButtonByText(["Start with a showroom", "Create your first showroom"]);
  if (startBtn) startBtn.addEventListener("click", (e) => goGetStarted(e));

  const browseBtn = findButtonByText(["Browse categories"]);
  if (browseBtn) browseBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const sec = document.getElementById("categories") || document.querySelector('[data-section="categories"]') || findSectionByHeading("Browse categories");
    if (sec) sec.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  // “Get started” nav butonu (üst sağ)
  const getStarted = findButtonByText(["Get started"]);
  if (getStarted) getStarted.addEventListener("click", (e) => goGetStarted(e));
}

function goGetStarted(e) {
  e.preventDefault();
  // Sayfa varsa gider; yoksa modal gösterir
  if (pageExistsHint("get-started.html")) {
    window.location.href = "/get-started.html";
  } else {
    openModal({
      title: "Get started",
      subtitle: "Supplier onboarding (demo)",
      bodyHtml: `
        <p>Next: supplier onboarding + showroom template + RFQ flow.</p>
        <ul>
          <li>Choose role (Supplier/Buyer)</li>
          <li>Verify (coming soon)</li>
          <li>Create showroom (demo)</li>
        </ul>
      `,
      primaryLabel: "OK",
      primaryHref: "#",
    });
  }
}

/* ------------------------------------
   3) Feature cards → modal
-------------------------------------*/
function wireFeatureCards() {
  // Kartlar genelde .card gibi gelir; garantili değil.
  // O yüzden metinle yakalıyoruz:
  const triggers = [
    { key: "Showroom-first", title: "Showroom-first", desc: "Not a noisy marketplace. Suppliers present verified catalogs, buyers connect directly." },
    { key: "Verified tiers", title: "Verified tiers", desc: "Trust & capability levels. Reduce risk with transparent verification signals." },
    { key: "Pi-ready", title: "Pi-ready", desc: "Planned Pi Network alignment. Payments and identity hooks can be added later." },
    { key: "Verified Showrooms", title: "Verified Showrooms", desc: "Curated & verified partners to reduce risk and increase confidence." },
    { key: "Enterprise Support", title: "Enterprise Support", desc: "Onboarding and integration support for serious suppliers & buyers." },
    { key: "Scalable Integrations", title: "Scalable Integrations", desc: "APIs and partner-ready tools that scale with volume." },
  ];

  triggers.forEach((t) => {
    const el = findElementByText(t.key);
    if (!el) return;
    // Kartın kendisini tıklanabilir yapalım
    const card = closestClickable(el);
    if (!card) return;
    card.style.cursor = "pointer";
    card.addEventListener("click", () => {
      openModal({
        title: t.title,
        subtitle: "Details (demo)",
        bodyHtml: `<p>${escapeHtml(t.desc)}</p><p style="opacity:.8">Next step: connect this to real flows (auth, RFQ, catalogs).</p>`,
        primaryLabel: "Close",
        primaryHref: "#",
      });
    });
  });
}

/* ------------------------------------
   4) Categories → seçince demo showroom listesi
-------------------------------------*/
function wireCategories() {
  // “pill” butonları: genelde button veya a
  const categorySection =
    document.getElementById("categories") ||
    findSectionByHeading("Browse categories") ||
    document;

  const pills = $all("button, a", categorySection).filter((el) => {
    const txt = (el.textContent || "").trim();
    return CATEGORIES.some((c) => c.label.toLowerCase() === txt.toLowerCase());
  });

  pills.forEach((pill) => {
    pill.addEventListener("click", (e) => {
      e.preventDefault();
      const label = (pill.textContent || "").trim();
      const cat = CATEGORIES.find((c) => c.label.toLowerCase() === label.toLowerCase());
      if (!cat) return;

      setActivePill(pills, pill);
      renderCategoryResults(cat.id, cat.label);
    });
  });

  // default: ilk kategori render
  if (pills.length) {
    const firstLabel = (pills[0].textContent || "").trim();
    const cat = CATEGORIES.find((c) => c.label.toLowerCase() === firstLabel.toLowerCase()) || CATEGORIES[0];
    setActivePill(pills, pills[0]);
    renderCategoryResults(cat.id, cat.label);
  }
}

function setActivePill(pills, active) {
  pills.forEach((p) => p.classList.remove("is-active"));
  active.classList.add("is-active");
}

/* ------------------------------------
   5) Showroom cards (demo) → showroom.html?demo=...
-------------------------------------*/
function wireShowroomCards() {
  // Eğer sayfada “Sample showroom preview / Anatolia Textiles” gibi demo kart varsa:
  const demoText = findElementByText("Anatolia Textiles") || findElementByText("Sample showroom preview");
  if (!demoText) return;

  const card = closestClickable(demoText);
  if (!card) return;

  card.style.cursor = "pointer";
  card.addEventListener("click", () => {
    // showroom.html varsa geç
    if (pageExistsHint("showroom.html")) {
      window.location.href = "/showroom.html?demo=anatolia-textiles";
    } else {
      openModal({
        title: "Sample showroom",
        subtitle: "Demo preview",
        bodyHtml: `<p>Showroom page will open here (showroom.html).</p><p style="opacity:.8">We can generate it next.</p>`,
        primaryLabel: "OK",
        primaryHref: "#",
      });
    }
  });
}

/* ------------------------------------
   6) Helpers: results area + render
-------------------------------------*/
function ensureCategoryResultsArea() {
  // Kategori bölümünün altına sonuç alanı ekle (yoksa)
  const sec =
    document.getElementById("categories") ||
    findSectionByHeading("Browse categories") ||
    document.body;

  if (!$("#tgCategoryResults")) {
    const wrap = document.createElement("div");
    wrap.id = "tgCategoryResults";
    wrap.style.cssText = `
      margin-top: 16px;
      display: grid;
      grid-template-columns: repeat(1, minmax(0, 1fr));
      gap: 12px;
    `;
    // mümkünse kategori başlığının altına koy
    sec.appendChild(wrap);
  }
}

function renderCategoryResults(categoryId, label) {
  const wrap = $("#tgCategoryResults");
  if (!wrap) return;

  const items = SHOWROOMS_BY_CATEGORY[categoryId] || [];
  wrap.innerHTML = `
    <div style="grid-column: 1 / -1; opacity:.85; font-weight:700; margin-top:6px;">
      ${escapeHtml(label)} showrooms (demo)
    </div>
    ${items.map(renderShowroomCard).join("")}
  `;

  // kart click
  $all("[data-demo-showroom]", wrap).forEach((card) => {
    card.addEventListener("click", () => {
      const id = card.getAttribute("data-demo-showroom");
      if (pageExistsHint("showroom.html")) {
        window.location.href = `/showroom.html?demo=${encodeURIComponent(id)}`;
      } else {
        openModal({
          title: "Showroom",
          subtitle: id,
          bodyHtml: `<p>Showroom detail page is next (showroom.html).</p>`,
          primaryLabel: "OK",
          primaryHref: "#",
        });
      }
    });
  });
}

function renderShowroomCard(s) {
  return `
    <div data-demo-showroom="${escapeHtml(s.id)}"
      style="cursor:pointer; border: 1px solid rgba(255,255,255,.10); background: rgba(255,255,255,.04);
      border-radius: 16px; padding: 14px; display:flex; gap:12px; align-items:flex-start;">
      <div style="width:42px; height:42px; border-radius:12px; background: rgba(59,130,246,.25);
        border: 1px solid rgba(59,130,246,.35);"></div>
      <div style="flex:1;">
        <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
          <div style="font-weight:800;">${escapeHtml(s.name)}</div>
          <span style="font-size:11px; opacity:.75; border:1px solid rgba(255,255,255,.12); padding:2px 8px; border-radius:999px;">
            ${escapeHtml(s.badge)}
          </span>
        </div>
        <div style="opacity:.80; font-size:12px; margin-top:4px;">${escapeHtml(s.desc)}</div>
        <div style="display:flex; gap:8px; flex-wrap:wrap; margin-top:8px;">
          <span style="font-size:11px; opacity:.75; border:1px solid rgba(255,255,255,.12); padding:2px 8px; border-radius:999px;">${escapeHtml(s.moq)}</span>
          <span style="font-size:11px; opacity:.75; border:1px solid rgba(255,255,255,.12); padding:2px 8px; border-radius:999px;">${escapeHtml(s.lead)}</span>
          <span style="font-size:11px; opacity:.75; border:1px solid rgba(255,255,255,.12); padding:2px 8px; border-radius:999px;">${escapeHtml(s.country)}</span>
        </div>
      </div>
      <div style="font-size:12px; opacity:.85; align-self:center;">›</div>
    </div>
  `;
}

/* ------------------------------------
   7) Mobile nav toggle (varsa)
-------------------------------------*/
function closeMobileNavIfAny() {
  const menu = document.getElementById("navMenu");
  const toggle = document.getElementById("navToggle");
  if (menu && toggle) {
    menu.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }
}

/* ------------------------------------
   Utils: find by text / closest card
-------------------------------------*/
function findButtonByText(texts) {
  const all = $all("a, button");
  return all.find((el) => {
    const t = (el.textContent || "").trim().toLowerCase();
    return texts.some((x) => t === x.toLowerCase());
  });
}

function findElementByText(text) {
  const all = $all("a, button, h1, h2, h3, p, div, span");
  const target = text.toLowerCase();
  return all.find((el) => ((el.textContent || "").trim().toLowerCase() === target));
}

function findSectionByHeading(headingText) {
  const h = $all("h1,h2,h3").find((x) => (x.textContent || "").trim().toLowerCase() === headingText.toLowerCase());
  if (!h) return null;
  return h.closest("section") || h.parentElement;
}

function closestClickable(el) {
  if (!el) return null;
  return el.closest("a, button, .card, section, div") || el;
}

function escapeHtml(str) {
  return String(str || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// Static hostingte “dosya var mı”nın garantili yolu yok.
// Ama biz yine de “varsa gider” mantığıyla çalışıyoruz.
function pageExistsHint(_file) {
  // şimdilik true dönmüyoruz; link yoksa modal daha iyi.
  // İstersen 2. adımda get-started.html + showroom.html zaten oluşturacağız.
  return false;
}
