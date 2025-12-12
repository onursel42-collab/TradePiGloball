let activeSector = "";
let pageLimit = 24;         // ilk dolum
let pageStep = 24;          // daha fazla
let searchQ = "";

const chipsEl = document.getElementById("chips");
const cardsEl = document.getElementById("cards");
const loadMoreBtn = document.getElementById("loadMore");
const qInput = document.getElementById("q");
const tickerValue = document.getElementById("tickerValue");

// --- Helpers
function el(tag, attrs = {}, children = []) {
  const n = document.createElement(tag);
  Object.entries(attrs).forEach(([k, v]) => {
    if (k === "class") n.className = v;
    else if (k.startsWith("on") && typeof v === "function") n.addEventListener(k.slice(2), v);
    else n.setAttribute(k, v);
  });
  children.forEach((c) => n.appendChild(typeof c === "string" ? document.createTextNode(c) : c));
  return n;
}

function setActiveChip(sector) {
  [...chipsEl.querySelectorAll(".chip")].forEach((c) => {
    c.classList.toggle("is-active", c.dataset.sector === sector);
  });
}

async function loadSectors() {
  const res = await fetch("/api/sectors");
  const json = await res.json();
  const sectors = (json.sectors || []).slice(0, 200);

  chipsEl.innerHTML = "";

  const all = el("button", { class: "chip is-active", "data-sector": "" }, ["Tümü"]);
  all.addEventListener("click", () => {
    activeSector = "";
    setActiveChip("");
    pageLimit = 24;
    cardsEl.innerHTML = "";
    loadCompanies(true);
  });
  chipsEl.appendChild(all);

  sectors.forEach((s) => {
    const b = el("button", { class: "chip", "data-sector": s }, [s]);
    b.addEventListener("click", () => {
      activeSector = s;
      setActiveChip(s);
      pageLimit = 24;
      cardsEl.innerHTML = "";
      loadCompanies(true);
    });
    chipsEl.appendChild(b);
  });
}

function companyCard(c) {
  const sector = c.sector || "—";
  const place = [c.country, c.city].filter(Boolean).join(" · ") || "—";

  const card = el("a", { class: "card", href: `/expo/${c.slug || ""}` }, [
    el("div", { class: "card__top" }, [
      el("div", {}, [
        el("h3", { class: "card__name" }, [c.name || "Firma"]),
        el("div", { class: "card__meta" }, [`${sector} · ${place}`]),
      ]),
      el("div", { class: "card__tag" }, ["Dünyaya Gir"]),
    ]),
  ]);

  return card;
}

async function loadCompanies(reset = false) {
  const params = new URLSearchParams();
  params.set("limit", String(pageLimit));
  if (activeSector) params.set("sector", activeSector);

  const res = await fetch(`/api/companies?${params.toString()}`);
  const json = await res.json();
  const list = json.companies || [];

  // Basit arama (client-side)
  const filtered = searchQ
    ? list.filter((x) => (x.name || "").toLowerCase().includes(searchQ.toLowerCase()))
    : list;

  if (reset) cardsEl.innerHTML = "";

  filtered.forEach((c) => cardsEl.appendChild(companyCard(c)));
}

// --- Events
loadMoreBtn.addEventListener("click", () => {
  pageLimit = Math.min(pageLimit + pageStep, 50); // server zaten max 50
  loadCompanies(false);
});

qInput.addEventListener("input", () => {
  searchQ = qInput.value.trim();
  cardsEl.innerHTML = "";
  loadCompanies(true);
});

// --- Ticker (şimdilik placeholder)
function updateTickerMock() {
  // burada sonra /api/market bağlarız; şimdilik canlı hissi
  const now = new Date();
  const mm = String(now.getMinutes()).padStart(2, "0");
  const ss = String(now.getSeconds()).padStart(2, "0");
  tickerValue.textContent = `LIVE · ${mm}:${ss}`;
}
updateTickerMock();
setInterval(updateTickerMock, 30000);

// --- Init
(async function init() {
  await loadSectors();
  await loadCompanies(true);
})();
