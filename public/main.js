// -----------------------------
// SEKTÖRLERİ GETİR
// -----------------------------
async function sektorleriYukle() {
  const alan = document.getElementById("sektor-listesi");
  if (!alan) return;

  const res = await fetch("/api/sectors");
  const json = await res.json();

  alan.innerHTML = "";

  json.sectors.forEach((s) => {
    const btn = document.createElement("button");
    btn.className = "sektor-chip";
    btn.textContent = s;
    alan.appendChild(btn);
  });
}

// -----------------------------
// ANA SAYFADAKİ 3 PLAN
// -----------------------------
async function planlariYukle() {
  const res = await fetch("/api/plans/home");
  const json = await res.json();

  json.plans.forEach((plan, index) => {
    const kart = document.querySelector(`[data-kart="${index + 1}"]`);
    if (!kart) return;

    kart.querySelector(".p-name").textContent = plan.name;
    kart.querySelector(".p-desc").textContent = plan.description || "";
    kart.querySelector(".p-price").textContent =
      plan.monthly_price.toLocaleString("tr-TR") + " ₺ / ay";
  });
}

// -----------------------------
// ÇALIŞTIR
// -----------------------------
sektorleriYukle();
planlariYukle();
