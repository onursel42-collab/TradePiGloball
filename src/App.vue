<template>
  <div class="app-container">

    <!-- HEADER -->
    <header class="tpg-header">
      <div class="tpg-logo">TradePiGlobal</div>

      <nav class="tpg-nav">
        <button @click="goToHome">Ana Sayfa</button>
        <button @click="scrollToSection('seller-plans')">Satıcı Paketleri</button>
        <button @click="scrollToSection('buyer-plans')">Alıcı Paketleri</button>
        <button @click="scrollToSection('rfq-section')">RFQ Oluştur</button>
      </nav>

      <button class="tpg-login-btn" @click="toggleAuthBox">
        {{ user ? 'Hesabım' : 'Giriş Yap' }}
      </button>
    </header>

    <!-- LOGIN POPUP -->
    <AuthBox
      v-if="showAuth"
      @close="toggleAuthBox"
      @logged-in="onLoggedIn"
    />

    <!-- OWNER PANEL -->
    <OwnerPanel
      v-if="view === 'owner'"
      :user="user"
      @logout="logout"
    />

    <!-- SELLER PANEL -->
    <SellerPanel
      v-if="view === 'seller'"
      :user="user"
      @logout="logout"
    />

    <!-- ANA SAYFA -->
    <main v-if="view === 'home'" class="tpg-main">

      <!-- HERO -->
      <section class="tpg-hero">
        <h1>Global Ticaret Platformu</h1>
        <p>Satıcılar ve alıcılar için dünyanın en gelişmiş ticaret altyapısı</p>
      </section>

      <!-- SATI CI PLANLARI -->
      <section id="seller-plans" class="tpg-section-light">
        <PricingPlans
          :plans="sellerPlans"
          :loading="loadingPlans"
          @select="selectSellerPlan"
        />
      </section>

      <!-- ALICI PLANLARI -->
      <section id="buyer-plans" class="tpg-section-dark">
        <BuyerPlans />
      </section>

      <!-- RFQ -->
      <section id="rfq-section" class="rfq-section">
        <RFQForm />
      </section>

    </main>
  </div>
</template>


<script setup>
/* IMPORTLAR */
import { ref, onMounted } from 'vue'
import { supabase } from './lib/supabaseClient'

import PricingPlans from './components/SellerPlans.vue'
import BuyerPlans from './components/BuyerPlans.vue'
import SellerPanel from './components/SellerPanel.vue'
import OwnerPanel from './components/OwnerPanel.vue'
import AuthBox from './components/AuthBox.vue'
import RFQForm from './components/RFQForm.vue'

import { getSellerPlans } from './services/planService'
import { getCurrentUserWithSeller } from './services/sellerService'


/* STATE */
const view = ref('home')
const user = ref(null)
const showAuth = ref(false)
const sellerPlans = ref([])
const loadingPlans = ref(true)


/* LOGIN / LOGOUT */
function toggleAuthBox() {
  showAuth.value = !showAuth.value
}

async function onLoggedIn() {
  showAuth.value = false
  await loadUser()
}

async function logout() {
  await supabase.auth.signOut()
  user.value = null
  view.value = 'home'
}


/* USER + ROLE YÜKLEME */
async function loadUser() {
  const { data } = await supabase.auth.getUser()

  user.value = data?.user || null
  if (!user.value) {
    view.value = 'home'
    return
  }

  const u = await getCurrentUserWithSeller()

  if (u?.role === 'owner') {
    view.value = 'owner'
  } else if (u?.seller) {
    view.value = 'seller'
  } else {
    view.value = 'home'
  }
}


/* PLANLARI ÇEK */
async function loadPlans() {
  loadingPlans.value = true
  sellerPlans.value = await getSellerPlans()
  loadingPlans.value = false
}


/* PLAN SEÇİMİ */
function selectSellerPlan(plan) {
  if (!user.value) {
    toggleAuthBox()
    return
  }

  alert(`Paket seçildi: ${plan.name}`)
}


/* ANA SAYFA SCROLL */
function goToHome() {
  view.value = 'home'
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function scrollToSection(id) {
  view.value = 'home'
  setTimeout(() => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }, 200)
}


/* ON MOUNT */
onMounted(async () => {
  await loadUser()
  await loadPlans()
})
</script>


<style>
body, html {
  margin: 0;
  padding: 0;
}

.tpg-header {
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
}
.tpg-main {
  padding-bottom: 50px;
}
</style>
