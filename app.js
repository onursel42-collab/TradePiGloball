console.log("Supabase bağlanıyor...", SUPABASE_URL);

supabase.from("app_users").select("*").limit(1).then(({ data, error }) => {
  if (error) {
    console.error("Supabase HATA ‼️", error);
  } else {
    console.log("Supabase OK ✔️ Çalıştı!", data);
  }
});
// app.js

// Supabase JS'yi ESM olarak doğrudan CDN'den çekiyoruz
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// 🔐 Supabase bağlantı bilgilerini BURAYA YAZ
const SUPABASE_URL = 'https://gndyovpbppnjwicfetnf.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImduZHlvdnBicHBuandpY2ZldG5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ4ODk5MTcsImV4cCI6MjA4MDQ2NTkxN30.1_IAX8FVlvuTFp1ZhQZb-IaaPxfM3Mq4Rquj6to5EfU';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Küçük yardımcı: form altında mesaj göster
function showMessage(el, type, text) {
  if (!el) return;
  el.textContent = text;
  el.classList.remove('success', 'error');
  if (type) el.classList.add(type);
}

/* ===========================
   ALICI ÜYELİĞİ (ÜCRETSİZ)
   form id: buyer-form
=========================== */

const buyerForm = document.getElementById('buyer-form');
if (buyerForm) {
  const buyerMsg = document.getElementById('buyer-message');

  buyerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('buyer-name')?.value.trim();
    const email = document.getElementById('buyer-email')?.value.trim();

    if (!name || !email) {
      showMessage(buyerMsg, 'error', 'İsim ve e-posta zorunlu.');
      return;
    }

    showMessage(buyerMsg, null, 'Kayıt yapılıyor...');

    // 🔸 app_users tablosundaki kolonlar:
    // id (uuid, default) | full_name (text) | email (text, unique) | role (text)
    const { error } = await supabase.from('app_users').insert({
      full_name: name,
      email,
      role: 'buyer', // sadece burası alıcı
    });

    if (error) {
      console.error(error);
      showMessage(buyerMsg, 'error', 'Bir hata oluştu: ' + error.message);
    } else {
      showMessage(
        buyerMsg,
        'success',
        'Alıcı üyeliğiniz oluşturuldu. E-postanızı kontrol edin.'
      );
      buyerForm.reset();
    }
  });
}

/* ===========================
   SATICI BAŞVURUSU (ÜCRETLİ)
   form id: seller-form
=========================== */

const sellerForm = document.getElementById('seller-form');
if (sellerForm) {
  const sellerMsg = document.getElementById('seller-message');

  sellerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const fullName = document.getElementById('seller-name')?.value.trim();
    const email = document.getElementById('seller-email')?.value.trim();
    const companyName = document.getElementById('seller-company')?.value.trim();
    const taxNumber = document.getElementById('seller-tax')?.value.trim();
    const website = document.getElementById('seller-website')?.value.trim();
    const country = document.getElementById('seller-country')?.value.trim();
    const city = document.getElementById('seller-city')?.value.trim();
    const products = document.getElementById('seller-products')?.value.trim();

    if (!fullName || !email || !companyName) {
      showMessage(
        sellerMsg,
        'error',
        'İsim, e-posta ve firma adı zorunlu alanlardır.'
      );
      return;
    }

    showMessage(sellerMsg, null, 'Başvurunuz gönderiliyor...');

    // 1) Önce kullanıcıyı app_users tablosuna yaz (rol: seller)
    const { data: userRow, error: userError } = await supabase
      .from('app_users')
      .insert({
        full_name: fullName,
        email,
        role: 'seller',
      })
      .select('id')
      .single();

    if (userError) {
      console.error(userError);
      showMessage(
        sellerMsg,
        'error',
        'Kullanıcı kaydedilemedi: ' + userError.message
      );
      return;
    }

    const userId = userRow.id;

    // 2) Sonra sellers tablosuna başvuru kaydını at
    // ⚠️ Buradaki kolon isimlerini kendi Supabase tablonla eşle:
    // id | user_id | company_name | tax_number | website | country | city | main_products | status | created_at | approved_at
    const { error: sellerError } = await supabase.from('sellers').insert({
      user_id: userId,
      company_name: companyName,
      tax_number: taxNumber,
      website,
      country,
      city,
      main_products: products,
      status: 'pending', // ilk durum: beklemede
    });

    if (sellerError) {
      console.error(sellerError);
      showMessage(
        sellerMsg,
        'error',
        'Satıcı kaydedilemedi: ' + sellerError.message
      );
    } else {
      showMessage(
        sellerMsg,
        'success',
        'Başvurunuz alındı. En kısa sürede değerlendirilecektir.'
      );
      sellerForm.reset();
    }
  });
}
