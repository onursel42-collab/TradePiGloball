<!-- src/components/SellerPanel.vue -->
<template>
  <div class="panel-layout">
    <!-- SOL MENÜ -->
    <aside class="panel-sidebar">
      <div class="panel-logo">
        Satıcı Paneli
        <div class="panel-sub">
          {{ company?.name || 'Firma adı yok' }}
        </div>
      </div>

      <button
        v-for="item in menu"
        :key="item.key"
        :class="['panel-nav-btn', current === item.key && 'active']"
        @click="current = item.key"
      >
        {{ item.label }}
      </button>

      <div class="panel-footer">
        <div class="badge-status" :class="'status-' + (seller?.status || 'pending')">
          Durum: {{ sellerStatusText }}
        </div>
        <div v-if="plan" class="badge-plan">
          Paket: {{ plan.name }}
        </div>
      </div>
    </aside>

    <!-- SAĞ İÇERİK -->
    <main class="panel-main">
      <!-- Yükleniyor -->
      <div v-if="loading" class="panel-info">
        Panel yükleniyor…
      </div>

      <!-- Satıcı bulunamadı -->
      <div v-else-if="!seller">
        <div class="panel-card warn">
          <h2>Satıcı kaydı bulunamadı</h2>
          <p>
            Giriş yaptın ama sistemde satıcı kaydın yok. Ana sayfadan
            <strong>“Satıcı Ol / Mağaza Aç”</strong> başvurusu yaptıktan sonra bu panel aktif olacak.
          </p>
        </div>
      </div>

      <!-- Onay bekliyor -->
      <div v-else-if="seller.status === 'pending'">
        <div class="panel-card pending">
          <h2>Başvurun inceleniyor…</h2>
          <p>
            Firmana ait bilgiler sisteme düştü. TradePiGlobal ekibi tarafından onaylandıktan sonra
            bu panel üzerinden ürün ekleme, RFQ yanıtlama ve 3D showroom süreçleri açılacak.
          </p>
        </div>
      </div>

      <!-- Panel aktif (approved) -->
      <div v-else>
        <!-- GENEL -->
        <section v-if="current === 'dashboard'" class="panel-section">
          <h1>Genel Bakış</h1>

          <div class="grid-2">
            <div class="panel-card">
              <h3>Firma Bilgileri</h3>
              <p><strong>Firma Adı:</strong> {{ company?.name || '-' }}</p>
              <p>
                <strong>Ülke / Şehir:</strong>
                {{ company?.country || '-' }}
                <span v-if="company?.city"> / {{ company.city }}</span>
              </p>
              <p><strong>Sektör:</strong> {{ company?.sector || '-' }}</p>
              <p><strong>Adres:</strong> {{ company?.address || '-' }}</p>
              <p>
                <strong>Web Sitesi:</strong>
                <span v-if="company?.website">
                  <a :href="company.website" target="_blank">{{ company.website }}</a>
                </span>
                <span v-else>-</span>
              </p>
            </div>

            <div class="panel-card">
              <h3>Üyelik & Paket</h3>
              <p><strong>Satıcı Durumu:</strong> {{ sellerStatusText }}</p>
              <p v-if="plan">
                <strong>Paket:</strong> {{ plan.name }}
              </p>
              <p v-if="plan">
                <strong>Aylık Ücret:</strong>
                {{ formatPrice(plan.price_monthly) }}
                {{ plan.currency }}
              </p>
              <p v-if="plan?.has_3d_showroom">
                <strong>3D Fuar:</strong> AKTİF (Gold Slot)
              </p>
              <p v-else>
                <strong>3D Fuar:</strong> Yok (Yükseltilebilir)
              </p>
            </div>
          </div>
        </section>

        <!-- ÜRÜNLER -->
        <section v-if="current === 'products'" class="panel-section">
          <h1>Ürünlerim</h1>

          <!-- ÜRÜN EKLEME FORMU -->
          <div class="panel-card">
            <h3>Yeni Ürün Ekle</h3>

            <div class="form-grid">
              <div class="form-field">
                <label>Ürün Adı *</label>
                <input
                  v-model="productForm.name"
                  type="text"
                  placeholder="Örn: PET Granül 25kg"
                />
              </div>

              <div class="form-field">
                <label>Maliyet (Birim)</label>
                <input
                  v-model.number="productForm.base_cost"
                  type="number"
                  step="0.01"
                  placeholder="Örn: 10.50"
                />
              </div>

              <div class="form-field">
                <label>Satış Fiyatı (Birim)</label>
                <input
                  v-model.number="productForm.sale_price"
                  type="number"
                  step="0.01"
                  placeholder="Örn: 14.90"
                />
              </div>

              <div class="form-field">
                <label>Gönderim Ülkesi (ISO Kodu)</label>
                <input
                  v-model="productForm.from_country"
                  type="text"
                  placeholder="Örn: TR, DE, CN"
                />
              </div>

              <div class="form-field">
                <label>Ağırlık (kg)</label>
                <input
                  v-model.number="productForm.weight_kg"
                  type="number"
                  step="0.001"
                  placeholder="Örn: 25"
                />
              </div>

              <div class="form-field">
                <label>HS Kodu</label>
                <input
                  v-model="productForm.hs_code"
                  type="text"
                  placeholder="Örn: 39076020"
                />
              </div>
            </div>

            <div class="form-actions">
              <button
                class="btn-primary-sm"
                :disabled="productSaving"
                @click="handleCreateProduct"
              >
                {{ productSaving ? 'Kaydediliyor…' : 'Ürünü Kaydet' }}
              </button>
              <span v-if="productError" class="error-text">{{ productError }}</span>
            </div>
          </div>

          <!-- ÜRÜN LİSTESİ -->
          <div class="panel-card">
            <h3>Ürün Listesi</h3>

            <div v-if="loadingProducts" class="panel-info">
              Ürünler yükleniyor…
            </div>

            <div v-else-if="products.length === 0" class="muted">
              Henüz eklenmiş ürün yok. Yukarıdan ilk ürününü ekleyebilirsin.
            </div>

            <table v-else class="panel-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Ürün Adı</th>
                  <th>Maliyet</th>
                  <th>Satış</th>
                  <th>Ülke</th>
                  <th>Ağırlık (kg)</th>
                  <th>HS Kodu</th>
                  <th>Oluşturma</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="p in products" :key="p.id">
                  <td>{{ p.id }}</td>
                  <td>{{ p.name }}</td>
                  <td>{{ formatPrice(p.base_cost) }}</td>
                  <td>{{ formatPrice(p.sale_price) }}</td>
                  <td>{{ p.from_country || '-' }}</td>
                  <td>{{ p.weight_kg || '-' }}</td>
                  <td>{{ p.hs_code || '-' }}</td>
                  <td>{{ formatDate(p.created_at) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- RFQ -->
        <section v-if="current === 'rfq'" class="panel-section">
          <h1>RFQ Akışı</h1>
          <div class="panel-card">
            <p class="muted">
              RFQ (Teklif isteği) akışları bu alanda listelenecek.  
              İlk versiyonda:
            </p>
            <ul class="muted">
              <li>• Size gelen RFQ’ların listesi</li>
              <li>• Yanıtladığınız RFQ’ların durumu</li>
              <li>• Kazandığınız / kaybettiğiniz teklifler</li>
            </ul>
            <p class="muted">
              Bu kısım V2’de Supabase’deki <code>rfq_requests</code> ve <code>rfq_offers</code>
              tablolarıyla bağlanacak.
            </p>
          </div>
        </section>

        <!-- AYARLAR -->
        <section v-if="current === 'settings'" class="panel-section">
          <h1>Mağaza Ayarları</h1>

          <div class="panel-card">
            <h3>Genel Ayarlar</h3>
            <p class="muted">
              Buraya firma bilgisi güncelleme, iletişim kişisi, fatura ünvanı, KDV/Vergi no gibi
              alanlar gelecek.  
              Şimdilik sadece okuma modundayız.
            </p>
          </div>

          <div class="panel-card">
            <h3>Hesap</h3>
            <p><strong>Kullanıcı ID:</strong> {{ user?.id }}</p>
            <p><strong>E-posta:</strong> {{ user?.email }}</p>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { supabase } from '../lib/supabaseClient';
import { getCurrentUserWithSeller } from '../services/sellerService';
import { getMyProducts, createProduct } from '../services/productService';

const current = ref('dashboard'); // dashboard | products | rfq | settings
const loading = ref(true);

const user = ref(null);
const seller = ref(null);
const plan = ref(null);
const company = ref(null);

const products = ref([]);
const loadingProducts = ref(false);
const productError = ref('');
const productSaving = ref(false);

const productForm = ref({
  name: '',
  base_cost: null,
  sale_price: null,
  from_country: '',
  weight_kg: null,
  hs_code: '',
});

const menu = [
  { key: 'dashboard', label: 'Genel' },
  { key: 'products', label: 'Ürünler' },
  { key: 'rfq', label: 'RFQ' },
  { key: 'settings', label: 'Ayarlar' },
];

const sellerStatusText = computed(() => {
  if (!seller.value) return 'Yok';
  if (seller.value.status === 'approved') return 'Onaylı';
  if (seller.value.status === 'pending') return 'Onay Bekliyor';
  if (seller.value.status === 'suspended') return 'Askıya Alınmış';
  return seller.value.status;
});

const formatPrice = (val) => {
  if (!val && val !== 0) return '';
  const num = Number(val);
  if (Number.isNaN(num)) return '';
  return num.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const formatDate = (val) => {
  if (!val) return '-';
  return new Date(val).toLocaleString('tr-TR');
};

const loadCompany = async (companyId) => {
  if (!companyId) return;
  const { data, error } = await supabase
    .from('companies')
    .select('id, name, country, city, address, website, sector')
    .eq('id', companyId)
    .single();

  if (error) {
    console.error('company error', error);
    return;
  }

  company.value = data;
};

const loadProducts = async () => {
  try {
    loadingProducts.value = true;
    productError.value = '';
    const data = await getMyProducts();
    products.value = data;
  } catch (e) {
    console.error(e);
    productError.value = e.message || 'Ürünler getirilemedi.';
  } finally {
    loadingProducts.value = false;
  }
};

const resetProductForm = () => {
  productForm.value = {
    name: '',
    base_cost: null,
    sale_price: null,
    from_country: '',
    weight_kg: null,
    hs_code: '',
  };
};

const handleCreateProduct = async () => {
  if (!productForm.value.name) {
    productError.value = 'Ürün adı zorunludur.';
    return;
  }

  try {
    productSaving.value = true;
    productError.value = '';

    await createProduct(productForm.value);
    resetProductForm();
    await loadProducts();
  } catch (e) {
    console.error(e);
    productError.value = e.message || 'Ürün kaydedilemedi.';
  } finally {
    productSaving.value = false;
  }
};

onMounted(async () => {
  try {
    loading.value = true;
    const data = await getCurrentUserWithSeller();
    user.value = data.user;
    seller.value = data.seller;
    plan.value = data.plan;

    if (seller.value?.company_id) {
      await loadCompany(seller.value.company_id);
    }

    if (seller.value && seller.value.status === 'approved') {
      await loadProducts();
    }
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
  font-size: 14px;
}

/* SOL MENÜ */
.panel-sidebar {
  width: 240px;
  border-right: 1px solid #111827;
  padding: 16px;
  background: #020617;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.panel-logo {
  font-weight: 700;
  margin-bottom: 12px;
  font-size: 14px;
}
.panel-sub {
  font-size: 11px;
  color: #9ca3af;
}
.panel-nav-btn {
  border: none;
  background: transparent;
  padding: 8px 10px;
  border-radius: 8px;
  text-align: left;
  cursor: pointer;
  color: #9ca3af;
  font-size: 13px;
}
.panel-nav-btn.active {
  background: #111827;
  color: #e5e7eb;
}
.panel-footer {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.badge-status,
.badge-plan {
  font-size: 11px;
  padding: 4px 8px;
  border-radius: 999px;
  background: #020617;
  border: 1px solid #1f2937;
}
.status-approved {
  border-color: #22c55e;
  color: #4ade80;
}
.status-pending {
  border-color: #facc15;
  color: #fde68a;
}
.status-suspended {
  border-color: #ef4444;
  color: #fecaca;
}

/* SAĞ TARAF */
.panel-main {
  flex: 1;
  padding: 20px;
}
.panel-info {
  font-size: 13px;
  color: #9ca3af;
}

/* Kartlar */
.panel-card {
  padding: 14px;
  border-radius: 12px;
  background: #020617;
  border: 1px solid #1f2937;
  margin-bottom: 12px;
}
.panel-card h3 {
  margin-bottom: 6px;
  font-size: 15px;
}
.panel-card.pending {
  border-style: dashed;
  border-color: #facc15;
  background: #1e293b;
  color: #fde68a;
}
.panel-card.warn {
  border-style: dashed;
  border-color: #f97316;
  background: #1e293b;
}

/* Bölümler */
.panel-section h1 {
  font-size: 20px;
  margin-bottom: 12px;
}

/* Grid */
.grid-2 {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
  gap: 12px;
}

/* ÜRÜN FORMU */
.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 10px;
}
.form-field {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.form-field label {
  font-size: 12px;
  color: #9ca3af;
}
.form-field input {
  background: #020617;
  border-radius: 8px;
  border: 1px solid #1f2937;
  padding: 6px 8px;
  color: #e5e7eb;
  font-size: 13px;
}
.form-actions {
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
}
.error-text {
  font-size: 12px;
  color: #fecaca;
}

/* ÜRÜN TABLOSU */
.panel-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 8px;
  font-size: 12px;
}
.panel-table th,
.panel-table td {
  padding: 6px 8px;
  border-bottom: 1px solid #111827;
  text-align: left;
}
.panel-table th {
  color: #9ca3af;
  font-weight: 500;
}

/* Genel */
.muted {
  font-size: 12px;
  color: #9ca3af;
}
.btn-primary-sm {
  margin-top: 0;
  padding: 6px 10px;
  border-radius: 999px;
  border: none;
  background: #22c55e;
  color: #021014;
  font-size: 13px;
  cursor: pointer;
}

a {
  color: #38bdf8;
  text-decoration: underline;
}
code {
  background: #020617;
  border-radius: 4px;
  padding: 1px 4px;
  font-size: 11px;
}
</style>
