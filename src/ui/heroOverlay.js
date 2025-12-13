export function initHeroOverlay() {
  const hero = document.createElement("div");

  hero.innerHTML = `
    <h1>Kurumsal Showroom Tabanlı B2B Ticaret Ağı</h1>
    <button id="loginBtn">Üye Girişi</button>
  `;

  hero.style.position = "absolute";
  hero.style.top = "50%";
  hero.style.left = "50%";
  hero.style.transform = "translate(-50%, -50%)";
  hero.style.textAlign = "center";

  document.body.appendChild(hero);
}
