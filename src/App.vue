<template>
  <div class="tpg-page">
    <header class="tpg-header">
      <div class="tpg-container tpg-header-inner">
        <div class="tpg-logo">TradePiGlobal</div>

        <nav class="tpg-nav">
          <button class="tpg-nav-link">Sektörler</button>
          <button class="tpg-nav-link">RFQ</button>
          <button class="tpg-nav-link">Destek</button>
        </nav>

        <div class="tpg-header-actions">
          <button class="tpg-btn-link">Alıcı Girişi</button>
          <button class="tpg-btn-link">Satıcı Girişi</button>
          <button class="tpg-btn-primary">Kayıt Ol</button>
        </div>
      </div>
    </header>

    <!-- HERO + ÖZET -->
    <main>
      <section class="tpg-hero">
        <div class="tpg-container tpg-hero-inner">
          <div class="tpg-hero-left">
            <h1 class="tpg-hero-title">
              Pi destekli global B2B ticaret altyapısı.
            </h1>
            <p class="tpg-hero-sub">
              Üretici ve alıcıları tek platformda buluştur. Üyelik planını seç,
              vitrinde yerini al, RFQ taleplerini yönet.
            </p>

            <div class="tpg-hero-actions">
              <button class="tpg-btn-primary">Satıcı Olarak Başla</button>
              <button class="tpg-btn-ghost">Alıcı Olarak İncele</button>
            </div>
          </div>

          <div class="tpg-hero-right">
            <div class="tpg-hero-card">
              <p class="tpg-hero-card-label">Canlı Kurlar</p>
              <div class="tpg-rates-row">
                <span>USD/TRY: <strong>32,10</strong></span>
                <span>EUR/TRY: <strong>34,50</strong></span>
              </div>
              <div class="tpg-rates-row tpg-rates-row-pi">
                <span>1 Pi ≈ <strong>10 USD</strong></span>
                <span class="tpg-pill">İç kur</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ÜYELİK PAKETLERİ -->
      <section class="tpg-section">
        <div class="tpg-container">
          <h2 class="tpg-section-title">Üyelik Paketleri</h2>
          <p class="tpg-section-sub">
            İş modeline göre paketini seç. Fiyatlar Supabase’ten canlı çekiliyor.
          </p>

          <!-- GOLD 3D GLOBAL ÖNE ÇIKAN -->
          <div v-if="goldPlan" class="tpg-gold-wrapper">
            <div class="tpg-gold-badge">Gold 3D Global</div>
            <div class="tpg-gold-content">
              <div>
                <h3>{{ goldPlan.name }}</h3>
                <p class="tpg-gold-desc">
                  25 slotlu 3D fuar alanı, 3D mağaza ve global üst seviye görünürlük.
                </p>
                <ul class="tpg-gold-list">
                  <li>🔹 25 adet 3D fuar vitrini</li>
                  <li>🔹 Özel 3D mağaza (Babylon.js alt yapısı)</li>
                  <li>🔹 Global aramalarda üst sıralar</li>
                  <li>🔹 Özel hesap yöneticisi</li>
                </ul>
              </div>
              <div class="tpg-gold-price-box">
                <div class="tpg-price-main">
                  <span class="tpg-price-value">
                    {{ formatMoney(goldPlan.price_monthly) }}
                  </span>
                  <span class="tpg-price-period">/ ay</span>
                </div>
                <div class="tpg-price-secondary">
                  veya
                  {{ formatMoney(goldPlan.price_yearly) }} / yıl
                </div>
                <button class="tpg-btn-primary tpg-btn-block">
                  Gold 3D Global’e Geç
                </button>
              </div>
            </div>
          </div>

          <!-- NORMAL PLANLAR (STARTER / GROWTH / PRO / GLOBAL) -->
          <div class="tpg-plan-grid">
            <div
              v-for="plan in normalPlans"
              :key="plan.code"
              class="tpg-plan-card"
            >
              <h3 class="tpg-plan-name">{{ plan.name }}</h3>
              <p class="tpg-plan-desc">{{ plan.description }}</p>

              <div class="tpg-plan-price">
                <span class="tpg-plan-price-main">
                  {{ formatMoney(plan.price_monthly) }}
                </span>
                <span class="tpg-plan-price-period">/ ay</span>
              </div>

              <p v-if="plan.price_yearly" class="tpg-plan-year">
                {{ formatMoney(plan.price_yearly) }} / yıl
              </p>

              <ul class="tpg-plan-features">
                <li v-if="plan.code === 'STARTER'">
                  ✅ Temel görünürlük ve RFQ yanıtlamaya giriş
                </li>
                <li v-if="plan.code === 'GROWTH'">
                  ✅ Kategori içinde daha yüksek sıralama
                </li>
                <li v-if="plan.code === 'PRO'">
                  ✅ Daha fazla RFQ ve genişletilmiş vitrin
                </li>
                <li v-if="plan.code === 'GLOBAL'">
                  ✅ İhracat odaklı global görünürlük
                </li>
                <li>✅ Pi + TRY ile hibrit ödeme desteği</li>
              </ul>

              <button class="tpg-btn-outline tpg-btn-block">
                Bu planla devam et
              </button>
            </div>
          </div>

          <div v-if="isLoading" class="tpg-info">
            Paketler yükleniyor…
          </div>
          <div v-if="!isLoading && normalPlans.length === 0 && !goldPlan" class="tpg-info">
            Aktif üyelik planı bulunamadı. Supabase tablolarını kontrol et.
          </div>
        </div>
      </section>
    </main>

    <footer class="tpg-footer">
      <div class="tpg-container tpg-footer-inner">
        <div>
          <div class="tpg-footer-logo">TradePiGlobal</div>
          <p class="tpg-footer-text">
            Pi destekli global B2B ticaret ve hibrit ödeme altyapısı.
          </p>
        </div>
        <div>
          <h4>Platform</h4>
          <ul>
            <li>Nasıl çalışır?</li>
            <li>Üyelik paketleri</li>
            <li>RFQ süreci</li>
          </ul>
        </div>
        <div>
          <h4>Hesap</h4>
          <ul>
            <li>Alıcı girişi</li>
            <li>Satıcı girişi</li>
            <li>Plan yükseltme</li>
          </ul>
        </div>
      </div>
      <div class="tpg-footer-copy">
        © 2025 TradePiGlobal
      </div>
    </footer>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import { supabase } from './lib/supabaseClient'; // yolu projene göre düzelt

const plans = ref([]);
const isLoading = ref(true);

function formatMoney(value) {
  if (value == null) return '-';
  // 2 ondalık, binlik ayırma
  return new Intl.NumberFormat('tr-TR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

const goldPlan = computed(() =>
  plans.value.find((p) => p.has_3d_showroom === true)
);

const normalPlans = computed(() =>
  plans.value.filter((p) => !p.has_3d_showroom)
);

onMounted(async () => {
  isLoading.value = true;

  const { data, error } = await supabase
    .from('membership_plans')
    .select(
      'id, name, code, description, billing_period, price_monthly, price_yearly, currency, has_3d_showroom, is_active, sort_order'
    )
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Üyelik planları alınırken hata:', error);
  } else {
    plans.value = data || [];
  }

  isLoading.value = false;
});
</script>

<style scoped>
.tpg-page {
  min-height: 100vh;
  background: #f9fafb;
  color: #0f172a;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Text",
    "Segoe UI", Roboto, sans-serif;
}

/* CONTAINER */
.tpg-container {
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 16px;
}

/* HEADER */
.tpg-header {
  border-bottom: 1px solid #e5e7eb;
  background: #ffffff;
}

.tpg-header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  gap: 14px;
}

.tpg-logo {
  font-weight: 700;
  font-size: 18px;
  letter-spacing: 0.04em;
  color: #111827;
}

.tpg-nav {
  display: flex;
  gap: 12px;
}

.tpg-nav-link {
  border: none;
  background: none;
  font-size: 13px;
  color: #4b5563;
  cursor: pointer;
}

.tpg-header-actions {
  display: flex;
  gap: 8px;
}

.tpg-btn-link {
  border: none;
  background: none;
  font-size: 13px;
  color: #10b981;
  cursor: pointer;
}

.tpg-btn-primary {
  border-radius: 999px;
  border: none;
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 600;
  background: #10b981;
  color: #ecfdf5;
  cursor: pointer;
}

.tpg-btn-ghost {
  border-radius: 999px;
  border: 1px solid #d1fae5;
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 500;
  background: #ecfdf5;
  color: #047857;
  cursor: pointer;
}

.tpg-btn-outline {
  border-radius: 999px;
  border: 1px solid #10b981;
  padding: 8px 14px;
  font-size: 13px;
  font-weight: 500;
  background: #ffffff;
  color: #047857;
  cursor: pointer;
}

.tpg-btn-block {
  width: 100%;
}

/* HERO */
.tpg-hero {
  padding: 26px 0 20px;
  background: #ffffff;
}

.tpg-hero-inner {
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(0, 1.3fr);
  gap: 20px;
}

.tpg-hero-title {
  font-size: 26px;
  margin: 0 0 10px;
  color: #0f172a;
}

.tpg-hero-sub {
  margin: 0 0 16px;
  font-size: 14px;
  color: #4b5563;
  max-width: 480px;
}

.tpg-hero-actions {
  display: flex;
  gap: 10px;
}

.tpg-hero-right {
  display: flex;
  justify-content: flex-end;
}

.tpg-hero-card {
  border-radius: 16px;
  padding: 14px;
  background: #f1f5f9;
  border: 1px solid #e5e7eb;
  width: 100%;
  max-width: 280px;
}

.tpg-hero-card-label {
  margin: 0 0 6px;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #6b7280;
}

.tpg-rates-row {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: #111827;
}

.tpg-rates-row + .tpg-rates-row {
  margin-top: 6px;
}

.tpg-rates-row-pi {
  margin-top: 8px;
  align-items: center;
  gap: 8px;
}

.tpg-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 11px;
  background: #d1fae5;
  color: #047857;
}

/* SECTIONS */
.tpg-section {
  padding: 24px 0 28px;
  background: #f9fafb;
}

.tpg-section-title {
  margin: 0 0 6px;
  font-size: 20px;
  color: #0f172a;
}

.tpg-section-sub {
  margin: 0 0 16px;
  font-size: 13px;
  color: #6b7280;
}

/* GOLD PLAN */
.tpg-gold-wrapper {
  border-radius: 16px;
  padding: 16px;
  background: #022c22;
  color: #ecfdf5;
  margin-bottom: 18px;
}

.tpg-gold-badge {
  display: inline-flex;
  padding: 4px 10px;
  border-radius: 999px;
  background: #facc15;
  color: #92400e;
  font-size: 11px;
  font-weight: 600;
  margin-bottom: 8px;
}

.tpg-gold-content {
  display: flex;
  gap: 18px;
  flex-wrap: wrap;
}

.tpg-gold-desc {
  margin: 0 0 8px;
  font-size: 13px;
}

.tpg-gold-list {
  margin: 0;
  padding-left: 16px;
  font-size: 13px;
}

.tpg-gold-price-box {
  margin-left: auto;
  min-width: 220px;
  background: #064e3b;
  border-radius: 14px;
  padding: 10px 12px;
}

.tpg-price-main {
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.tpg-price-value {
  font-size: 22px;
  font-weight: 700;
}

.tpg-price-period {
  font-size: 12px;
  opacity: 0.8;
}

.tpg-price-secondary {
  margin-top: 4px;
  font-size: 12px;
  opacity: 0.9;
}

/* NORMAL PLANLAR */
.tpg-plan-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 14px;
}

.tpg-plan-card {
  border-radius: 14px;
  padding: 14px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
}

.tpg-plan-name {
  margin: 0 0 4px;
  font-size: 15px;
  color: #111827;
}

.tpg-plan-desc {
  margin: 0 0 10px;
  font-size: 12px;
  color: #6b7280;
  min-height: 32px;
}

.tpg-plan-price {
  display: flex;
  align-items: baseline;
  gap: 4px;
  margin-bottom: 2px;
}

.tpg-plan-price-main {
  font-size: 20px;
  font-weight: 700;
  color: #111827;
}

.tpg-plan-price-period {
  font-size: 12px;
  color: #6b7280;
}

.tpg-plan-year {
  margin: 0 0 8px;
  font-size: 12px;
  color: #6b7280;
}

.tpg-plan-features {
  margin: 0 0 10px;
  padding-left: 16px;
  font-size: 12px;
  color: #4b5563;
}

.tpg-info {
  margin-top: 10px;
  font-size: 13px;
  color: #6b7280;
}

/* FOOTER */
.tpg-footer {
  border-top: 1px solid #e5e7eb;
  background: #ffffff;
  margin-top: 10px;
}

.tpg-footer-inner {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) repeat(2, minmax(0, 1fr));
  gap: 16px;
  padding: 16px 0 10px;
}

.tpg-footer-logo {
  font-weight: 700;
  font-size: 16px;
  color: #111827;
}

.tpg-footer-text {
  margin: 4px 0 0;
  font-size: 12px;
  color: #6b7280;
}

.tpg-footer h4 {
  margin: 0 0 4px;
  font-size: 13px;
  color: #111827;
}

.tpg-footer ul {
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 12px;
  color: #6b7280;
}

.tpg-footer li + li {
  margin-top: 2px;
}

.tpg-footer-copy {
  border-top: 1px solid #e5e7eb;
  padding: 8px 16px 12px;
  font-size: 11px;
  text-align: center;
  color: #9ca3af;
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .tpg-nav {
    display: none;
  }

  .tpg-hero-inner {
    grid-template-columns: minmax(0, 1fr);
  }

  .tpg-hero-right {
    justify-content: flex-start;
  }

  .tpg-gold-content {
    flex-direction: column;
  }

  .tpg-gold-price-box {
    margin-left: 0;
  }

  .tpg-footer-inner {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
