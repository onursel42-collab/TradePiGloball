// js/plans.js
import { supabase } from "../supabaseClient.js";

// Para birimi sembolü
function formatPrice(currency, value) {
  if (value == null) return "-";
  const v = Number(value).toLocaleString("tr-TR");
  if (currency === "USD") return "$ " + v;
  if (currency === "EUR") return "€ " + v;
  return "₺ " + v;
}

// Normal plan kartı (Starter / Growth / Pro / Global)
function renderPlanCard(plan) {
  const badge =
    plan.segment === "STARTER"
      ? "Başlangıç"
      : plan.segment === "GROWTH"
      ? "Büyüme"
      : plan.segment === "PRO"
      ? "Profesyonel"
      : plan.segment === "GLOBAL"
      ? "Global"
      : "";

  return `
    <div class="tpg-plan-card">
      <div class="tpg-plan-header">
        <span class="tpg-plan-badge">${badge}</span>
        <h3>${plan.name}</h3>
        <p class="tpg-plan-desc">${plan.description || ""}</p>
      </div>

      <div class="tpg-plan-prices">
        <div>
          <span class="tpg-price-label">Aylık</span>
          <div class="tpg-price-main">
            ${formatPrice(plan.currency, plan.price_monthly)}
          </div>
        </div>
        <div>
          <span class="tpg-price-label">Yıllık</span>
          <div class="tpg-price-sub">
            ${formatPrice(plan.currency, plan.price_yearly)}
          </div>
        </div>
      </div>

      <ul class="tpg-plan-list">
        <li>✓ Satıcı profili ve mağaza sayfası</li>
        <li>✓ RFQ oluşturma / yanıtlama</li>
        <li>✓ Pi + fiat uyumlu altyapı</li>
      </ul>

      <button class="tpg-btn-primary tpg-btn-full">
        Bu planla başla
      </button>
    </div>
  `;
}

// Gold 3D Global kartı (25 slotlu fuar + 3D mağaza)
function renderGoldPlan(plan) {
  return `
    <div class="tpg-gold-card">
      <div class="tpg-gold-tag">GOLD 3D GLOBAL</div>
      <h3>25 Slotlu 3D Fuar + 3D Mağaza</h3>
      <p class="tpg-gold-desc">
        Ana sayfada 3D fuar alanı, özel 3D mağaza tasarımı ve global üst seviye görünürlük.
      </p>

      <div class="tpg-gold-prices">
        <div>
          <span class="tpg-price-label">Aylık</span>
          <div class="tpg-gold-price">
            ${formatPrice(plan.currency, plan.price_monthly)}
          </div>
        </div>
        <div>
          <span class="tpg-price-label">Yıllık</span>
          <div class="tpg-gold-price-sub">
            ${formatPrice(plan.currency, plan.price_yearly)}
          </div>
        </div>
      </div>

      <ul class="tpg-gold-list">
        <li>✓ 25 slotlu 3D fuar alanında yer</li>
        <li>✓ Babylon.js tabanlı özel 3D mağaza</li>
        <li>✓ Global vitrin ve üst sıralı görünürlük</li>
        <li>✓ Özel hesap yöneticisi</li>
      </ul>

      <button class="tpg-btn-outline-emerald">
        Gold 3D hakkında bilgi iste
      </button>
    </div>
  `;
}

async function loadPlans() {
  const gridEl = document.getElementById("plans-grid");
  const goldWrapper = document.getElementById("gold-plan-wrapper");

  if (!gridEl) return;

  try {
    const { data, error } = await supabase
      .from("membership_plans")
      .select(
        "name, code, description, billing_period, price_monthly, price_yearly, currency, is_active, has_3d_showroom, segment, sort_order"
      )
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (error) {
      console.error("Planlar yüklenirken hata:", error);
      gridEl.innerHTML =
        '<div class="tpg-plans-error">Planlar yüklenemedi. Daha sonra tekrar dene.</div>';
      return;
    }

    const regularPlans = data.filter((p) => !p.has_3d_showroom);
    const goldPlan = data.find((p) => p.has_3d_showroom);

    if (!regularPlans.length) {
      gridEl.innerHTML =
        '<div class="tpg-plans-empty">Şu anda aktif üyelik planı bulunmuyor.</div>';
    } else {
      gridEl.innerHTML = regularPlans.map(renderPlanCard).join("");
    }

    if (goldPlan && goldWrapper) {
      goldWrapper.innerHTML = renderGoldPlan(goldPlan);
    }
  } catch (e) {
    console.error(e);
    gridEl.innerHTML =
      '<div class="tpg-plans-error">Planlar yüklenirken beklenmeyen bir hata oluştu.</div>';
  }
}

// Sayfa yüklendiğinde çalıştır
loadPlans();
