<!-- src/components/AuthBox.vue -->
<template>
  <div class="auth-box">
    <div class="auth-tabs">
      <button
        :class="['auth-tab', mode === 'login' && 'auth-tab-active']"
        @click="mode = 'login'"
      >
        Giriş Yap
      </button>
      <button
        :class="['auth-tab', mode === 'signup' && 'auth-tab-active']"
        @click="mode = 'signup'"
      >
        Kayıt Ol
      </button>
    </div>

    <form @submit.prevent="handleSubmit" class="auth-form">
      <div v-if="mode === 'signup'" class="field">
        <label>Ad Soyad</label>
        <input v-model="fullName" required />
      </div>

      <div class="field">
        <label>E-posta</label>
        <input v-model="email" type="email" required />
      </div>

      <div class="field">
        <label>Şifre</label>
        <input v-model="password" type="password" required />
      </div>

      <button type="submit" class="auth-button" :disabled="loading">
        {{ loading ? 'İşlem yapılıyor…' : (mode === 'login' ? 'Giriş Yap' : 'Kayıt Ol') }}
      </button>

      <p v-if="error" class="auth-error">{{ error }}</p>
      <p v-if="success" class="auth-success">{{ success }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref, watch, defineEmits, defineProps } from 'vue';
import { supabase } from '../lib/supabaseClient';

const props = defineProps({
  initialMode: {
    type: String,
    default: 'login',
  },
});

const emit = defineEmits(['auth-success']);

const mode = ref(props.initialMode); // login | signup
const email = ref('');
const password = ref('');
const fullName = ref('');

const loading = ref(false);
const error = ref('');
const success = ref('');

watch(
  () => props.initialMode,
  (val) => {
    mode.value = val || 'login';
  }
);

const handleSubmit = async () => {
  loading.value = true;
  error.value = '';
  success.value = '';

  try {
    if (mode.value === 'signup') {
      const { error: err } = await supabase.auth.signUp({
        email: email.value,
        password: password.value,
        options: {
          data: { full_name: fullName.value },
        },
      });

      if (err) throw err;

      success.value = 'Kayıt oluşturuldu. E-postanı kontrol et.';
      emit('auth-success');
    } else {
      const { error: err } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value,
      });

      if (err) throw err;

      success.value = 'Giriş başarılı.';
      emit('auth-success');
    }
  } catch (e) {
    console.error(e);
    error.value = e.message || 'Bir hata oluştu.';
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.auth-box {
  max-width: 360px;
  padding: 16px;
  border-radius: 16px;
  background: #020617;
  border: 1px solid #1f2937;
  color: #e5e7eb;
}
.auth-tabs {
  display: flex;
  gap: 4px;
  margin-bottom: 12px;
  background: #020617;
  padding: 4px;
  border-radius: 999px;
}
.auth-tab {
  flex: 1;
  border-radius: 999px;
  border: none;
  padding: 6px 0;
  font-size: 13px;
  cursor: pointer;
  background: transparent;
  color: #9ca3af;
}
.auth-tab-active {
  background: #facc15;
  color: #111827;
  font-weight: 600;
}
.auth-form {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.field {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
input {
  padding: 8px 10px;
  border-radius: 10px;
  border: 1px solid #4b5563;
  background: #020617;
  color: #e5e7eb;
  font-size: 13px;
}
.auth-button {
  margin-top: 6px;
  padding: 8px;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  background: #22c55e;
  color: #021014;
  font-weight: 600;
  font-size: 14px;
}
.auth-error {
  margin-top: 4px;
  color: #fecaca;
  font-size: 12px;
}
.auth-success {
  margin-top: 4px;
  color: #bbf7d0;
  font-size: 12px;
}
</style>
