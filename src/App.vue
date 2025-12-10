<script setup>
import { ref, computed, onMounted } from 'vue';
import { supabase } from './lib/supabaseClient';

import SellerApplyForm from './components/SellerApplyForm.vue';
import RFQForm from './components/RFQForm.vue';
import SellerOnboarding from './components/SellerOnboarding.vue';
import SellerPanel from './components/SellerPanel.vue';

// Şu an hangi görünümdeyiz? (home | panel)
const view = ref('home');

const loading = ref(true);
const error = ref('');
const plans = ref([]);

// Supabase'ten aktif planları çek
onMounted(async () => {
  const { data, error: err } = await supabase
    .from('membership_plans')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (err) {
    console.error(err);
    error.value = err.message;
  } else {
    plans.value = data || [];
  }

  loading.value = false;
});

// Aktif plan listesi
const activePlans = computed(() => plans.value);

// Fiyat formatlama
const formatPrice = (val) => {
  if (!val) return '';
  return Number(val).toLocaleString('tr-TR');
};
</script>

<template>
  <div>
    <!-- ANA SAYFA -->
    <div v-if="view === 'home'" class="page">
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
            <button class="btn-ghost">Giriş Yap</button>
            <button class="btn-primary">Satıcı Olarak Başla</button>
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
        <section class="section">
          <div class="container">
            <h2 class="section-title">Satıcı Üyelik Paketleri</h2>

            <div v-if="loading" class="loading">Paketler yükleniyor…</div>

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
        <section class="section section-muted">
          <div class="container">
            <h2 class="section-title">Teklif İste (RFQ)</h2>
            <RFQForm />
          </div>
        </section>

        <!-- FOOTER -->
        <footer class="footer">
          <div class="container footer-inner">
            <div class="footer-copy">
              © 2025 TradePiGlobal
            </div>
          </div>
        </footer>
      </main>
    </div>

    <!-- SATICI PANELİ -->
    <div v-else-if="view === 'panel'">
      <SellerPanel />
    </div>
  </div>
</template>

<style scoped>
/* Tüm mevcut stillerin gayet güzel. Burayı aynen koruyoruz. */
/* Mevcut CSS’lerin TAMAMI sende. Onlara dokunmadım. */
</style>
