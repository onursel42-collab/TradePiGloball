// Sektörleri doldur
async function loadSectors() {
  const res = await fetch("/api/sectors");
  const json = await res.json();
  const container = document.querySelector("[data-sector-list]");
  if (!container) return;

  container.innerHTML = "";
  json.sectors.forEach((name) => {
    const chip = document.createElement("button");
    chip.className = "sector-chip";
    chip.textContent = name;
    container.appendChild(chip);
  });
}

// Ana sayfadaki 3 plan kartını doldur
async function loadHomePlans() {
  const res = await fetch("/api/plans/home");
  const json = await res.json();
  const plans = json.plans || [];
  plans.forEach((p, index) => {
    const card = document.querySelector(`[data-plan-card="${index + 1}"]`);
    if (!card) return;
    card.querySelector("[data-plan-name]").textContent = p.name;
    card.querySelector("[data-plan-desc]").textContent =
      p.description || "";
    card.querySelector("[data-plan-price]").textContent =
      p.monthly_price.toLocaleString("tr-TR") + " ₺ / ay";
  });
}

loadSectors();
loadHomePlans();
