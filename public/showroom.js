// =========================
// CAMERA PARALLAX
// =========================
const room = document.getElementById("room");

document.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * -20;

  room.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
});

// Mobile tilt
window.addEventListener("deviceorientation", (e) => {
  const x = e.gamma / 3;
  const y = e.beta / 6;
  room.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
});

// =========================
// SUPABASE – ÜRÜNLERİ ÇEK
// =========================
import { createClient } from "https://esm.sh/@supabase/supabase-js";

const supabase = createClient(
  "https://YOUR-PROJECT.supabase.co",
  "PUBLIC-ANON-KEY"
);

async function loadProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("id, name")
    .limit(12);

  if (error) {
    console.error("Ürün okunamadı:", error);
    return;
  }

  placePods(data);
}

// =========================
// PODLARI OLUŞTUR
// =========================
function placePods(products) {
  const podsDiv = document.getElementById("pods");
  podsDiv.innerHTML = "";

  const radius = 350; // ürünlerin dairesel dizilimi
  const count = products.length;

  products.forEach((p, i) => {
    const angle = (i / count) * Math.PI * 2;

    const x = Math.cos(angle) * radius + window.innerWidth / 2 - 90;
    const y = Math.sin(angle) * radius + window.innerHeight / 2 - 90;

    const pod = document.createElement("div");
    pod.className = "pod";
    pod.style.left = `${x}px`;
    pod.style.top = `${y}px`;
    pod.textContent = p.name;

    podsDiv.appendChild(pod);
  });
}

// BAŞLAT
loadProducts();
