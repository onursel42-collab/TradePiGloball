<template>
  <div class="tpg-page">
    <header class="tpg-header">
      <div class="tpg-logo">TradePiGlobal</div>
      <nav class="tpg-nav">
        <a href="#showroom">3D Fuar Alanı</a>
        <a href="#plans">Üyelik Planları</a>
      </nav>
    </header>

    <main>
      <section class="tpg-hero">
        <div class="tpg-hero-text">
          <h1>Üretici ve alıcıları tek B2B köprüde buluşturuyoruz.</h1>
          <p>
            Vue.js + Babylon.js ile 2D panel + 3D fuar alanı tek altyapıda birleşiyor.
          </p>
          <div class="tpg-hero-actions">
            <button class="btn-primary">Alıcı olarak başla</button>
            <button class="btn-ghost">Satıcı olarak başla</button>
          </div>
        </div>
      </section>

      <section id="showroom" class="tpg-section">
        <h2>3D Fuar Alanı (demo)</h2>
        <p class="tpg-sub">
          4 vitrin alanı, her biri çoklu slotlardan oluşan standlar. Şimdilik demo sahne,
          sonra gerçek satıcı verisiyle dolduracağız.
        </p>
        <BabylonShowroom />
      </section>

      <section id="plans" class="tpg-section">
        <h2>Üyelik Planları (Supabase bağlanacak)</h2>
        <p class="tpg-sub">
          Supabase'deki <code>pricing_plans</code> tablosundan otomatik gelecek.
        </p>
      </section>
    </main>

    <footer class="tpg-footer">
      © 2025 TradePiGlobal – Vue.js + Babylon.js B2B altyapısı.
    </footer>
  </div>
</template>

<script setup>
import BabylonShowroom from "./components/BabylonShowroom.vue";
</script>
