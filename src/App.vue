<script setup>
import { ref, computed, onMounted } from 'vue';
import { supabase } from './lib/supabaseClient';

import { getActivePlans } from './services/planService';
import { getCurrentUserWithSeller } from './services/sellerService';

import SellerApplyForm from './components/SellerApplyForm.vue';
import RFQForm from './components/RFQForm.vue';
import SellerPanel from './components/SellerPanel.vue';
import OwnerPanel from './components/OwnerPanel.vue';
import AuthBox from './components/AuthBox.vue';
import SellerOnboarding from './components/SellerOnboarding.vue';

// ---------- STATE ----------
const loadingPlans = ref(true);
const plans = ref([]);
const error = ref('');

const view = ref('home'); // 'home' | 'owner' | 'panel'
const user = ref(null);
const role = ref(null);
const seller = ref(null);
const currentPlan = ref(null);

const showAuthBox = ref(false);

// Aktif plan listesi
const activePlans = computed(() => plans.value || []);

// Fiyat formatı
const formatPrice = (val) => {
  if (!val) return '';
  return Number(val).toLocaleString('tr-TR');
};

// ---------- DATA LOAD ----------
const loadPlans = async () => {
  try {
    loadingPlans.value = true;
    error.value = '';
    plans.value = await getActivePlans();
  } catch (e) {
    console.error(e);
    error.value = 'Paketler yüklenirken bir hata oluştu.';
  } finally {
    loadingPlans.value = false;
  }
};

const loadUser = async () => {
  try {
    const { data: userData, error: userErr } = await supabase.auth.getUser();
    if (userErr) {
      console.error(userErr);
      view.value = 'home';
      return;
    }

    user.value = userData.user || null;

    if (!user.value) {
      view.value = 'home';
      return;
    }

    // Profilde role çek
    try {
      const { data: profileData, error: profileErr } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.value.id)
        .single();

      if (!profileErr) {
        role.value = profileData?.role || null;
      } else {
        console.warn('profile error', profileErr);
      }
    } catch (e) {
      console.warn(e);
    }

    // Seller + plan bilgisi
    try {
      const { user: u, seller: s, plan } = await getCurrentUserWithSeller();
      seller.value = s;
      currentPlan.value = plan || null;
    } catch (e) {
      console.warn('seller flow error', e);
    }

    // Görünüm kararı
    if (role.value === 'owner') {
      view.value = 'owner';
    } else if (seller.value && seller.value.status === 'approved') {
      view.value = 'panel';
    } else {
      view.value = 'home';
    }
  } catch (e) {
    console.error(e);
    view.value = 'home';
  }
};

// ---------- UI ACTIONS ----------
const handleLoginClick = () => {
  showAuthBox.value = !showAuthBox.value;
};

const handleLogoClick = () => {
  view.value = 'home';
};

// (ileride seller onboarding vs. buraya bağlanacak)
onMounted(async () => {
  await Promise.all([loadPlans(), loadUser()]);
});
</script>

<template>
  <div class="page">
    <!-- ========== OWNER GOD MODE ========== -->
    <div v-if="view === 'owner'">
      <OwnerPanel />
    </div>

    <!-- ========== SELLER PANEL ========== -->
    <div v-else-if="view === 'panel'">
      <SellerPanel />
    </div>

    <!-- ========== ANA SAYFA ========== -->
    <div v-else>
      <!-- HEADER -->
      <header class="header">
        <div class="container header-inner">
          <div class="logo" @click="handleLogoClick" style="cursor: pointer">
            TradePiGlobal
          </div>

          <nav class="nav">
            <a href="#sectors">Sektörler</a>
            <a href="#premium">Premium Satıcılar</a>
            <a href="#rfq">RFQ Oluştur</a>
          </nav>

          <div class="header-actions">
            <button class="btn-ghost" @click="handleLoginClick">
              Giriş Yap
            </button>
            <button class="btn-primary">
              Satıcı Olarak Başla
            </button>
          </div>
        </div>
      </header>

      <!-- GİRİŞ KUTUSU (AUTHBOX) -->
      <section v-if="showAuthBox" class="section section-muted">
        <div class="container">
          <AuthBox />
        </div>
      </section>

      <!-- MAIN -->
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

              <SellerApplyForm />
            </div>

            <div class="hero-right">
              <div class="hero-panel">
                <h3>Canlı ticaret akışı</h3>
                <ul>
                  <li>TR → DE kimyasal RFQ açıldı.</li>
                  <li>Metalcim yeni teklif gönderdi.</li>
                  <li>PET ambalaj üreticisi premium oldu.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <!-- MEMBERSHIP PLANS -->
        <section id="premium" class="section">
          <div class="container">
            <h2 class="section-title">Satıcı Üyelik Paketleri</h2>

            <div v-if="loadingPlans" class="loading">
              Paketler yükleniyor…
            </div>

            <div v-else-if="error" class="error">
              {{ error }}
            </div>

            <div v-else class="plans-grid">
              <article
                v-for="plan in activePlans"
                :key="plan.id"
                class="plan-card"
                :class="{ 'plan-gold': plan.has_3d_showroom }"
              >
                <div class="plan-header">
                  <h3>{{ plan.name }}</h3>

                  <span
                    v-if="plan.has_3d_showroom"
                    class="badge-gold"
                  >
                    GOLD 3D FUAR
                  </span>
                </div>

                <p class="plan-desc">
                  {{ plan.description || 'Açıklama güncellenecek.' }}
                </p>

                <div class="plan-price">
                  <strong>
                    {{ formatPrice(plan.price_monthly) }}
                  </strong>
                  <span v-if="plan.currency">
                    {{ plan.currency }}/ay
                  </span>
                </div>

                <button class="btn-plan">
                  Planı İncele
                </button>
              </article>
            </div>
          </div>
        </section>

        <!-- RFQ FORM -->
        <section id="rfq" class="section section-muted">
          <div class="container">
            <h2>Teklif İste (RFQ)</h2>
            <RFQForm />
          </div>
        </section>
      </main>

      <!-- FOOTER -->
      <footer class="footer">
        <div class="container footer-inner">
          <div class="footer-copy">© 2025 TradePiGlobal</div>
        </div>
      </footer>
    </div>
  </div>
</template>

<style scoped>
/* Mevcut stillerini bozmayalım diye çok az dokunuyorum.
   Eski CSS dosyan aynen kullanılmaya devam edecek. */
</style>
