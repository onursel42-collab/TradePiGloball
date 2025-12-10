<template>
  <div class="page">
    <!-- HEADER -->
    <header class="header">
      <div class="container header-inner">
        <div class="logo">TradePiGlobal</div>

        <nav class="nav">
          <a href="#">Sektörler</a>
          <a href="#">Premium Satıcılar</a>
          <a href="#">RFQ Oluştur</a>
        </nav>

        <div class="header-actions">
          <button class="btn-ghost">Alıcı Girişi</button>
          <button class="btn-primary">Satıcı Olarak Başla</button>
        </div>
      </div>
    </header>

    <!-- HERO -->
    <main>
      <section class="hero">
        <div class="container hero-inner">
          <div class="hero-left">
            <h1>
              Üretici ve alıcıları
              <span class="text-gold">tek B2B köprüde</span>
              buluşturuyoruz.
            </h1>
            <p class="hero-sub">
              TradePiGlobal; RFQ tabanlı eşleşme, hibrit ödeme (Pi + fiat) ve
              üyelik paketlerine göre şekillenen vitrin yapısıyla global ticaret
              için tasarlandı.
            </p>

            <div class="search-box">
              <input
                type="text"
                placeholder="Ürün, firma veya RFQ ara..."
              />
              <button class="btn-primary">Ara</button>
            </div>

            <div class="hero-badges">
              <span>🔒 Güvenli ödeme & escrow altyapısı</span>
              <span>🌍 Global görünürlük</span>
              <span>⚙ Tam otomatik dijital altyapı</span>
            </div>
          </div>

          <div class="hero-right">
            <!-- Buraya ileride Babylon.js ile 3D preview gömebiliriz -->
            <div class="hero-visual">
              <div class="visual-badge">Pi destekli B2B</div>
              <div class="visual-text">
                <p>Tanrı üstü altyapı, premium vitrin.</p>
                <p class="visual-highlight">Hazırsan, dünyaya açılalım.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ÜYELİK PAKETLERİ VİTRİNİ -->
      <section class="section">
        <div class="container">
          <div class="section-head">
            <div>
              <h2>Satıcı üyelik paketleri</h2>
              <p class="section-sub">
                Tüm paketler Supabase’deki
                <code>membership_plans</code> tablosundan gelir. Gold 3D Global
                paketi, 25 slotlu 3D fuar alanı + 3D mağaza hakkı tanır.
              </p>
            </div>
            <div class="billing-toggle">
              <button
                class="billing-btn"
                :class="{ active: billingMode === 'monthly' }"
                @click="billingMode = 'monthly'"
              >
                Aylık
              </button>
              <button
                class="billing-btn"
                :class="{ active: billingMode === 'yearly' }"
                @click="billingMode = 'yearly'"
              >
                Yıllık
              </button>
            </div>
          </div>

          <div v-if="loading" class="info-box">
            Paketler yükleniyor...
          </div>

          <div v-else-if="error" class="info-box error">
            Paketler yüklenirken bir hata oluştu:
            <span>{{ error }}</span>
          </div>

          <div v-else class="plans-grid">
            <article
              v-for="plan in sortedPlans"
              :key="plan.code"
              class="plan-card"
              :class="{
                'plan-gold': plan.has_3d_showroom,
                'plan-highlight': plan.segment === 'GLOBAL'
              }"
            >
              <div class="plan-header">
                <h3>{{ plan.name }}</h3>
                <span
                  v-if="plan.has_3d_showroom"
                  class="badge-3d"
                >
                  3D Fuar + 3D Mağaza
                </span>
              </div>

              <p class="plan-desc">
                {{ plan.description || 'Satıcılar için üyelik planı.' }}
              </p>

              <div class="plan-price-block">
                <div v-if="billingMode === 'monthly'">
                  <div class="price-main">
                    <span class="price-number">
                      {{ formatPrice(plan.price_monthly) }}
                    </span>
                    <span class="price-currency">{{ plan.currency }}</span>
                  </div>
                  <div class="price-period">/ ay</div>
                </div>

                <div v-else>
                  <div class="price-main">
                    <span class="price-number">
                      {{ formatPrice(plan.price_yearly) }}
                    </span>
                    <span class="price-currency">{{ plan.currency }}</span>
                  </div>
                  <div class="price-period">/ yıl</div>
                </div>
              </div>

              <ul class="plan-features">
                <li>✓ Global B2B vitrin</li>
                <li>✓ RFQ tabanlı teklif sistemi</li>
                <li v-if="plan.segment === 'STARTER'">
                  ✓ Başlangıç için temel görünürlük
                </li>
                <li v-else-if="plan.segment === 'GROWTH'">
                  ✓ Büyüyen üreticiler için güçlendirilmiş vitrin
                </li>
                <li v-else-if="plan.segment === 'PRO'">
                  ✓ Profesyonel satıcılar için premium vitrin
                </li>
                <li v-else-if="plan.segment === 'GLOBAL'">
                  ✓ İhracat odaklı, global üst sıralar
                </li>
                <li v-else-if="plan.segment === 'GOLD_3D'">
                  ✓ 25 slot 3D fuar alanı + özel 3D mağaza
                </li>
              </ul>

              <button class="btn-plan-select">
                Bu paketi seç
              </button>
            </article>
          </div>
        </div>
      </section>

      <!-- RFQ KISA BÖLÜMÜ -->
      <section class="section section-muted">
        <div class="container rfq-section">
          <div>
            <h2>Tek RFQ ile birden fazla teklif al</h2>
            <p class="section-sub">
              Alıcı tarafı tek bir RFQ ile birden fazla satıcıdan toplu fiyat
              alır. Satıcı tarafı, üyelik paketine göre RFQ önceliği kazanır.
            </p>
          </div>
          <div class="rfq-actions">
            <button class="btn-primary">
              RFQ Oluştur
            </button>
            <button class="btn-ghost-dark">
              Son RFQ’ları gör
            </button>
          </div>
        </div>
      </section>
    </main>

    <!-- FOOTER -->
    <footer class="footer">
      <div class="container footer-grid">
        <div>
          <h3 class="footer-logo">TradePiGlobal</h3>
          <p class="footer-text">
            Pi destekli, çok katmanlı güvenlik altyapısına sahip global B2B
            ticaret platformu.
          </p>
        </div>
        <div>
          <h4>Platform</h4>
          <ul>
            <li>Nasıl çalışır?</li>
            <li>Sektörler</li>
            <li>Premium satıcılar</li>
          </ul>
        </div>
        <div>
          <h4>Hesap</h4>
          <ul>
            <li>Satıcı kaydı</li>
            <li>Alıcı kaydı</li>
            <li>Giriş yap</li>
          </ul>
        </div>
      </div>
      <div class="footer-copy">
        © 2025 TradePiGlobal
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { supabase } from './supabaseClient';

const plans = ref([]);
const loading = ref(true);
const error = ref('');
const billingMode = ref('monthly'); // 'monthly' | 'yearly'

// Supabase'ten aktif planları çek
onMounted(async () => {
  try {
    const { data, error: err } = await supabase
      .from('membership_plans')
      .select(
        `
        name,
        code,
        description,
        billing_period,
        price_monthly,
        price_yearly,
        currency,
        is_active,
        segment,
        has_3d_showroom,
        sort_order
      `
      )
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (err) {
      throw err;
    }

    // Güvenlik: null fiyatları 0 yap
    plans.value = (data || []).map((p) => ({
      ...p,
      price_monthly: p.price_monthly ?? 0,
      price_yearly: p.price_yearly ?? 0,
    }));
  } catch (e) {
    console.error(e);
    error.value = e.message || 'Bilinmeyen hata';
  } finally {
    loading.value = false;
  }
});

// Gold 3D’yi en sona ama vurgulu göster
const sortedPlans = computed(() => {
  const gold = plans.value.filter((p) => p.has_3d_showroom);
  const normal = plans.value.filter((p) => !p.has_3d_showroom);
  return [...normal, ...gold];
});

function formatPrice(value) {
  if (!value || value === 0) return '–';
  return new Intl.NumberFormat('tr-TR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}
</script>

<style scoped>
/* Genel sayfa */
.page {
  min-height: 100vh;
  background: #f3f4f6; /* açık zemin */
  color: #111827;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text',
    'Segoe UI', sans-serif;
}

.container {
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 16px;
}

/* HEADER */
.header {
  border-bottom: 1px solid #e5e7eb;
  background: #ffffff;
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
  gap: 12px;
}

.logo {
  font-weight: 700;
  font-size: 18px;
  color: #1e293b;
}

.nav {
  display: flex;
  gap: 12px;
  font-size: 14px;
}

.nav a {
  color: #4b5563;
}

.nav a:hover {
  color: #111827;
}

.header-actions {
  display: flex;
  gap: 8px;
}

/* HERO */
.hero {
  background: #ffffff;
  padding: 28px 0 24px;
}

.hero-inner {
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr);
  gap: 24px;
  align-items: center;
}

.hero-left h1 {
  margin: 0 0 10px;
  font-size: clamp(26px, 4vw, 32px);
  color: #0f172a;
}

.text-gold {
  color: #f59e0b;
}

.hero-sub {
  margin: 0 0 16px;
  font-size: 14px;
  color: #4b5563;
  max-width: 520px;
}

.search-box {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.search-box input {
  flex: 1;
  border-radius: 999px;
  border: 1px solid #d1d5db;
  padding: 8px 12px;
  font-size: 14px;
}

.hero-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  font-size: 12px;
  color: #6b7280;
}

.hero-badges span {
  padding: 4px 8px;
  border-radius: 999px;
  background: #e5e7eb;
}

/* HERO sağ görsel */
.hero-right {
  display: flex;
  justify-content: flex-end;
}

.hero-visual {
  width: 100%;
  max-width: 320px;
  border-radius: 20px;
  padding: 14px;
  background: radial-gradient(circle at top, #10b981 0, #1e293b 55%);
  color: #ecfdf5;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.visual-badge {
  align-self: flex-start;
  padding: 4px 10px;
  border-radius: 999px;
  background: #d1fae5;
  color: #065f46;
  font-size: 11px;
  font-weight: 600;
}

.visual-text p {
  margin: 0;
  font-size: 13px;
}

.visual-highlight {
  font-weight: 600;
}

/* BUTONLAR */
.btn-primary {
  border-radius: 999px;
  border: none;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 600;
  background: #10b981;
  color: #ffffff;
  cursor: pointer;
}

.btn-primary:hover {
  background: #059669;
}

.btn-ghost {
  border-radius: 999px;
  border: 1px solid #d1d5db;
  padding: 8px 16px;
  font-size: 13px;
  background: #ffffff;
  color: #111827;
  cursor: pointer;
}

.btn-ghost-dark {
  border-radius: 999px;
  border: 1px solid #4b5563;
  padding: 8px 16px;
  font-size: 13px;
  background: transparent;
  color: #e5e7eb;
  cursor: pointer;
}

/* SECTIONS */
.section {
  padding: 26px 0;
  background: #f9fafb;
}

.section-muted {
  background: #0f172a;
  color: #e5e7eb;
}

.section-head {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: center;
  margin-bottom: 16px;
}

.section-head h2 {
  margin: 0 0 4px;
  font-size: 20px;
}

.section-sub {
  margin: 0;
  font-size: 13px;
  color: #6b7280;
}

.section-muted .section-sub {
  color: #9ca3af;
}

/* BILLING TOGGLE */
.billing-toggle {
  display: inline-flex;
  border-radius: 999px;
  border: 1px solid #e5e7eb;
  overflow: hidden;
}

.billing-btn {
  border: none;
  padding: 6px 12px;
  font-size: 12px;
  background: transparent;
  color: #6b7280;
  cursor: pointer;
}

.billing-btn.active {
  background: #10b981;
  color: #ffffff;
}

/* INFO BOX */
.info-box {
  padding: 10px 12px;
  border-radius: 10px;
  background: #e5e7eb;
  font-size: 13px;
  color: #374151;
}

.info-box.error {
  background: #fef2f2;
  color: #991b1b;
}

/* PLAN GRID */
.plans-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 14px;
}

.plan-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 14px;
  border: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.plan-header {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  align-items: center;
}

.plan-header h3 {
  margin: 0;
  font-size: 16px;
  color: #111827;
}

.plan-desc {
  margin: 0;
  font-size: 13px;
  color: #6b7280;
}

/* GOLD ve GLOBAL highlight */
.plan-highlight {
  border-color: #10b981;
}

.plan-gold {
  border-width: 2px;
  border-color: #f59e0b;
  box-shadow: 0 0 0 1px rgba(245, 158, 11, 0.2);
}

.badge-3d {
  padding: 4px 8px;
  border-radius: 999px;
  background: #facc15;
  color: #1f2933;
  font-size: 11px;
  font-weight: 600;
}

/* PRİCE BLOCK */
.plan-price-block {
  margin-top: 4px;
}

.price-main {
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.price-number {
  font-size: 20px;
  font-weight: 700;
  color: #111827;
}

.price-currency {
  font-size: 12px;
  color: #6b7280;
}

.price-period {
  font-size: 12px;
  color: #6b7280;
}

/* FEATURES */
.plan-features {
  margin: 4px 0 8px;
  padding-left: 18px;
  font-size: 12px;
  color: #4b5563;
}

.plan-features li {
  margin-bottom: 2px;
}

/* PLAN BUTTON */
.btn-plan-select {
  margin-top: auto;
  align-self: flex-start;
  border-radius: 999px;
  border: 1px solid #10b981;
  background: #ecfdf5;
  color: #047857;
  padding: 6px 14px;
  font-size: 13px;
  cursor: pointer;
}

/* RFQ SECTION */
.rfq-section {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: center;
}

/* FOOTER */
.footer {
  background: #ffffff;
  border-top: 1px solid #e5e7eb;
  margin-top: 20px;
}

.footer-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) repeat(2, minmax(0, 1fr));
  gap: 16px;
  padding: 16px 0 12px;
}

.footer-logo {
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  color: #111827;
}

.footer-text {
  margin: 4px 0 0;
  font-size: 13px;
  color: #6b7280;
}

.footer h4 {
  margin: 0 0 6px;
  font-size: 13px;
  color: #111827;
}

.footer ul {
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 12px;
  color: #6b7280;
}

.footer li {
  margin: 3px 0;
}

.footer-copy {
  border-top: 1px solid #e5e7eb;
  padding: 8px 16px 10px;
  font-size: 11px;
  color: #9ca3af;
  text-align: center;
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .nav {
    display: none;
  }

  .hero-inner {
    grid-template-columns: minmax(0, 1fr);
  }

  .hero-right {
    justify-content: flex-start;
  }

  .rfq-section {
    flex-direction: column;
    align-items: flex-start;
  }

  .footer-grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
