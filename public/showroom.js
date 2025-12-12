// public/showroom.js
// Gold Aura 3D Showroom - Fair Plans (Supabase)

const SUPABASE_URL = "https://YOUR_PROJECT.supabase.co";
const SUPABASE_ANON_KEY = "YOUR_ANON_KEY";

// --- helpers
const fmtTRY = (n) => {
  if (n == null) return "-";
  try {
    return new Intl.NumberFormat("tr-TR").format(Number(n));
  } catch {
    return String(n);
  }
};

const el = (tag, attrs = {}, html = "") => {
  const e = document.createElement(tag);
  Object.entries(attrs).forEach(([k, v]) => (e[k] = v));
  if (html) e.innerHTML = html;
  return e;
};

// --- minimal Supabase REST fetch (no npm, no sdk)
async function supabaseSelect(table, select = "*", filters = {}) {
  const url = new URL(`${SUPABASE_URL}/rest/v1/${table}`);
  url.searchParams.set("select", select);

  // filters: { col: "eq.value" } etc.
  Object.entries(filters).forEach(([col, expr]) => {
    url.searchParams.set(col, expr);
  });

  const res = await fetch(url.toString(), {
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    const t = await res.text().catch(() => "");
    throw new Error(`Supabase REST ${res.status}: ${t || res.statusText}`);
  }
  return res.json();
}

function planCardHTML(p) {
  const badge = p.badge ? `<div class="pod-badge">${p.badge}</div>` : "";
  const segment = p.segment ? `<div class="pod-seg">${p.segment}</div>` : "";
  const desc = p.description ? `<div class="pod-desc">${p.description}</div>` : "";

  return `
    ${badge}
    <div class="pod-title">${p.name || "Plan"}</div>
    ${segment}
    ${desc}
    <div class="pod-price">${fmtTRY(p.monthly_price)} ₺ / ay</div>
    <div class="pod-sub">
      3 ay: ${fmtTRY(p.quarterly_price)} ₺ · 12 ay: ${fmtTRY(p.yearly_price)} ₺
    </div>
    <div class="pod-cta">
      <a class="pod-btn" href="/#paketler" onclick="window.__selectedPlan='${p.id}'">Seç</a>
      <a class="pod-btn secondary" href="/#rfq">RFQ</a>
    </div>
  `;
}

// --- scene placement
function placePods(plans) {
  const pods = document.getElementById("pods");
  pods.innerHTML = "";

  const cols = 3;
  const gapX = 240;
  const gapY = 150;

  const startX = -((cols - 1) * gapX) / 2; // center grid
  const startY = 80;

  plans.forEach((p, i) => {
    const r = Math.floor(i / cols);
    const c = i % cols;

    const pod = el("div", { className: "pod" });
    pod.innerHTML = planCardHTML(p);

    // 3D-ish layout
    const x = startX + c * gapX;
    const y = startY + r * gapY;

    pod.style.transform = `translate3d(${x}px, ${y}px, 0px)`;
    pods.appendChild(pod);
  });
}

// --- status overlay
function setStatus(msg, isError = false) {
  const s = document.getElementById("status");
  if (!s) return;
  s.textContent = msg || "";
  s.style.opacity = msg ? "1" : "0";
  s.style.borderColor = isError ? "rgba(255,80,80,.55)" : "rgba(255,220,0,.35)";
}

// --- camera / touch
(function setupCamera() {
  const room = document.getElementById("room");
  if (!room) return;

  let rotX = -8;
  let rotY = 0;
  let dragging = false;
  let lastX = 0;
  let lastY = 0;

  const apply = () => {
    room.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
  };
  apply();

  const start = (x, y) => {
    dragging = true;
    lastX = x;
    lastY = y;
  };
  const move = (x, y) => {
    if (!dragging) return;
    const dx = x - lastX;
    const dy = y - lastY;
    lastX = x;
    lastY = y;
    rotY += dx * 0.12;
    rotX -= dy * 0.10;
    rotX = Math.max(-25, Math.min(10, rotX));
    apply();
  };
  const end = () => (dragging = false);

  // mouse
  document.addEventListener("mousedown", (e) => start(e.clientX, e.clientY));
  document.addEventListener("mousemove", (e) => move(e.clientX, e.clientY));
  document.addEventListener("mouseup", end);

  // touch
  document.addEventListener(
    "touchstart",
    (e) => {
      const t = e.touches[0];
      if (!t) return;
      start(t.clientX, t.clientY);
    },
    { passive: true }
  );
  document.addEventListener(
    "touchmove",
    (e) => {
      const t = e.touches[0];
      if (!t) return;
      move(t.clientX, t.clientY);
    },
    { passive: true }
  );
  document.addEventListener("touchend", end);
})();

// --- bootstrap
(async function init() {
  try {
    setStatus("Planlar yükleniyor...");
    const rows = await supabaseSelect(
      "fair_plans",
      "id,name,description,slot_count,monthly_price,quarterly_price,yearly_price,is_active,badge,segment,is_featured,created_at",
      { is_active: "eq.true" }
    );

    // order: featured first, then price asc, then created_at desc
    rows.sort((a, b) => {
      const fa = a.is_featured ? 1 : 0;
      const fb = b.is_featured ? 1 : 0;
      if (fa !== fb) return fb - fa;
      const pa = Number(a.monthly_price || 0);
      const pb = Number(b.monthly_price || 0);
      if (pa !== pb) return pa - pb;
      return String(b.created_at || "").localeCompare(String(a.created_at || ""));
    });

    if (!rows.length) {
      setStatus("Aktif plan bulunamadı.", true);
      return;
    }

    placePods(rows);
    setStatus("");
  } catch (err) {
    console.error(err);
    setStatus(`Planlar çekilemedi: ${err.message}`, true);
  }
})();
