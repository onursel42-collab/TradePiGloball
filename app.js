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
// ========== ÜYELİK PAKETLERİNİ SUPABASE'DEN ÇEK ==========
async function loadMembershipPlans() {
  try {
    const pricingSection = document.getElementById("pricing");
    if (!pricingSection) return; // bu sayfada pricing yoksa geç

    const grid = pricingSection.querySelector(".card-grid");
    if (!grid) return;

    // Yükleniyor bilgisi (istersen)
    grid.innerHTML = "<p style='font-size:0.85rem;color:#cbd5f5;'>Paketler yükleniyor...</p>";

    const { data, error } = await supabase
      .from("membership_plans")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (error) {
      console.error("Paketler alınırken hata:", error);
      grid.innerHTML =
        "<p style='font-size:0.85rem;color:#fca5a5;'>Paketler yüklenirken bir hata oluştu.</p>";
      return;
    }

    if (!data || data.length === 0) {
      grid.innerHTML =
        "<p style='font-size:0.85rem;color:#cbd5f5;'>Henüz tanımlı satıcı üyelik paketi bulunmuyor.</p>";
      return;
    }

    // Kartları Supabase verisiyle doldur
    grid.innerHTML = "";

    data.forEach((plan) => {
      const monthly =
        plan.price_monthly != null ? `₺${plan.price_monthly}` : "Fiyat sorunuz";
      const yearly =
        plan.price_yearly != null ? `₺${plan.price_yearly}` : "Fiyat sorunuz";

      const card = document.createElement("article");
      card.className = "card";

      card.innerHTML = `
        <h3 class="card-title">${plan.name}</h3>
        <p class="card-text" style="margin-bottom:0.4rem;">
          ${plan.description || "Bu paket için açıklama yakında eklenecek."}
        </p>
        <p style="font-size:1rem;font-weight:600;margin-bottom:0.4rem;">
          ${monthly} <span style="font-size:0.8rem;font-weight:400;">/ ay</span>
        </p>
        <p style="font-size:0.75rem;color:#9ca3af;margin-bottom:0.5rem;">
          Yıllık: ${yearly}
        </p>
        <p style="font-size:0.75rem;color:#9ca3af;margin-bottom:0.6rem;">
          Para birimi: ${plan.currency || "TRY"} ${
        plan.is_pi_enabled ? "• Pi ile de alınabilir" : ""
      }
        </p>
        <button
          class="btn btn-outline"
          onclick="document.getElementById('seller')?.scrollIntoView({behavior:'smooth'})"
        >
          Bu paketle başvur
        </button>
      `;

      grid.appendChild(card);
    });
  } catch (err) {
    console.error("loadMembershipPlans genel hata:", err);
  }
}
// ========== SATICI TİPLERİNİ SUPABASE'DEN ÇEK ==========
async function loadSellerTypes() {
  try {
    const container = document.getElementById("seller-types-list");
    if (!container) return; // Bu sayfada ilgili alan yoksa boşver

    container.innerHTML =
      "<p style='font-size:0.85rem;color:#cbd5f5;'>Satıcı tipleri yükleniyor...</p>";

    const { data, error } = await supabase
      .from("seller_types")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (error) {
      console.error("Satıcı tipleri alınırken hata:", error);
      container.innerHTML =
        "<p style='font-size:0.85rem;color:#fca5a5;'>Satıcı tipleri yüklenirken bir hata oluştu.</p>";
      return;
    }

    if (!data || data.length === 0) {
      container.innerHTML =
        "<p style='font-size:0.85rem;color:#cbd5f5;'>Henüz tanımlı satıcı tipi bulunmuyor.</p>";
      return;
    }

    container.innerHTML = "";

    data.forEach((type) => {
      const badge = document.createElement("span");
      badge.style.padding = "0.25rem 0.6rem";
      badge.style.borderRadius = "999px";
      badge.style.border = "1px solid rgba(148,163,184,0.6)";
      badge.style.fontSize = "0.8rem";
      badge.style.color = "#e5e7eb";
      badge.textContent = type.name;
      container.appendChild(badge);
    });
  } catch (err) {
    console.error("loadSellerTypes genel hata:", err);
  }
}

// ========== REKLAM PAKETLERİNİ SUPABASE'DEN ÇEK ==========
async function loadAdPackages() {
  try {
    const grid = document.getElementById("ad-packages-grid");
    if (!grid) return;

    grid.innerHTML =
      "<p style='font-size:0.85rem;color:#cbd5f5;'>Reklam paketleri yükleniyor...</p>";

    const { data, error } = await supabase
      .from("ad_packages")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (error) {
      console.error("Reklam paketleri alınırken hata:", error);
      grid.innerHTML =
        "<p style='font-size:0.85rem;color:#fca5a5;'>Reklam paketleri yüklenirken bir hata oluştu.</p>";
      return;
    }

    if (!data || data.length === 0) {
      grid.innerHTML =
        "<p style='font-size:0.85rem;color:#cbd5f5;'>Henüz tanımlı reklam paketi bulunmuyor.</p>";
      return;
    }

    grid.innerHTML = "";

    data.forEach((pack) => {
      const card = document.createElement("article");
      card.className = "card";

      card.innerHTML = `
        <h3 class="card-title">${pack.name}</h3>
        <p class="card-text" style="margin-bottom:0.4rem;">
          ${pack.description || ""}
        </p>
        <p style="font-size:0.9rem;margin-bottom:0.3rem;">
          Konum: <strong>${pack.placement || "-"}</strong>
        </p>
        <p style="font-size:0.9rem;margin-bottom:0.3rem;">
          Aylık: ${
            pack.price_monthly != null
              ? "₺" + pack.price_monthly
              : "Fiyat sorunuz"
          }
        </p>
        <p style="font-size:0.8rem;color:#9ca3af;margin-bottom:0.6rem;">
          Yıllık: ${
            pack.price_yearly != null
              ? "₺" + pack.price_yearly
              : "Fiyat sorunuz"
          }
        </p>
      `;

      grid.appendChild(card);
    });
  } catch (err) {
    console.error("loadAdPackages genel hata:", err);
  }
}
// Sayfa yüklendiğinde paketleri çek
document.addEventListener("DOMContentLoaded", () => {
  if (typeof supabase !== "undefined") {
    loadMembershipPlans();
  } else {
    console.warn("supabase tanımsız, membership_plans yüklenemedi.");
  }
});
