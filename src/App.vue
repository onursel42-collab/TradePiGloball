<script setup>
import { ref, onMounted } from 'vue';
import { supabase } from './lib/supabaseClient';

// Üyelik planları için state
const loadingPlans = ref(true);
const plansError = ref('');
const plans = ref([]);

onMounted(async () => {
  const { data, error } = await supabase
    .from('membership_plans')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error(error);
    plansError.value = 'Paketler yüklenirken bir hata oluştu';
  } else {
    plans.value = data || [];
  }

  loadingPlans.value = false;
});
</script>
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
<script setup>
import SellerApplyForm from './components/SellerApplyForm.vue';
</script>

<template>
  <div>
    <!-- üstte hero, vitrin falan -->

    <section>
      <SellerApplyForm />
    </section>
  </div>
</template>
        <div class="header-actions">
          <button class="btn-ghost">Giriş Yap</button>
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
              <span class="gold">tek B2B köprüde</span>
              buluşturuyoruz.
            </h1>
            <p class="hero-sub">
              TradePiGlobal; güvenli ödeme, RFQ yönetimi ve Pi destekli ekonomi ile
              satıcı ve alıcıları aynı altyapıda buluşturan hibrit bir B2B platformudur.
            </p>

            <div class="search-box">
              <input
                v-model="search"
                type="text"
                placeholder="Ürün, firma veya RFQ ara..."
              />
              <button>Ara</button>
            </div>

            <div class="hero-tags">
              <span>🔒 Escrow ödemeler</span>
              <span>🌍 Global görünürlük</span>
              <span>⚡ RFQ tabanlı eşleşme</span>
            </div>
          </div>

          <div class="hero-right">
            <!-- Şimdilik basit bir kart, ileride Babylon/3D gireriz -->
            <div class="hero-panel">
              <h3>Canlı ticaret akışı</h3>
              <ul>
                <li>TR → DE plastik hammadde RFQ açıldı.</li>
                <li>IoT modül tedarikçisi yeni teklif gönderdi.</li>
                <li>Ambalaj üreticisi kategori vitrinine yükseltildi.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
<script setup>
import RFQForm from './components/RFQForm.vue';
</script>

<template>
  <div>
    <!-- üst içerik -->

    <section>
      <RFQForm />
    </section>
  </div>
</template>
      <!-- MEMBERSHIP / VİTRİN -->
      <section class="section">
        <div class="container">
          <h2 class="section-title">Satıcı Üyelik Paketleri</h2>
          <p class="section-sub">
            İş modeline göre planını seç. Gelir oldukça 3D fuar ve 3D mağaza tarafını
            Gold 3D Global paketiyle açarız.
          </p>

          <div v-if="loading" class="loading">
            Paketler yükleniyor…
          </div>

          <div v-else-if="error" class="error">
            Paketler alınırken hata oluştu: {{ error }}
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
                {{ plan.description || 'Bu plan için açıklama daha sonra güncellenecek.' }}
              </p>

              <div class="plan-price">
                <div v-if="plan.currency === 'TRY'">
                  <strong v-if="plan.price_monthly">
                    {{ formatPrice(plan.price_monthly) }} TL
                  </strong>
                  <span class="price-period" v-if="plan.price_monthly">/ ay</span>

                  <div v-if="plan.price_yearly" class="sub-price">
                    Yıllık:
                    <strong>{{ formatPrice(plan.price_yearly) }} TL</strong>
                  </div>
                </div>

                <div v-else-if="plan.currency === 'USD'">
                  <strong v-if="plan.price_monthly">
                    ${{ formatPrice(plan.price_monthly) }}
                  </strong>
                  <span class="price-period" v-if="plan.price_monthly">/ ay</span>

                  <div v-if="plan.price_yearly" class="sub-price">
                    Yıllık:
                    <strong>${{ formatPrice(plan.price_yearly) }}</strong>
                  </div>
                </div>
              </div>

              <ul class="plan-features">
                <li v-if="plan.segment === 'STARTER'">
                  ✅ Küçük satıcılar için temel görünürlük
                </li>
                <li v-if="plan.segment === 'GROWTH'">
                  ✅ Büyümek isteyen üretici ve toptancılar
                </li>
                <li v-if="plan.segment === 'PRO'">
                  ✅ Kategori içinde premium vitrin + RFQ avantajı
                </li>
                <li v-if="plan.segment === 'GLOBAL'">
                  ✅ İhracat odaklı, global aramalarda üst sıralar
                </li>
                <li v-if="plan.segment === 'GOLD_3D'">
                  ✅ 25 slotlu 3D fuar alanı + 3D mağaza
                </li>
                <li>💳 PayTR + Pi hibrit ödeme desteğine hazırlıklı</li>
                <li>📊 Supabase tabanlı tam otomatik altyapı</li>
              </ul>

              <button class="btn-plan">
                Planı İncele
              </button>
            </article>
          </div>
        </div>
      </section>

      <!-- ALT RFQ + KISA BİLGİLER -->
      <section class="section section-muted">
        <div class="container bottom-grid">
          <div>
            <h3 class="mini-title">RFQ Nedir?</h3>
            <p class="mini-text">
              RFQ (Request For Quotation); alıcının tek form ile birden fazla satıcıdan toplu fiyat teklifi istediği süreçtir.
              TradePiGlobal, RFQ akışını satıcı-lehine optimize eder.
            </p>
          </div>
          <div>
            <h3 class="mini-title">Ödeme Güvenliği</h3>
            <p class="mini-text">
              PayTR + escrow + Pi Network ile hibrit bir güvenlik katmanı planlanıyor.
              Altyapı hazır, PayTR onayı sonrası canlıya alınacak.
            </p>
          </div>
        </div>
      </section>
<template>
  <div class="page">
    <!-- Burada senin mevcut hero / 3D vitrin vs olabilir -->

    <section class="plans-section">
      <h2>Üyelik Paketleri</h2>

      <div v-if="loadingPlans">
        Paketler yükleniyor...
      </div>

      <div v-else-if="plansError">
        {{ plansError }}
      </div>

      <div v-else class="plans-grid">
        <div
          v-for="plan in plans"
          :key="plan.id"
          class="plan-card"
        >
          <h3 class="plan-title">
            {{ plan.name }}
            <span
              v-if="plan.has_3d_showroom"
              class="badge-3d"
            >
              3D Fuar Vitrini
            </span>
          </h3>

          <p class="plan-desc">
            {{ plan.description }}
          </p>

          <p class="plan-price">
            {{ plan.price_monthly }} {{ plan.currency }} / ay
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
      <!-- FOOTER -->
      <footer class="footer">
        <div class="container footer-inner">
          <div>
            <div class="footer-logo">TradePiGlobal</div>
            <p class="footer-text">
              Pi destekli global B2B ticaret altyapısı. Satıcı para kazanır, alıcı güvenli ticaret yapar.
            </p>
          </div>
          <div>
            <h4>Platform</h4>
            <ul>
              <li>Nasıl Çalışır?</li>
              <li>Sektörler</li>
              <li>Premium Satıcılar</li>
            </ul>
          </div>
          <div>
            <h4>Hesap</h4>
            <ul>
              <li>Satıcı Kaydı</li>
              <li>Alıcı Kaydı</li>
              <li>Giriş Yap</li>
            </ul>
          </div>
        </div>
        <div class="footer-copy">
          © 2025 TradePiGlobal
        </div>
      </footer>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { supabase } from './supabaseClient';

const loading = ref(true);
const error = ref('');
const plans = ref([]);
const search = ref('');

// Supabase'ten aktif paketleri çek
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

// Filtrelenmiş plan listesi (istersen search'e bağlarız)
const activePlans = computed(() => {
  const keyword = search.value.toLowerCase().trim();
  if (!keyword) return plans.value;

  return plans.value.filter((p) => {
    const txt =
      (p.name || '') +
      ' ' +
      (p.description || '') +
      ' ' +
      (p.segment || '');
    return txt.toLowerCase().includes(keyword);
  });
});

// Fiyat formatlayıcı (virgül vs.)
const formatPrice = (val) => {
  if (val == null) return '';
  return Number(val).toLocaleString('tr-TR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};
</script>

<style scoped>
/* Genel */
.page {
  min-height: 100vh;
  background: #f9fafb;
  color: #111827;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text',
    'Segoe UI', Roboto, sans-serif;
}

.container {
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
  letter-spacing: 0.04em;
  color: #1f2937;
  font-size: 18px;
}

.nav {
  display: flex;
  gap: 14px;
  font-size: 14px;
}

.nav a {
  color: #4b5563;
  text-decoration: none;
}

.nav a:hover {
  color: #111827;
}

.header-actions {
  display: flex;
  gap: 8px;
}

.btn-ghost {
  border-radius: 999px;
  border: 1px solid #e5e7eb;
  background: #ffffff;
  padding: 6px 14px;
  font-size: 13px;
  cursor: pointer;
  color: #111827;
}

.btn-ghost:hover {
  background: #f3f4f6;
}

.btn-primary {
  border-radius: 999px;
  border: none;
  padding: 7px 16px;
  font-size: 13px;
  cursor: pointer;
  background: #10b981;
  color: #ecfdf5;
  font-weight: 600;
}

/* HERO */
.hero {
  padding: 28px 0 20px;
  background: #ffffff;
}

.hero-inner {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
  gap: 24px;
  align-items: flex-start;
}

.hero-left h1 {
  margin: 0 0 10px;
  font-size: clamp(24px, 3vw, 30px);
  color: #111827;
}

.gold {
  color: #f59e0b;
}

.hero-sub {
  margin: 0 0 14px;
  font-size: 14px;
  color: #4b5563;
  max-width: 480px;
}

.search-box {
  display: flex;
  gap: 8px;
  margin-bottom: 10px;
}

.search-box input {
  flex: 1;
  padding: 8px 10px;
  border-radius: 999px;
  border: 1px solid #d1d5db;
  font-size: 14px;
}

.search-box button {
  border-radius: 999px;
  border: none;
  padding: 8px 14px;
  font-size: 13px;
  cursor: pointer;
  background: #1e293b;
  color: #f9fafb;
}

.hero-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  font-size: 12px;
  color: #6b7280;
}

.hero-right {
  display: flex;
  justify-content: flex-end;
}

.hero-panel {
  width: 100%;
  max-width: 320px;
  border-radius: 16px;
  padding: 14px;
  background: #0f172a;
  color: #e5e7eb;
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.4);
}

.hero-panel h3 {
  margin: 0 0 8px;
  font-size: 14px;
}

.hero-panel ul {
  margin: 0;
  padding-left: 16px;
  font-size: 12px;
}

/* SECTIONS */
.section {
  padding: 24px 0;
  background: #f9fafb;
}

.section-muted {
  background: #f3f4f6;
  border-top: 1px solid #e5e7eb;
  border-bottom: 1px solid #e5e7eb;
}

.section-title {
  margin: 0 0 6px;
  font-size: 18px;
  color: #111827;
}

.section-sub {
  margin: 0 0 16px;
  font-size: 13px;
  color: #6b7280;
}

/* PLANS */
.loading,
.error {
  font-size: 13px;
  padding: 8px 0;
}

.error {
  color: #b91c1c;
}

.plans-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 14px;
}

.plan-card {
  background: #ffffff;
  border-radius: 14px;
  padding: 14px 14px 16px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 4px 18px rgba(15, 23, 42, 0.04);
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.plan-gold {
  border-color: #facc15;
  box-shadow: 0 10px 30px rgba(250, 204, 21, 0.25);
}

.plan-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.plan-header h3 {
  margin: 0;
  font-size: 15px;
  color: #111827;
}

.badge-gold {
  font-size: 10px;
  padding: 3px 8px;
  border-radius: 999px;
  background: #facc15;
  color: #78350f;
  font-weight: 700;
}

.plan-desc {
  margin: 0;
  font-size: 12px;
  color: #6b7280;
  min-height: 32px;
}

.plan-price {
  margin-top: 4px;
  font-size: 14px;
  color: #111827;
}

.price-period {
  font-size: 11px;
  color: #6b7280;
  margin-left: 2px;
}

.sub-price {
  font-size: 11px;
  color: #4b5563;
}

.plan-features {
  margin: 8px 0 10px;
  padding-left: 18px;
  font-size: 11px;
  color: #4b5563;
}

.btn-plan {
  margin-top: auto;
  border-radius: 999px;
  border: none;
  padding: 7px 12px;
  font-size: 12px;
  cursor: pointer;
  background: #10b981;
  color: #ecfdf5;
  font-weight: 600;
}

/* ALT GRID */
.bottom-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
}

.mini-title {
  margin: 0 0 6px;
  font-size: 14px;
  color: #111827;
}

.mini-text {
  margin: 0;
  font-size: 12px;
  color: #4b5563;
}

/* FOOTER */
.footer {
  background: #ffffff;
  border-top: 1px solid #e5e7eb;
  margin-top: 10px;
}

.footer-inner {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) repeat(2, minmax(0, 1fr));
  gap: 16px;
  padding: 16px 0 10px;
}

.footer-logo {
  font-weight: 700;
  font-size: 15px;
  color: #111827;
}

.footer-text {
  margin: 6px 0 0;
  font-size: 12px;
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
  color: #4b5563;
}

.footer li {
  margin: 3px 0;
}

.footer-copy {
  border-top: 1px solid #e5e7eb;
  font-size: 11px;
  text-align: center;
  padding: 8px 0 12px;
  color: #9ca3af;
}

/* Responsive */
@media (max-width: 768px) {
  .header-inner {
    flex-wrap: wrap;
  }
  .nav {
    display: none;
  }
  .hero-inner {
    grid-template-columns: minmax(0, 1fr);
  }
  .hero-right {
    justify-content: flex-start;
  }
}
</style>
