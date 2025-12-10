<template>
  <div class="rfq-form">
    <h2>Teklif İste (RFQ)</h2>

    <form @submit.prevent="submitForm">
      <div class="field">
        <label>Ne satın almak istiyorsun?</label>
        <textarea v-model="description" required />
      </div>

      <div class="field">
        <label>Tahmini miktar</label>
        <input v-model="quantity" placeholder="Örn: 10.000 adet, 5 ton" />
      </div>

      <div class="field">
        <label>Gönderim / Teslimat Ülkesi</label>
        <input v-model="targetCountry" required />
      </div>

      <div class="field">
        <label>Tercih edilen ödeme yöntemi</label>
        <input v-model="paymentTerms" placeholder="Örn: Peşin, Akreditif (L/C)" />
      </div>

      <div class="field">
        <label>E-posta (teklif için)</label>
        <input v-model="email" type="email" required />
      </div>

      <button type="submit" :disabled="loading">
        {{ loading ? 'Gönderiliyor...' : 'Teklif İste' }}
      </button>

      <p v-if="success" class="success">
        Talebin alındı. Uygun tedarikçilerle eşleştirileceksin.
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

const description = ref('');
const quantity = ref('');
const targetCountry = ref('');
const paymentTerms = ref('');
const email = ref('');

const loading = ref(false);
const success = ref(false);
const error = ref('');

const submitForm = async () => {
  loading.value = true;
  error.value = '';
  success.value = false;

  const { data, error: err } = await supabase
    .from('rfqs') // RFQ tablosu
    .insert({
      description: description.value,
      quantity: quantity.value || null,
      target_country: targetCountry.value,
      payment_terms: paymentTerms.value || null,
      contact_email: email.value,
      status: 'pending',
    });

  loading.value = false;

  if (err) {
    console.error(err);
    error.value = 'Talebin kaydedilirken bir hata oluştu. Lütfen tekrar dene.';
    return;
  }

  description.value = '';
  quantity.value = '';
  targetCountry.value = '';
  paymentTerms.value = '';
  email.value = '';

  success.value = true;
};
</script>

<style scoped>
.rfq-form {
  max-width: 420px;
  padding: 16px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  background: white;
  margin-top: 16px;
}
.field {
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
textarea {
  min-height: 80px;
  padding: 8px 10px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
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
