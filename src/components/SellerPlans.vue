<script setup>
import { ref, onMounted } from 'vue';
import { getSellerPlans } from '../services/planService';

const loading = ref(true);
const error = ref('');
const plans = ref([]);

const loadPlans = async () => {
  loading.value = true;
  error.value = '';
  try {
    plans.value = await getSellerPlans();
  } catch (e) {
    console.error('Seller plans error', e);
    error.value = 'Planlar yüklenemedi.';
  } finally {
    loading.value = false;
  }
};

const handleSelect = (plan) => {
  const price = plan.price_monthly ?? plan.price ?? 0;
  const currency = plan.currency || 'TL';

  alert(
    `Paket seçildi: ${plan.name} — ` +
      `${Number(price).toLocaleString('tr-TR')} ${currency}/ay`
  );
};

onMounted(loadPlans);
</script>

<template>
  <section id="premium" class="section">
    <div class="container">
      <h2 class="section-title">Satıcı Üyelik Paketleri</h2>

      <div v-if="loading" class="info">Paketler yükleniyor…</div>
      <div v-else-if="error" class="error">{{ error }}</div>

      <div v-else class="plans-grid">
        <article
          v-for="plan in plans"
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
            <strong>
              {{ Number(plan.price_monthly ?? plan.price ?? 0).toLocaleString('tr-TR') }}
            </strong>
            <span v-if="plan.currency" class="plan-currency">
              {{ plan.currency }}/ay
            </span>
          </div>

          <button class="btn-plan" type="button" @click="handleSelect(plan)">
            Satın Al
          </button>
        </article>

        <p v-if="!plans.length && !loading" class="info">
          Şu anda aktif satıcı paketi bulunamadı.
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section {
  padding: 2rem 1rem;
}
.container {
  max-width: 960px;
  margin: 0 auto;
}
.section-title {
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 1rem;
}
.info,
.error {
  margin-top: 1rem;
  font-size: 0.9rem;
}
.error {
  color: #c0392b;
}
.plans-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}
.plan-card {
  border-radius: 12px;
  padding: 1rem;
  background: #ffffff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
}
.plan-gold {
  border: 2px solid #f1c40f;
}
.plan-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}
.badge-gold {
  font-size: 0.75rem;
  padding: 0.1rem 0.4rem;
  border-radius: 999px;
  background: #f1c40f;
}
.plan-desc {
  font-size: 0.85rem;
  margin-bottom: 0.75rem;
}
.plan-price {
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
  margin-bottom: 0.75rem;
}
.plan-price strong {
  font-size: 1.1rem;
}
.btn-plan {
  width: 100%;
  border: none;
  border-radius: 999px;
  padding: 0.6rem 1rem;
  font-size: 0.9rem;
  font-weight: 500;
  background: #2563eb;
  color: #ffffff;
}
.btn-plan:active {
  opacity: 0.9;
}
</style>
