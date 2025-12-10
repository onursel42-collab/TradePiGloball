<!-- src/components/SellerPanel.vue -->
<template>
  <div class="panel-layout">
    <aside class="panel-sidebar">
      <div class="panel-logo">Satıcı Paneli</div>

      <button @click="current = 'dashboard'" :class="{ active: current === 'dashboard' }">
        Dashboard
      </button>
      <button @click="current = 'products'" :class="{ active: current === 'products' }">
        Ürünlerim
      </button>
      <button @click="current = 'add-product'" :class="{ active: current === 'add-product' }">
        Yeni Ürün
      </button>
    </aside>

    <main class="panel-content">
      <div v-if="loading" class="info">Panel yükleniyor…</div>

      <div v-else-if="!seller">
        <p class="info">Aktif bir satıcı kaydın bulunamadı.</p>
      </div>

      <div v-else-if="seller.status === 'pending'">
        <div class="waiting-box">
          <h2>Başvurun inceleniyor…</h2>
          <p>
            TradePiGlobal ekibi başvurunu kontrol ediyor. Onaylandığında bu panel üzerinden
            ürün eklemeye ve RFQ yanıtlamaya başlayabileceksin.
          </p>
        </div>
      </div>

      <div v-else>
        <section v-if="current === 'dashboard'">
          <h2>Dashboard</h2>
          <p><strong>Firma ID:</strong> {{ seller.company_id }}</p>
          <p><strong>Durum:</strong> {{ seller.status }}</p>
          <p v-if="plan"><strong>Paket:</strong> {{ plan.name }}</p>
        </section>

        <section v-if="current === 'products'">
          <h2>Ürünlerim</h2>
          <p>Ürün listesi burada olacak (V2’de dolduracağız).</p>
        </section>

        <section v-if="current === 'add-product'">
          <h2>Yeni Ürün Ekle</h2>
          <p>Ürün formunu V2’de ekleyeceğiz (şu an iskelet hazır).</p>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getCurrentUserWithSeller } from '../services/sellerService';

const current = ref('dashboard');
const loading = ref(true);
const user = ref(null);
const seller = ref(null);
const plan = ref(null);

onMounted(async () => {
  try {
    const data = await getCurrentUserWithSeller();
    user.value = data.user;
    seller.value = data.seller;
    plan.value = data.plan;
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.panel-layout {
  display: flex;
  min-height: 100vh;
  background: #020617;
  color: #e5e7eb;
}
.panel-sidebar {
  width: 220px;
  background: #020617;
  border-right: 1px solid #1f2937;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.panel-logo {
  font-weight: 700;
  margin-bottom: 12px;
}
.panel-sidebar button {
  background: transparent;
  border: none;
  text-align: left;
  padding: 8px 10px;
  border-radius: 8px;
  color: #9ca3af;
  cursor: pointer;
}
.panel-sidebar button.active {
  background: #1f2937;
  color: #e5e7eb;
}
.panel-content {
  flex: 1;
  padding: 20px;
}
.waiting-box {
  padding: 20px;
  border-radius: 12px;
  background: #1e293b;
  border: 1px dashed #f59e0b;
  color: #fbbf24;
}
.info {
  opacity: 0.9;
}
</style>
