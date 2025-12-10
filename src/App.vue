<script setup>
import { ref } from 'vue';
import SellerPlans from './components/SellerPlans.vue';
import BuyerPlans from './components/BuyerPlans.vue';

const view = ref('home');

const goTo = (target) => {
  view.value = target;

  if (target === 'home') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  const id = target === 'seller' ? 'premium' : 'buyer';
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
};
</script>

<template>
  <div class="page">
    <header class="header">
      <div class="container header-inner">
        <div class="logo" @click="goTo('home')" style="cursor: pointer">
          TradePiGlobal
        </div>

        <nav class="nav">
          <button type="button" class="nav-link" @click="goTo('home')">
            Anasayfa
          </button>
          <button type="button" class="nav-link" @click="goTo('seller')">
            Satıcı Paketleri
          </button>
          <button type="button" class="nav-link" @click="goTo('buyer')">
            Alıcı Paketleri
          </button>
        </nav>

        <div class="header-actions">
          <button type="button" class="btn-ghost">Giriş Yap</button>
          <button type="button" class="btn-primary">Satıcı Ol</button>
        </div>
      </div>
    </header>

    <main>
      <section class="hero">
        <div class="container hero-inner">
          <div class="hero-left">
            <h1>
              Üretici ve alıcıları
              <span class="gold">tek B2B köprüde</span>
              buluşturuyoruz.
            </h1>
            <p class="hero-sub">Pi destekli hibrit B2B ticaret altyapısı.</p>

            <ul class="hero-tags">
              <li>Escrow ödemeler</li>
              <li>Global görünürlük</li>
              <li>RFQ tabanlı eşleşme</li>
            </ul>
          </div>
        </div>
      </section>

      <SellerPlans />
      <BuyerPlans />
    </main>

    <footer class="footer">
      <div class="container footer-inner">
        <div class="footer-copy">© 2025 TradePiGlobal</div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  background: #f4f5fb;
  color: #111827;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
    sans-serif;
}

.header {
  position: sticky;
  top: 0;
  z-index: 10;
  background: #0f172a;
  color: #ffffff;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0.75rem 1rem;
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.logo {
  font-weight: 700;
}

.nav {
  display: flex;
  gap: 0.75rem;
}

.nav-link {
  background: transparent;
  border: none;
  color: #e5e7eb;
  font-size: 0.9rem;
}

.nav-link:active {
  opacity: 0.8;
}

.header-actions {
  display: flex;
  gap: 0.5rem;
}

.btn-ghost,
.btn-primary {
  border-radius: 999px;
  border: none;
  padding: 0.4rem 0.9rem;
  font-size: 0.85rem;
}

.btn-ghost {
  background: transparent;
  color: #e5e7eb;
}

.btn-primary {
  background: #2563eb;
  color: #ffffff;
}

.hero {
  padding: 2rem 1rem 1rem;
}

.hero-inner {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.hero-left h1 {
  font-size: 1.7rem;
  line-height: 1.2;
}

.gold {
  color: #f59e0b;
}

.hero-sub {
  margin-top: 0.5rem;
  color: #4b5563;
}

.hero-tags {
  margin-top: 0.75rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0;
  list-style: none;
}

.hero-tags li {
  font-size: 0.8rem;
  padding: 0.3rem 0.75rem;
  border-radius: 999px;
  background: #ffffff;
}

.footer {
  padding: 1.5rem 1rem 2rem;
  text-align: center;
  font-size: 0.8rem;
  color: #6b7280;
}
</style>
