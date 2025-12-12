// =======================
// 1) PODLARI YÜKLE
// =======================

const podsEl = document.getElementById("pods");
const roomEl = document.getElementById("room");

async function loadShowroomPlans() {
  try {
    const res = await fetch("/api/plans/home");
    if (!res.ok) {
      console.error("Plans fetch failed", res.status);
      return;
    }

    const json = await res.json();
    const plans = json.plans || [];

    podsEl.innerHTML = "";

    plans.forEach((p, index) => {
      const pod = document.createElement("article");
      pod.className = "pod";

      // sahte derinlik: orta daha önde, sağ/sol biraz arkada
      const depthMap = [40, 0, 40];
      const liftMap = [-6, -10, -6];
      pod.style.setProperty("--depth", `${-depthMap[index] || 0}px`);
      pod.style.setProperty("--lift", `${liftMap[index] || -6}px`);

      pod.innerHTML = `
        <div class="pod-badge">${p.badge || "Paket"}</div>
        <h2>${p.name}</h2>
        <p class="pod-segment">${p.segment || ""}</p>
        <p class="pod-desc">${p.description || ""}</p>
        <p class="pod-price">
          ${Number(p.monthly_price || 0).toLocaleString("tr-TR")} ₺
          <span>/ ay</span>
        </p>
      `;

      podsEl.appendChild(pod);
    });
  } catch (err) {
    console.error("Showroom plans error", err);
  }
}

loadShowroomPlans();

// =======================
// 2) KAMERA PARALLAX
// =======================

let targetRotX = 10;
let targetRotY = 0;
let currentRotX = 10;
let currentRotY = 0;

function handlePointer(xNorm, yNorm) {
  // xNorm, yNorm = [-1, 1] aralığında
  targetRotY = xNorm * 10; // sağ-sol
  targetRotX = 8 + yNorm * -6; // yukarı-aşağı
}

// Mouse
window.addEventListener("mousemove", (e) => {
  const xNorm = (e.clientX / window.innerWidth - 0.5) * 2;
  const yNorm = (e.clientY / window.innerHeight - 0.5) * 2;
  handlePointer(xNorm, yNorm);
});

// Touch (mobil)
window.addEventListener(
  "touchmove",
  (e) => {
    const t = e.touches[0];
    const xNorm = (t.clientX / window.innerWidth - 0.5) * 2;
    const yNorm = (t.clientY / window.innerHeight - 0.5) * 2;
    handlePointer(xNorm, yNorm);
  },
  { passive: true }
);

function animate() {
  currentRotX += (targetRotX - currentRotX) * 0.06;
  currentRotY += (targetRotY - currentRotY) * 0.06;

  roomEl.style.transform = `rotateX(${currentRotX}deg) rotateY(${currentRotY}deg)`;
  requestAnimationFrame(animate);
}

animate();
