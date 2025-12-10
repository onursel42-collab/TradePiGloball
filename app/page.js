"use client";

export default function HomePage() {
  return (
    <main className="tpg-page">
      <header className="tpg-hero">
        <h1>TradePiGlobal – Yeni Nesil B2B</h1>
        <p>Supabase + Next.js altyapısı şu an aktif 🔥</p>
      </header>

      <section className="tpg-section">
        <h2>Platform Özeti</h2>
        <p>
          Üretici ve tedarikçileri, global alıcılarla tek B2B köprüde
          buluşturmayı hedefleyen bir altyapı üzerinde çalışıyoruz.
        </p>
      </section>

      <section className="tpg-section">
        <h2>Durum</h2>
        <ul>
          <li>✅ Render deploy bağlantısı çalışıyor</li>
          <li>✅ Supabase proje hazır</li>
          <li>🟡 Arayüz ve 3D vitrinler sırada</li>
        </ul>
      </section>
    </main>
  );
}
