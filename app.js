// app.js
// TradePiGlobal - frontend JS (TEK DOSYA)

// ---------------- Supabase Bağlantısı ----------------
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// TODO: Bunları kendi projenle değiştir
const SUPABASE_URL = "https://gndyovpbppnjwicfetnf.supabase.co";
const SUPABASE_KEY = " eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImduZHlvdnBicHBuandpY2ZldG5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ4ODk5MTcsImV4cCI6MjA4MDQ2NTkxN30.1_IAX8FVlvuTFp1ZhQZb-IaaPxfM3Mq4Rquj6to5EfU";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// ---------------- Genel Yardımcılar ----------------
function setFormMessage(elementId, type, text) {
  const el = document.getElementById(elementId);
  if (!el) return;

  el.textContent = text || "";
  el.className = "form-message"; // temel class

  if (type === "success") {
    el.classList.add("success");
  } else if (type === "error") {
    el.classList.add("error");
  }
}

function clearForm(formEl) {
  if (!formEl) return;
  formEl.reset();
}

// ---------------- Alıcı Formu (buyers) ----------------
async function handleBuyerFormSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const fullName = document.getElementById("buyer-full-name")?.value.trim();
  const email = document.getElementById("buyer-email")?.value.trim();
  const company = document.getElementById("buyer-company")?.value.trim();
  const country = document.getElementById("buyer-country")?.value.trim();
  const city = document.getElementById("buyer-city")?.value.trim();
  const phone = document.getElementById("buyer-phone")?.value.trim();
  const notes = document.getElementById("buyer-notes")?.value.trim();

  // basit kontrol
  if (!fullName || !email) {
    setFormMessage("buyer-message", "error", "Ad Soyad ve E-posta zorunlu.");
    return;
  }

  setFormMessage("buyer-message", null, "Kaydediliyor...");

  try {
    const { error } = await supabase.from("buyers").insert([
      {
        full_name: fullName,
        email,
        company,
        country,
        city,
        phone,
        notes,
      },
    ]);

    if (error) {
      console.error("buyer insert error:", error);
      setFormMessage(
        "buyer-message",
        "error",
        "Kayıt yapılırken bir hata oluştu. Daha sonra tekrar dene."
      );
      return;
    }

    clearForm(form);
    setFormMessage(
      "buyer-message",
      "success",
      "Başvurun alındı. En kısa sürede seninle iletişime geçeceğiz."
    );
  } catch (err) {
    console.error("buyer submit catch:", err);
    setFormMessage(
      "buyer-message",
      "error",
      "Beklenmeyen bir hata oluştu. Lütfen daha sonra tekrar dene."
    );
  }
}

// ---------------- Satıcı Formu (sellers) ----------------
async function handleSellerFormSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const fullName = document.getElementById("seller-full-name")?.value.trim();
  const email = document.getElementById("seller-email")?.value.trim();
  const company = document.getElementById("seller-company")?.value.trim();
  const country = document.getElementById("seller-country")?.value.trim();
  const city = document.getElementById("seller-city")?.value.trim();
  const phone = document.getElementById("seller-phone")?.value.trim();
  const products = document.getElementById("seller-products")?.value.trim();
  const sellerType = document.getElementById("seller-type")?.value || null;
  const membershipPlan = document.querySelector(
    'input[name="membership-plan"]:checked'
  )?.value || null;

  if (!fullName || !email || !company) {
    setFormMessage(
      "seller-message",
      "error",
      "Ad Soyad, E-posta ve Firma Adı zorunlu."
    );
    return;
  }

  setFormMessage("seller-message", null, "Kaydediliyor...");

  try {
    const { error } = await supabase.from("sellers").insert([
      {
        full_name: fullName,
        email,
        company,
        country,
        city,
        phone,
        products,
        seller_type_id: sellerType || null,
        membership_plan_id: membershipPlan || null,
      },
    ]);

    if (error) {
      console.error("seller insert error:", error);
      setFormMessage(
        "seller-message",
        "error",
        "Başvuru kaydedilirken bir hata oluştu."
      );
      return;
    }

    clearForm(form);
    setFormMessage(
      "seller-message",
      "success",
      "Satıcı başvurun alındı. Doğrulama için seninle iletişime geçeceğiz."
    );
  } catch (err) {
    console.error("seller submit catch:", err);
    setFormMessage(
      "seller-message",
      "error",
      "Beklenmeyen bir hata oluştu. Lütfen daha sonra tekrar dene."
    );
  }
}

// ---------------- Üyelik Paketleri (membership_plans) ----------------
async function loadMembershipPlans() {
  const grid = document.getElementById("membership-grid");
  if (!grid) {
    console.warn("membership-grid elementi bulunamadı.");
    return;
  }

  // İsteğe bağlı: yükleniyor yazısı
  grid.innerHTML =
    "<p style='font-size:0.85rem;color:#cbd5f5;'>Paketler yükleniyor...</p>";

  try {
    const { data, error } = await supabase
      .from("membership_plans")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (error) {
      console.error("membership_plans error:", error);
      grid.innerHTML =
        "<p style='font-size:0.85rem;color:#fca5a5;'>Paketler yüklenirken hata oluştu.</p>";
      return;
    }

    if (!data || data.length === 0) {
      grid.innerHTML =
        "<p style='font-size:0.85rem;color:#cbd5f5;'>Henüz tanımlı üyelik paketi yok.</p>";
      return;
    }

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
        <p style="font-size:0.75rem;color:#9ca3af;margin-bottom:0.4rem;">
          Yıllık: ${yearly}
        </p>
        <p style="font-size:0.75rem;color:#9ca3af;margin-bottom:0.6rem;">
          Para birimi: ${plan.currency || "TRY"} ${
        plan.is_pi_enabled ? " • Pi ile ödeme desteklenir" : ""
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
    console.error("loadMembershipPlans catch:", err);
    grid.innerHTML =
      "<p style='font-size:0.85rem;color:#fca5a5;'>Paketler yüklenemedi.</p>";
  }
}

// ---------------- Satıcı Tipleri (seller_types) ----------------
async function loadSellerTypes() {
  const selectBox = document.getElementById("seller-type");
  if (!selectBox) {
    console.warn("seller-type select elementi bulunamadı.");
    return;
  }

  selectBox.innerHTML = "<option>Yükleniyor...</option>";

  try {
    const { data, error } = await supabase
      .from("seller_types")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (error) {
      console.error("seller_types error:", error);
      selectBox.innerHTML = "<option>Hata oluştu</option>";
      return;
    }

    if (!data || data.length === 0) {
      selectBox.innerHTML = "<option>Kayıtlı satıcı tipi yok</option>";
      return;
    }

    selectBox.innerHTML = "";
    data.forEach((type) => {
      const opt = document.createElement("option");
      opt.value = type.id;
      opt.textContent = type.name;
      selectBox.appendChild(opt);
    });
  } catch (err) {
    console.error("loadSellerTypes catch:", err);
    selectBox.innerHTML = "<option>Hata oluştu</option>";
  }
}

// ---------------- Reklam Paketleri (ad_packages) ----------------
async function loadAdPackages() {
  const grid = document.getElementById("ad-packages-grid");
  if (!grid) {
    // HTML’de henüz bu bölüm yoksa sessiz geç
    return;
  }

  grid.innerHTML =
    "<p style='font-size:0.85rem;color:#cbd5f5;'>Reklam paketleri yükleniyor...</p>";

  try {
    const { data, error } = await supabase
      .from("ad_packages")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (error) {
      console.error("ad_packages error:", error);
      grid.innerHTML =
        "<p style='font-size:0.85rem;color:#fca5a5;'>Reklam paketleri alınırken hata oluştu.</p>";
      return;
    }

    if (!data || data.length === 0) {
      grid.innerHTML =
        "<p style='font-size:0.85rem;color:#cbd5f5;'>Henüz tanımlı reklam paketi yok.</p>";
      return;
    }

    grid.innerHTML = "";

    data.forEach((pack) => {
      const card = document.createElement("article");
      card.className = "card";

      card.innerHTML = `
        <h3 class="card-title">${pack.name}</h3>
        <p class="card-text" style="margin-bottom:0.4rem;">
          ${pack.description || "Açıklama yakında eklenecek."}
        </p>
        <p style="font-size:1rem;font-weight:600;margin-bottom:0.4rem;">
          ₺${pack.price} <span style="font-size:0.8rem;font-weight:400;">/ ${
        pack.duration_days || "gün"
      }</span>
        </p>
        <p style="font-size:0.75rem;color:#9ca3af;margin-bottom:0.6rem;">
          Para birimi: ${pack.currency || "TRY"}
        </p>
        <button
          class="btn btn-outline"
          onclick="document.getElementById('seller')?.scrollIntoView({behavior:'smooth'})"
        >
          Bu reklam paketini kullan
        </button>
      `;

      grid.appendChild(card);
    });
  } catch (err) {
    console.error("loadAdPackages catch:", err);
    grid.innerHTML =
      "<p style='font-size:0.85rem;color:#fca5a5;'>Reklam paketleri yüklenemedi.</p>";
  }
}

// ---------------- Sayfa Yüklenince ----------------
document.addEventListener("DOMContentLoaded", () => {
  // Form eventleri
  const buyerForm = document.getElementById("buyer-form");
  if (buyerForm) {
    buyerForm.addEventListener("submit", handleBuyerFormSubmit);
  }

  const sellerForm = document.getElementById("seller-form");
  if (sellerForm) {
    sellerForm.addEventListener("submit", handleSellerFormSubmit);
  }

  // Supabase hazırsa verileri çek
  if (typeof supabase !== "undefined") {
    loadMembershipPlans(); // üyelik paketleri
    loadSellerTypes(); // satıcı tipleri
    loadAdPackages(); // reklam paketleri (varsa)
  } else {
    console.warn("Supabase tanımsız, veriler yüklenemedi.");
  }

  // Footer yıl güncelle
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
