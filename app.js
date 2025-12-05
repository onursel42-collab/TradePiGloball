// app.js
// Supabase client
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

// 🔐 Bunları Supabase > Settings > API ekranından al
const SUPABASE_URL = "https://gndyovpbppnjwicfetnf.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImduZHlvdnBicHBuandpY2ZldG5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ4ODk5MTcsImV4cCI6MjA4MDQ2NTkxN30.1_IAX8FVlvuTFp1ZhQZb-IaaPxfM3Mq4Rquj6to5EfU";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// -----------------------------------------------------
// Yardımcı: mesaj göster
// -----------------------------------------------------
function showMessage(el, type, text) {
  if (!el) return;
  el.textContent = text;
  el.classList.remove("success", "error");
  el.classList.add(type);
}

// -----------------------------------------------------
// Alıcı Formu
// -----------------------------------------------------
const buyerForm = document.getElementById("buyer-form");
const buyerMessage = document.getElementById("buyer-message");

if (buyerForm) {
  buyerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    showMessage(buyerMessage, "info", "Kaydediliyor...");

    const full_name = document.getElementById("buyer-full-name")?.value.trim();
    const email = document.getElementById("buyer-email")?.value.trim();
    const company_name = document.getElementById("buyer-company")?.value.trim();
    const country = document.getElementById("buyer-country")?.value.trim();
    const city = document.getElementById("buyer-city")?.value.trim();
    const phone = document.getElementById("buyer-phone")?.value.trim();
    const notes = document.getElementById("buyer-notes")?.value.trim();

    if (!full_name || !email) {
      showMessage(buyerMessage, "error", "Ad soyad ve e-posta zorunludur.");
      return;
    }

    try {
      // 👇 TABLO ve KOLON İSİMLERİ
      // Supabase’deki "buyers" tablosu için kolonlarını bunlara göre ayarla:
      // id (uuid, default), full_name (text), email (text), company_name (text),
      // country (text), city (text), phone (text), notes (text), created_at (timestamptz, default now())
      const { error } = await supabase.from("buyers").insert([
        {
          full_name,
          email,
          company_name,
          country,
          city,
          phone,
          notes,
        },
      ]);

      if (error) {
        console.error("Buyer insert error:", error);
        showMessage(
          buyerMessage,
          "error",
          "Kayıt sırasında bir hata oluştu. Kolon isimlerini kontrol et."
        );
        return;
      }

      buyerForm.reset();
      showMessage(
        buyerMessage,
        "success",
        "Alıcı kaydın alındı. Kısa süre içinde seninle iletişime geçeceğiz."
      );
    } catch (err) {
      console.error(err);
      showMessage(
        buyerMessage,
        "error",
        "Beklenmeyen bir hata oluştu. Lütfen tekrar dene."
      );
    }
  });
}

// -----------------------------------------------------
// Satıcı Formu
// -----------------------------------------------------
const sellerForm = document.getElementById("seller-form");
const sellerMessage = document.getElementById("seller-message");

if (sellerForm) {
  sellerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    showMessage(sellerMessage, "info", "Başvurun gönderiliyor...");

    const full_name = document.getElementById("seller-full-name")?.value.trim();
    const email = document.getElementById("seller-email")?.value.trim();
    const company_name =
      document.getElementById("seller-company")?.value.trim();
    const country = document.getElementById("seller-country")?.value.trim();
    const city = document.getElementById("seller-city")?.value.trim();
    const phone = document.getElementById("seller-phone")?.value.trim();
    const products = document
      .getElementById("seller-products")
      ?.value.trim();

    if (!full_name || !email || !company_name) {
      showMessage(
        sellerMessage,
        "error",
        "Ad soyad, e-posta ve firma adı zorunludur."
      );
      return;
    }

    try {
      // 👇 TABLO ve KOLON İSİMLERİ
      // Supabase’de "seller_applications" tablosu oluşturmanı öneriyorum:
      // id (uuid, default), full_name (text), email (text), company_name (text),
      // country (text), city (text), phone (text), products (text),
      // status (text, default 'pending'), created_at (timestamptz, default now())
      const { error } = await supabase.from("seller_applications").insert([
        {
          full_name,
          email,
          company_name,
          country,
          city,
          phone,
          products,
          status: "pending",
        },
      ]);

      if (error) {
        console.error("Seller insert error:", error);
        showMessage(
          sellerMessage,
          "error",
          "Başvuru sırasında bir hata oluştu. Kolon isimlerini kontrol et."
        );
        return;
      }

      sellerForm.reset();
      showMessage(
        sellerMessage,
        "success",
        "Satıcı başvurun alındı. Değerlendirme sonrası seninle iletişime geçeceğiz."
      );
    } catch (err) {
      console.error(err);
      showMessage(
        sellerMessage,
        "error",
        "Beklenmeyen bir hata oluştu. Lütfen tekrar dene."
      );
    }
  });
}
