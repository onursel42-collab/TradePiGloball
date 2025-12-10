<script setup>
import { ref, computed, onMounted } from 'vue';
import { supabase } from './lib/supabaseClient';
import { getActivePlans } from './services/planService';
import { getCurrentUserWithSeller } from './services/sellerService';

import AuthBox from './components/AuthBox.vue';
import SellerOnboarding from './components/SellerOnboarding.vue';
import SellerPanel from './components/SellerPanel.vue';
import RFQForm from './components/RFQForm.vue'; // sende zaten vardı diye varsayıyorum
import SellerApplyForm from './components/SellerApplyForm.vue'; // varsa kullanırız, yoksa silebilirsin

// view: home | pending | panel
const view = ref('home');

const loadingPlans = ref(true);
const plansError = ref('');
const plans = ref([]);

const user = ref(null);
const seller = ref(null);
const sellerPlan = ref(null);
const loadingUserFlow = ref(true);

const activePlans = computed(() => plans.value);

const formatPrice = (val) => {
  if (!val) return '';
  return Number(val).toLocaleString('tr-TR');
};

const loadPlans = async () => {
  try {
    loadingPlans.value = true;
    const data = await getActivePlans();
    plans.value = data;
  } catch (e) {
    console.error(e);
    plansError.value = e.message || 'Paketler yüklenirken hata oluştu.';
  } finally {
    loadingPlans.value = false;
  }
};

const loadUserFlow = async () => {
  try {
    loadingUserFlow.value = true;
    const data = await getCurrentUserWithSeller();
    user.value = data.user;
    seller.value = data.seller;
    sellerPlan.value = data.plan;

    if (!user.value) {
      view.value = 'home';
    } else if (!seller.value) {
      view.value = 'home'; // giriş yapmış ama satıcı değil → onboarding göstereceğiz
    } else if (seller.value.status === 'pending') {
      view.value = 'pending';
    } else if (seller.value.status === 'approved') {
      view.value = 'panel';
    } else {
      view.value = 'home';
    }
  } catch (e) {
    console.error(e);
  } finally {
    loadingUserFlow.value = false;
  }
};

const handleAuthSuccess = async () => {
  await loadUserFlow();
};

const handleSellerSubmitted = async () => {
  await loadUserFlow();
};

onMounted(async () => {
  await Promise.all([loadPlans(), loadUserFlow()]);
});
</script>

<template>
  <div class="page-root">
    <!-- PANEL GÖRÜNÜMÜ -->
    <div v-if="view === 'panel'">
      <SellerPanel />
    </div>

    <!-- ANA SAYFA + ONBOARDING -->
    <div v-else class="page">
      <!-- HEADER -->
      <header class="header">
        <div class="container header-inner">
          <div class="logo">TradePiGlobal</div>

          <nav class="nav">
            <a href="#">Sektörler</a>
            <a href="#">Premium Satıcılar</a>
            <a href="#rfq">RFQ Oluştur</a>
          </nav>

          <div class="header-actions">
            <button class="btn-ghost">Giriş</button>
            <button class="btn-primary">Satıcı Ol</button>
          </div>
        </div>
      </header>

      <main>
        <!-- HERO -->
        <section class="hero">
          <div class="container hero-inner">
            <div class="hero-left">
              <h1>
                Üretici ve alıcıları
                <span class="gold">tek B2B köprüde</span>
                buluşturuyoruz.
              </h1>
              <p class="hero-sub">
                Pi destekli hibrit B2B ticaret altyapısı.
              </p>

              <div class="hero-tags">
                <span>🔐 Escrow ödemeler</span>
                <span>🌍 Global görünürlük</span>
                <span>⚡ RFQ tabanlı eşleşme</span>
              </div>

              <SellerApplyForm v-if="!user" />
            </div>

            <div class="hero-right">
              <AuthBox initialMode="login" @auth-success="handleAuthSuccess" />
            </div>
          </div>
        </section>

        <!-- SATICI ONBOARDING BLOĞU (GİRİŞ YAPMIŞ AMA SATICI OLMAYANLAR İÇİN) -->
        <section v-if="user && !seller" class="section">
          <div class="container">
            <SellerOnboarding @submitted="handleSellerSubmitted" />
          </div>
        </section>

        <!-- SATICI PENDING BİLGİSİ (ONAY BEKLEYENLER İÇİN) -->
        <section v-if="view === 'pending' && seller" class="section section-muted">
          <div class="container">
            <div class="pending-box">
              <h2>Satıcı Başvurun İnceleniyor</h2>
              <p>
                Başvurun alındı. TradePiGlobal ekibi tarafından onaylandığında Satıcı Paneli’ne erişebileceksin.
              </p>
            </div>
          </div>
        </section>

        <!-- MEMBERSHIP PLANS -->
        <section class="section">
          <div class="container">
            <h2 class="section-title">Satıcı Üyelik Paketleri</h2>

            <div v-if="loadingPlans" class="loading">Paketler yükleniyor…</div>
            <div v-else-if="plansError" class="error">{{ plansError }}</div>

            <div v-else class="plans-grid">
              <article
                v-for="plan in activePlans"
                :key="plan.id"
                class="plan-card"
                :class="{ 'plan-gold': plan.has_3d_showroom }"
              >
                <div class="plan-header">
                  <h3>{{ plan.name }}</h3>

                  <span v-if="plan.has_3d_showroom" class="badge-gold">
                    GOLD 3D FUAR
                  </span>
                </div>

                <p class="plan-desc">
                  {{ plan.description || 'Açıklama güncellenecek.' }}
                </p>

                <div class="plan-price">
                  <strong>{{ formatPrice(plan.price_monthly) }}</strong>
                  <span v-if="plan.currency">{{ plan.currency }}/ay</span>
                </div>

                <button class="btn-plan">Planı İncele</button>
              </article>
            </div>
          </div>
        </section>

        <!-- RFQ FORM -->
        <section id="rfq" class="section section-muted">
          <div class="container">
            <h2 class="section-title">Teklif İste (RFQ)</h2>
            <RFQForm />
          </div>
        </section>

        <!-- FOOTER -->
        <footer class="footer">
          <div class="container footer-inner">
            <div class="footer-copy">© 2025 TradePiGlobal</div>
          </div>
        </footer>
      </main>
    </div>
  </div>
</template>

<style scoped>
.page-root {
  min-height: 100vh;
  background: #020617;
  color: #e5e7eb;
}
.header {
  border-bottom: 1px solid #111827;
  background: #020617;
}
.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
}
.logo {
  font-weight: 700;
}
.nav {
  display: flex;
  gap: 12px;
  font-size: 14px;
}
.nav a {
  color: #9ca3af;
}
.header-actions {
  display: flex;
  gap: 8px;
}
.btn-ghost {
  padding: 6px 10px;
  border-radius: 999px;
  background: transparent;
  border: 1px solid #4b5563;
  color: #e5e7eb;
  font-size: 13px;
}
.btn-primary {
  padding: 6px 10px;
  border-radius: 999px;
  border: none;
  background: #22c55e;
  color: #021014;
  font-size: 13px;
  font-weight: 600;
}
.hero {
  padding: 30px 0;
}
.hero-inner {
  display: flex;
  gap: 24px;
  align-items: flex-start;
}
.hero-left {
  flex: 1.3;
}
.hero-right {
  flex: 1;
  display: flex;
  justify-content: flex-end;
}
.hero h1 {
  font-size: 26px;
  line-height: 1.3;
}
.gold {
  color: #facc15;
}
.hero-sub {
  margin-top: 8px;
  color: #9ca3af;
}
.hero-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 12px;
  margin-bottom: 16px;
}
.hero-tags span {
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 999px;
  background: #020617;
  border: 1px solid #1f2937;
}
.section {
  padding: 30px 0;
}
.section-muted {
  background: #020617;
}
.section-title {
  font-size: 20px;
  margin-bottom: 16px;
}
.plans-grid {
  display: grid;
  gap: 12px;
}
.plan-card {
  padding: 16px;
  border-radius: 16px;
  background: #020617;
  border: 1px solid #1f2937;
}
.plan-gold {
  border-color: #facc15;
}
.plan-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.badge-gold {
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 999px;
  background: #facc15;
  color: #111827;
}
.plan-desc {
  margin: 8px 0;
  font-size: 13px;
  color: #9ca3af;
}
.plan-price {
  display: flex;
  align-items: baseline;
  gap: 4px;
}
.btn-plan {
  margin-top: 10px;
  padding: 6px 10px;
  border-radius: 999px;
  border: 1px solid #4b5563;
  background: transparent;
  color: #e5e7eb;
  font-size: 13px;
}
.loading,
.error {
  font-size: 13px;
}
.error {
  color: #fecaca;
}
.footer {
  padding: 16px 0;
  border-top: 1px solid #111827;
  margin-top: 20px;
}
.footer-inner {
  display: flex;
  justify-content: space-between;
}
.pending-box {
  padding: 16px;
  border-radius: 14px;
  background: #1e293b;
  border: 1px dashed #f59e0b;
  color: #fbbf24;
}
.container {
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 12px;
}
</style>
