<!-- src/components/OwnerPanel.vue -->
<template>
  <div class="owner-layout">
    <aside class="owner-sidebar">
      <div class="owner-logo">TradePiGlobal • GOD MODE</div>

      <button
        v-for="item in menu"
        :key="item.key"
        :class="['owner-nav-btn', current === item.key && 'active']"
        @click="current = item.key"
      >
        {{ item.label }}
      </button>
    </aside>

    <main class="owner-main">
      <header class="owner-header">
        <h1>{{ currentTitle }}</h1>
        <p class="owner-sub">
          Sistem şu an tamamen senin kontrolünde. ⚡
        </p>
      </header>

      <!-- DASHBOARD -->
      <section v-if="current === 'dashboard'">
        <div class="owner-cards">
          <div class="owner-card">
            <div class="owner-card-label">Toplam Satıcı</div>
            <div class="owner-card-value">{{ stats.totalSellers }}</div>
          </div>
          <div class="owner-card">
            <div class="owner-card-label">Onaylı Satıcı</div>
            <div class="owner-card-value">{{ stats.approvedSellers }}</div>
          </div>
          <div class="owner-card">
            <div class="owner-card-label">Bekleyen Başvuru</div>
            <div class="owner-card-value">{{ stats.pendingSellers }}</div>
          </div>
        </div>
      </section>

      <!-- SELLERS -->
      <section v-if="current === 'sellers'">
        <div class="owner-section-header">
          <h2>Satıcılar</h2>
          <button class="owner-refresh" @click="loadSellers" :disabled="loadingSellers">
            Yenile
          </button>
        </div>

        <div v-if="loadingSellers" class="owner-info">Satıcılar yükleniyor…</div>
        <div v-else-if="sellersError" class="owner-error">{{ sellersError }}</div>

        <table v-else class="owner-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Firma</th>
              <th>Ülke / Şehir</th>
              <th>Plan</th>
              <th>Durum</th>
              <th>Oluşturma</th>
              <th>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="seller in sellers" :key="seller.id">
              <td>{{ seller.id }}</td>
              <td>{{ seller.companies?.name || '-' }}</td>
              <td>
                {{ seller.companies?.country || '-' }}
                <span v-if="seller.companies?.city">/ {{ seller.companies.city }}</span>
              </td>
              <td>
                <span v-if="seller.membership_plans">
                  {{ seller.membership_plans.name }}
                  <span class="owner-plan-price">
                    ({{ seller.membership_plans.price_monthly }} {{ seller.membership_plans.currency }}/ay)
                  </span>
                </span>
                <span v-else>-</span>
              </td>
              <td>
                <span :class="['badge', 'badge-' + seller.status]">
                  {{ seller.status }}
                </span>
              </td>
              <td>{{ formatDate(seller.created_at) }}</td>
              <td class="owner-actions">
                <button
                  class="owner-btn-small"
                  @click="changeStatus(seller.id, 'approved')"
                  :disabled="seller.status === 'approved' || loadingAction"
                >
                  Onayla
                </button>
                <button
                  class="owner-btn-small owner-btn-warn"
                  @click="changeStatus(seller.id, 'suspended')"
                  :disabled="seller.status === 'suspended' || loadingAction"
                >
                  Askıya Al
                </button>
                <button
                  class="owner-btn-small owner-btn-ghost"
                  @click="changeStatus(seller.id, 'pending')"
                  :disabled="seller.status === 'pending' || loadingAction"
                >
                  Pending
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <!-- PLANS -->
      <section v-if="current === 'plans'">
        <div class="owner-section-header">
          <h2>Üyelik Paketleri</h2>
          <button class="owner-refresh" @click="loadPlans" :disabled="loadingPlans">
            Yenile
          </button>
        </div>

        <div v-if="loadingPlans" class="owner-info">Paketler yükleniyor…</div>
        <div v-else-if="plansError" class="owner-error">{{ plansError }}</div>

        <div v-else class="owner-plans-grid">
          <article
            v-for="plan in plans"
            :key="plan.id"
            class="owner-plan-card"
            :class="{ gold: plan.has_3d_showroom }"
          >
            <h3>{{ plan.name }}</h3>
            <p class="owner-plan-desc">{{ plan.description || 'Açıklama yok.' }}</p>
            <p class="owner-plan-price-main">
              {{ formatPrice(plan.price_monthly) }} {{ plan.currency }}/ay
            </p>
            <p class="owner-plan-meta">
              Sıra: {{ plan.sort_order }} • Aktif: {{ plan.is_active ? 'Evet' : 'Hayır' }}
            </p>
            <p class="owner-plan-meta">
              3D Fuar: {{ plan.has_3d_showroom ? 'VAR' : 'YOK' }}
            </p>
          </article>
        </div>
      </section>

      <!-- RINGO -->
      <section v-if="current === 'ringo'">
        <h2>Ringo • Global Fiyat Asistanı</h2>
        <p class="owner-info">
          Buraya satıcı tarafında kullanılan Ringo hesaplama kuralları, katsayılar,
          ülke vergi oranları vs. gömülecek.
        </p>
        <p class="owner-info">
          V1 için sadece panelde taslak açıklama bıraktım; istersen bir sonraki adımda
          buraya gerçek formu da ekleriz.
        </p>
      </section>

      <!-- SYSTEM -->
      <section v-if="current === 'system'">
        <h2>Sistem Durumu</h2>
        <p class="owner-info">
          Buraya loglar, metrikler ve “bakım modu aç/kapa” gibi God-mode ayarlarını
          rahatça ekleyebiliriz. Şimdilik placeholder.
        </p>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { getAllSellers, updateSellerStatus } from '../services/adminService';
import { getActivePlans } from '../services/planService';

const menu = [
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'sellers', label: 'Satıcılar' },
  { key: 'plans', label: 'Üyelik Paketleri' },
  { key: 'ringo', label: 'Ringo Ayarları' },
  { key: 'system', label: 'Sistem' },
];

const current = ref('dashboard');

const sellers = ref([]);
const loadingSellers = ref(false);
const sellersError = ref('');

const plans = ref([]);
const loadingPlans = ref(false);
const plansError = ref('');

const loadingAction = ref(false);

const stats = computed(() => {
  const total = sellers.value.length;
  const approved = sellers.value.filter((s) => s.status === 'approved').length;
  const pending = sellers.value.filter((s) => s.status === 'pending').length;
  return {
    totalSellers: total,
    approvedSellers: approved,
    pendingSellers: pending,
  };
});

const currentTitle = computed(() => {
  const item = menu.find((m) => m.key === current.value);
  return item ? item.label : 'Panel';
});

const formatPrice = (val) => {
  if (!val) return '0';
  return Number(val).toLocaleString('tr-TR');
};

const formatDate = (val) => {
  if (!val) return '-';
  return new Date(val).toLocaleString('tr-TR');
};

const loadSellers = async () => {
  try {
    loadingSellers.value = true;
    sellersError.value = '';
    sellers.value = await getAllSellers();
  } catch (e) {
    console.error(e);
    sellersError.value = e.message || 'Satıcılar yüklenemedi.';
  } finally {
    loadingSellers.value = false;
  }
};

const loadPlans = async () => {
  try {
    loadingPlans.value = true;
    plansError.value = '';
    plans.value = await getActivePlans();
  } catch (e) {
    console.error(e);
    plansError.value = e.message || 'Paketler yüklenemedi.';
  } finally {
    loadingPlans.value = false;
  }
};

const changeStatus = async (sellerId, status) => {
  try {
    loadingAction.value = true;
    await updateSellerStatus(sellerId, status);
    await loadSellers();
  } catch (e) {
    console.error(e);
    alert('Durum güncellenemedi: ' + (e.message || 'Hata'));
  } finally {
    loadingAction.value = false;
  }
};

onMounted(async () => {
  await Promise.all([loadSellers(), loadPlans()]);
});
</script>

<style scoped>
.owner-layout {
  display: flex;
  min-height: 100vh;
  background: #020617;
  color: #e5e7eb;
  font-size: 14px;
}
.owner-sidebar {
  width: 230px;
  border-right: 1px solid #111827;
  padding: 16px;
  background: #020617;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.owner-logo {
  font-weight: 700;
  margin-bottom: 12px;
  font-size: 13px;
  color: #facc15;
}
.owner-nav-btn {
  border: none;
  background: transparent;
  padding: 8px 10px;
  border-radius: 8px;
  text-align: left;
  cursor: pointer;
  color: #9ca3af;
}
.owner-nav-btn.active {
  background: #111827;
  color: #e5e7eb;
}
.owner-main {
  flex: 1;
  padding: 20px;
}
.owner-header h1 {
  font-size: 20px;
}
.owner-sub {
  font-size: 12px;
  color: #9ca3af;
}
.owner-cards {
  margin-top: 16px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
.owner-card {
  padding: 12px 14px;
  border-radius: 12px;
  background: #020617;
  border: 1px solid #1f2937;
  min-width: 150px;
}
.owner-card-label {
  font-size: 12px;
  color: #9ca3af;
}
.owner-card-value {
  font-size: 20px;
  margin-top: 6px;
}
.owner-section-header {
  margin-top: 16px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.owner-refresh {
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 999px;
  border: 1px solid #4b5563;
  background: transparent;
  color: #e5e7eb;
  cursor: pointer;
}
.owner-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 8px;
}
.owner-table th,
.owner-table td {
  padding: 6px 8px;
  border-bottom: 1px solid #111827;
  text-align: left;
  font-size: 12px;
}
.owner-table th {
  color: #9ca3af;
  font-weight: 500;
}
.owner-actions {
  display: flex;
  gap: 4px;
}
.owner-btn-small {
  border: none;
  border-radius: 999px;
  padding: 3px 8px;
  font-size: 11px;
  cursor: pointer;
  background: #22c55e;
  color: #021014;
}
.owner-btn-warn {
  background: #f97316;
  color: #021014;
}
.owner-btn-ghost {
  background: #020617;
  border: 1px solid #4b5563;
  color: #e5e7eb;
}
.badge {
  padding: 2px 6px;
  border-radius: 999px;
  font-size: 11px;
}
.badge-approved {
  background: #22c55e33;
  color: #4ade80;
}
.badge-pending {
  background: #facc1533;
  color: #fde68a;
}
.badge-suspended {
  background: #ef444433;
  color: #fecaca;
}
.owner-info {
  margin-top: 8px;
  font-size: 12px;
  color: #9ca3af;
}
.owner-error {
  margin-top: 8px;
  font-size: 12px;
  color: #fecaca;
}
.owner-plans-grid {
  display: grid;
  gap: 10px;
  margin-top: 8px;
}
.owner-plan-card {
  padding: 12px;
  border-radius: 12px;
  border: 1px solid #1f2937;
  background: #020617;
}
.owner-plan-card.gold {
  border-color: #facc15;
}
.owner-plan-desc {
  font-size: 12px;
  color: #9ca3af;
  margin-top: 4px;
}
.owner-plan-price-main {
  margin-top: 6px;
  font-weight: 600;
}
.owner-plan-meta {
  font-size: 11px;
  color: #9ca3af;
}
.owner-plan-price {
  font-size: 11px;
  opacity: 0.8;
}
</style>
