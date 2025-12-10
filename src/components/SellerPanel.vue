<template>
  <div class="panel-layout">
    
    <aside class="panel-sidebar">
      <button @click="current = 'dashboard'"
        :class="{ active: current === 'dashboard' }">
        Dashboard
      </button>
      <button @click="current = 'products'"
        :class="{ active: current === 'products' }">
        Ürünlerim
      </button>
      <button @click="current = 'add-product'"
        :class="{ active: current === 'add-product' }">
        Yeni Ürün
      </button>
    </aside>

    <main class="panel-content">

      <!-- Onay bekliyorsa -->
      <div v-if="seller?.status === 'pending'" class="waiting-box">
        Başvurun inceleniyor… 🎯  
        Onaylanınca kontrol paneline erişebilirsin.
      </div>

      <!-- Onaylanmış ise content -->
      <div v-else>
        <section v-if="current === 'dashboard'">
          <h2>Dashboard</h2>
          <p>Paket: {{ sellerPlan?.name }}</p>
          <p>Durum: {{ seller?.status }}</p>
        </section>

        <section v-if="current === 'products'">
          <h2>Ürünlerim</h2>
          <p>Henüz ürün yok.</p>
        </section>

        <section v-if="current === 'add-product'">
          <h2>Yeni Ürün Ekle</h2>
          <p>(Ürün formunu sonra koyacağız)</p>
        </section>
      </div>

    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { supabase } from '../lib/supabaseClient';

const current = ref('dashboard');

const seller = ref(null);
const sellerPlan = ref(null);

onMounted(async () => {
  const { data: userData } = await supabase.auth.getUser();
  const user = userData.user;
  if (!user) return;

  // seller bilgisini al
  const { data: sellerData } = await supabase
    .from('sellers')
    .select('*, membership_plan_id')
    .eq('user_id', user.id)
    .single();

  seller.value = sellerData;

  if (seller.value?.membership_plan_id) {
    const { data: plan } = await supabase
      .from('membership_plans')
      .select('*')
      .eq('id', seller.value.membership_plan_id)
      .single();

    sellerPlan.value = plan;
  }
});
</script>

<style scoped>
.panel-layout {
  display: flex;
  height: calc(100vh - 60px);
}

.panel-sidebar {
  width: 200px;
  background: #111827;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.panel-sidebar button {
  background: transparent;
  border: none;
  padding: 8px;
  text-align: left;
  border-radius: 6px;
  color: #94a3b8;
}

.panel-sidebar button.active {
  background: #1f2937;
  color: #f1f5f9;
  font-weight: 600;
}

.panel-content {
  flex: 1;
  background: #0f172a;
  color: #e2e8f0;
  padding: 20px;
}

.waiting-box {
  padding: 20px;
  border-radius: 12px;
  background: #1e293b;
  color: #fbbf24;
  border: 1px dashed #f59e0b;
}
</style>
