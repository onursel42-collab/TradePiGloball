<template>
  <div class="seller-form">
    <h2>Satıcı Ol / Mağaza Aç</h2>

    <form @submit.prevent="submitForm">
      <div class="field">
        <label>Firma Adı</label>
        <input v-model="companyName" required />
      </div>

      <div class="field">
        <label>Ülke</label>
        <input v-model="country" required />
      </div>

      <div class="field">
        <label>E-posta</label>
        <input v-model="email" type="email" required />
      </div>

      <div class="field">
        <label>Web Sitesi (opsiyonel)</label>
        <input v-model="website" />
      </div>

      <div class="field">
        <label>Sektör</label>
        <input v-model="sector" placeholder="Örn: Gıda, Tekstil, Metal..." />
      </div>

      <button type="submit" :disabled="loading">
        {{ loading ? 'Gönderiliyor...' : 'Başvuruyu Gönder' }}
      </button>

      <p v-if="success" class="success">
        Başvurun alındı. En kısa sürede seninle iletişime geçeceğiz.
      </p>
      <p v-if="error" class="error">
        {{ error }}
      </p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { supabase } from '../lib/supabaseClient';

const companyName = ref('');
const country = ref('');
const email = ref('');
const website = ref('');
const sector = ref('');

const loading = ref(false);
const success = ref(false);
const error = ref('');

const submitForm = async () => {
  loading.value = true;
  error.value = '';
  success.value = false;

  const { data, error: err } = await supabase
    .from('seller_applications') // Supabase'te bu tabloyu kullan
    .insert({
      company_name: companyName.value,
      country: country.value,
      contact_email: email.value,
      website: website.value || null,
      sector: sector.value || null,
      status: 'pending', // İlk başta beklemede
    });

  loading.value = false;

  if (err) {
    console.error(err);
    error.value = 'Başvurun kaydedilirken bir hata oluştu. Lütfen tekrar dene.';
    return;
  }

  // Temizle
  companyName.value = '';
  country.value = '';
  email.value = '';
  website.value = '';
  sector.value = '';

  success.value = true;
};
</script>

<style scoped>
.seller-form {
  max-width: 420px;
  padding: 16px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  background: white;
}
.field {
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
input {
  padding: 8px 10px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
}
button {
  margin-top: 10px;
  width: 100%;
  padding: 10px;
  border-radius: 9999px;
  border: none;
  cursor: pointer;
}
.success {
  margin-top: 8px;
  color: #16a34a;
}
.error {
  margin-top: 8px;
  color: #dc2626;
}
</style>
