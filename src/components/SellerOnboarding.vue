<!-- src/components/SellerOnboarding.vue -->
<template>
  <div class="seller-box">
    <h2>Satıcı Ol / Mağaza Aç</h2>

    <div v-if="loadingUser" class="info">
      Kullanıcı bilgisi yükleniyor…
    </div>

    <div v-else-if="!user" class="info">
      Satıcı başvurusu yapmak için önce giriş yapmalısın.
    </div>

    <form v-else @submit.prevent="submitForm" class="seller-form">
      <div class="field">
        <label>Firma Adı</label>
        <input v-model="companyName" required />
      </div>

      <div class="field">
        <label>Ülke</label>
        <input v-model="country" required />
      </div>

      <div class="field">
        <label>Şehir</label>
        <input v-model="city" required />
      </div>

      <div class="field">
        <label>Adres</label>
        <textarea v-model="address" rows="2"></textarea>
      </div>

      <div class="field">
        <label>Web Sitesi (opsiyonel)</label>
        <input v-model="website" />
      </div>

      <div class="field">
        <label>Sektör</label>
        <input v-model="sector" placeholder="Örn: Gıda, Tekstil, Metal..." />
      </div>

      <button type="submit" class="seller-button" :disabled="loading">
        {{ loading ? 'Gönderiliyor…' : 'Satıcı Başvurusunu Gönder' }}
      </button>

      <p v-if="error" class="error">{{ error }}</p>
      <p v-if="success" class="success">{{ success }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted, defineEmits } from 'vue';
import { supabase } from '../lib/supabaseClient';
import { createSellerApplication } from '../services/sellerService';

const emit = defineEmits(['submitted']);

const user = ref(null);
const loadingUser = ref(true);

const companyName = ref('');
const country = ref('');
const city = ref('');
const address = ref('');
const website = ref('');
const sector = ref('');

const loading = ref(false);
const error = ref('');
const success = ref('');

onMounted(async () => {
  const { data, error: err } = await supabase.auth.getUser();
  loadingUser.value = false;

  if (err) {
    console.error(err);
    return;
  }

  user.value = data.user || null;
});

const submitForm = async () => {
  if (!user.value) {
    error.value = 'Önce giriş yapmalısın.';
    return;
  }

  loading.value = true;
  error.value = '';
  success.value = '';

  try {
    await createSellerApplication({
      companyName: companyName.value,
      country: country.value,
      city: city.value,
      address: address.value,
      website: website.value,
      sector: sector.value,
    });

    success.value = 'Başvurun alındı. Onaylandıktan sonra mağazan aktif edilecek.';
    emit('submitted');

    companyName.value = '';
    country.value = '';
    city.value = '';
    address.value = '';
    website.value = '';
    sector.value = '';
  } catch (e) {
    console.error(e);
    error.value = e.message || 'Başvuru sırasında hata oluştu.';
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.seller-box {
  max-width: 480px;
  padding: 16px;
  border-radius: 16px;
  border: 1px solid #1f2937;
  background: #020617;
  color: #e5e7eb;
}
.seller-form {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.field {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
input,
textarea {
  padding: 8px 10px;
  border-radius: 10px;
  border: 1px solid #4b5563;
  background: #020617;
  color: #e5e7eb;
  font-size: 13px;
}
.seller-button {
  margin-top: 6px;
  padding: 8px;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  background: #22c55e;
  color: #021014;
  font-weight: 600;
}
.error {
  margin-top: 4px;
  color: #fecaca;
  font-size: 12px;
}
.success {
  margin-top: 4px;
  color: #bbf7d0;
  font-size: 12px;
}
.info {
  font-size: 13px;
  opacity: 0.8;
}
</style>
