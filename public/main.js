// Sektörleri doldur
async function loadSectors() {
  try {
    const res = await fetch("/api/sectors");
    const json = await res.json();
    const container = document.querySelector("[data-sector-list]");
    if (!container) return;

    const sectors = json.sectors || [];
    container.innerHTML = "";

    sectors.forEach((name) => {
      const chip = document.createElement("button");
      chip.className = "sector-chip";
      chip.type = "button";
      chip.textContent = name;
      container.appendChild(chip);
    });
  } catch (err) {
    console.error("Sektörler yüklenemedi:", err);
  }
}

// Ana sayfadaki 3 plan kartını doldur
async function loadHomePlans() {
  try {
    const res = await fetch("/api/plans/home");
    const json = await res.json();
    const plans = json.plans || [];

    plans.forEach((p, index) => {
      const card = document.querySelector(`[data-plan-card="${index + 1}"]`);
      if (!card) return;

      const nameEl = card.querySelector("[data-plan-name]");
      const descEl = card.querySelector("[data-plan-desc]");
      const priceEl = card.querySelector("[data-plan-price]");

      if (nameEl) nameEl.textContent = p.name || "Plan";
      if (descEl) descEl.textContent = p.description || "";
      if (priceEl) {
        const fiyat = p.monthly_price || 0;
        priceEl.textContent = fiyat.toLocaleString("tr-TR") + " ₺ / ay";
      }
    });
  } catch (err) {
    console.error("Planlar yüklenemedi:", err);
  }
}

// Sayfa yüklendiğinde
document.addEventListener("DOMContentLoaded", () => {
  loadSectors();
  loadHomePlans();
});
