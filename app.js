// app.js

// 🔐 Supabase bilgilerini kendi projenden al:
// Supabase → Project Settings → API
const SUPABASE_URL = "https://gndyovpbppnjwicfetnf.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImduZHlvdnBicHBuandpY2ZldG5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ4ODk5MTcsImV4cCI6MjA4MDQ2NTkxN30.1_IAX8FVlvuTFp1ZhQZb-IaaPxfM3Mq4Rquj6to5EfU";

// CDN ile gelen global supabase nesnesi (index.html'de ekledik)
const supabase = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

// Küçük yardımcı fonksiyon: form mesajı yaz / renk ver
function showMessage(el, type, text) {
  if (!el) return;
  el.textContent = text || "";
  el.classList.remove("success", "error");
  if (type === "success") el.classList.add("success");
  if (type === "error") el.classList.add("error");
}

/* ----------------------------------------
   ALICI ÜYELİĞİ (ÜCRETSİZ) → buyers tablosu
   form id: buyer-signup-form
---------------------------------------- */

const buyerForm = document.getElementById("buyer-signup-form");
const buyerMsg = document.getElementById("buyer-message");

if (buyerForm) {
  buyerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("buyer-name").value.trim();
    const email = document.getElementById("buyer-email").value.trim();
    const password = document
      .getElementById("buyer-password")
      .value.trim(); // Şimdilik tabloda saklamıyoruz

    if (!name || !email) {
      showMessage(buyerMsg, "error", "Ad soyad ve e-posta zorunlu.");
      return;
    }

    showMessage(buyerMsg, null, "İşleniyor...");

    // buyers tablosuna yazıyoruz (şifreyi şu an saklamıyoruz)
    const { error } = await supabase.from("buyers").insert({
      full_name: name,
      email: email,
      // password alanı istersen tabloya ekleriz, şimdilik sadece auth mantığı düşünmüyoruz
    });

    if (error) {
      console.error("Buyer insert error:", error);
      showMessage(buyerMsg, "error", "Hata: " + error.message);
    } else {
      showMessage(
        buyerMsg,
        "success",
        "Alıcı üyeliğiniz kaydedildi. Ekibimiz uygun olduğunda sisteme erişim açılacak."
      );
      buyerForm.reset();
    }
  });
}

/* ----------------------------------------
   SATICI BAŞVURUSU → seller_applications tablosu
   form id: seller-apply-form
---------------------------------------- */

const sellerForm = document.getElementById("seller-apply-form");
const sellerMsg = document.getElementById("seller-message");

if (sellerForm) {
  sellerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const company = document
      .getElementById("seller-company")
      .value.trim();
    const name = document.getElementById("seller-name").value.trim();
    const email = document.getElementById("seller-email").value.trim();
    const phone = document.getElementById("seller-phone").value.trim();
    const country = document
      .getElementById("seller-country")
      .value.trim();
    const city = document.getElementById("seller-city").value.trim();
    const products = document
      .getElementById("seller-products")
      .value.trim();

    if (!company || !name || !email || !products) {
      showMessage(
        sellerMsg,
        "error",
        "Firma adı, yetkili, e-posta ve ürün grupları zorunlu."
      );
      return;
    }

    showMessage(sellerMsg, null, "Başvurunuz gönderiliyor...");

    const { error } = await supabase.from("seller_applications").insert({
      company_name: company,
      contact_name: name,
      email,
      phone,
      country,
      city,
      main_products: products,
      status: "pending",
    });

    if (error) {
      console.error("Seller insert error:", error);
      showMessage(sellerMsg, "error", "Hata: " + error.message);
    } else {
      showMessage(
        sellerMsg,
        "success",
        "Başvurunuz alındı. Değerlendirme sonucunda sizinle iletişime geçilecektir."
      );
      sellerForm.reset();
    }
  });
      }
