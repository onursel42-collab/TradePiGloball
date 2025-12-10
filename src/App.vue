<script setup>
import { ref, onMounted } from 'vue';

// basit bir "mock" data loader — ileride supabase servislerini buraya bağlarsın
const loading = ref(true);
const error = ref(null);
const plans = ref([]);
const sectors = ref([
  { id: 1, name: 'İnşaat' },
  { id: 2, name: 'Tekstil' },
  { id: 3, name: 'Makine' },
  { id: 4, name: 'Gıda' },
  { id: 5, name: 'Elektrik' },
  { id: 6, name: 'Medikal' },
]);

onMounted(async () => {
  try {
    // demo: yükleniyormuş izlenimi
    await new Promise((r) => setTimeout(r, 350));
    // örnek paketler (gerçek veriyi supabase'den al)
    plans.value = [
      { id: 1, name: 'Başlangıç', price_monthly: 0, currency: 'TL', has_3d_showroom: false },
      { id: 2, name: 'Pro Satıcı', price_monthly: 499, currency: 'TL', has_3d_showroom: true },
      { id: 3, name: 'Global Marka', price_monthly: 999, currency: 'TL', has_3d_showroom: true },
    ];
  } catch (e) {
    error.value = 'Veri yüklenirken hata oluştu.';
    console.error(e);
  } finally {
    loading.value = false;
  }
});

const formatPrice = (v) => {
  if (v === null || v === undefined) return '-';
  return Number(v).toLocaleString('tr-TR');
};

const handlePlanClick = (plan) => {
  alert(`Paket seçildi: ${plan.name} — ${formatPrice(plan.price_monthly)} ${plan.currency}/ay`);
};
</script>

<template>
  <div class="app-root">
    <header class="header">
      <div class="container header-inner">
        <div class="logo" @click="window.location.reload()">TradePiGlobal</div>
        <nav class="nav">
          <a href="#sectors">Sektörler</a>
          <a href="#premium">Premium Satıcılar</a>
          <a href="#rfq">RFQ Oluştur</a>
        </nav>
        <div class="header-actions">
          <button class="btn-ghost">Giriş Yap</button>
          <button class="btn-primary">Satıcı Ol</button>
        </div>
      </div>
    </header>

    <main class="container main">
      <section class="hero">
        <div class="hero-left">
          <h1>Global Ticarete Açılın</h1>
          <p>İşletmenize en uygun paketi seçin, dünyaya satışa başlayın.</p>
        </div>
        <div class="hero-right">
          <div class="hero-cards">
            <div v-for="p in plans" :key="p.id" class="hero-card" :class="{ popular: p.name === 'Pro Satıcı' }">
              <div class="card-title">{{ p.name }}</div>
              <div class="card-price">
                <strong>{{ formatPrice(p.price_monthly) }}</strong>
                <span v-if="p.currency"> {{ p.currency }}/ay</span>
              </div>
              <button class="btn-plan" @click="handlePlanClick(p)">Seç</button>
            </div>
          </div>
        </div>
      </section>

      <section id="sectors" class="sectors">
        <h2>Sektörler</h2>
        <div class="sectors-grid">
          <div v-for="s in sectors" :key="s.id" class="sector">
            {{ s.name }}
          </div>
        </div>
      </section>

      <section id="premium" class="membership">
        <h2>Satıcı Üyelik Paketleri</h2>

        <div v-if="loading" class="loading">Paketler yükleniyor...</div>
        <div v-else-if="error" class="error">{{ error }}</div>
        <div v-else class="plans-grid">
          <article v-for="plan in plans" :key="plan.id" class="plan-card">
            <h3>{{ plan.name }}</h3>
            <p class="plan-desc">{{ plan.has_3d_showroom ? '3D fuar + vitrin hakkı' : 'Temel paket' }}</p>
            <div class="plan-price"><strong>{{ formatPrice(plan.price_monthly) }}</strong> <span v-if="plan.currency">{{ plan.currency }}</span></div>
            <button class="btn-plan" @click="handlePlanClick(plan)">Satın Al</button>
          </article>
        </div>
      </section>

      <section id="rfq" class="rfq">
        <h2>Teklif İste (RFQ)</h2>
        <p>İleride burada RFQ formu olacak.</p>
      </section>
    </main>

    <footer class="footer">
      <div class="container">© 2025 TradePiGlobal</div>
    </footer>
  </div>
</template>

<style>
:root{
  --bg:#f7f8fb;
  --card:#fff;
  --accent:#ffc107;
  --primary:#0b5cff;
  --muted:#6b7280;
}
body{margin:0;font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,"Helvetica Neue",Arial;color:#111;background:var(--bg)}
.container{max-width:1100px;margin:0 auto;padding:20px}
.header{background:#ffffff;border-bottom:1px solid #e6e9ef}
.header-inner{display:flex;align-items:center;justify-content:space-between}
.logo{font-weight:700;cursor:pointer}
.nav a{margin:0 10px;color:#333;text-decoration:none}
.header-actions button{margin-left:8px;padding:8px 12px;border-radius:6px;border:1px solid #ddd;background:#fff;cursor:pointer}
.btn-primary{background:var(--primary);color:#fff;border:none}
.main{padding:40px 20px}
.hero{display:flex;gap:20px;align-items:center;justify-content:space-between}
.hero-left h1{margin:0 0 10px;font-size:28px}
.hero-right{flex:1}
.hero-cards{display:flex;gap:12px;flex-wrap:wrap}
.hero-card{background:var(--card);padding:14px;border-radius:10px;box-shadow:0 6px 18px rgba(11,92,255,0.06);min-width:160px}
.hero-card.popular{border:2px solid #f59e0b;transform:translateY(-6px)}
.sectors{margin-top:30px}
.sectors-grid{display:flex;gap:10px;flex-wrap:wrap}
.sector{background:#fff;padding:10px 14px;border-radius:10px;box-shadow:0 4px 10px rgba(0,0,0,0.04)}
.membership{margin-top:30px}
.plans-grid{display:flex;gap:12px;flex-wrap:wrap}
.plan-card{background:#fff;padding:16px;border-radius:10px;min-width:200px;box-shadow:0 6px 18px rgba(0,0,0,0.04)}
.plan-price{margin:10px 0}
.btn-plan{background:var(--primary);color:white;border:none;padding:8px 10px;border-radius:8px;cursor:pointer}
.footer{background:#fff;border-top:1px solid #eee;padding:20px;margin-top:40px;text-align:center;color:var(--muted)}
.loading{color:var(--muted)}
.error{color:#c53030}
@media (max-width:800px){
  .hero{flex-direction:column;align-items:flex-start}
  .hero-card{min-width:unset;width:100%}
}
</style>
