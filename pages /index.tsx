// pages/index.tsx
export default function HomePage() {
  return (
    <div className="tpg-home">
      {/* Hero */}
      <section className="tpg-hero">
        <div className="tpg-hero-inner">
          <h1 className="tpg-hero-title">
            TradePiGlobal
            <span className="tpg-hero-highlight"> Yeni Nesil B2B</span>
          </h1>
          <p className="tpg-hero-sub">
            Supabase + Next.js altyapısı aktif 🔥 <br />
            Ürün kataloğu, RFQ, 3D showroom ve Pi destekli ödemeler tek
            platformda.
          </p>

          <div className="tpg-hero-actions">
            <a href="#showroom" className="tpg-btn tpg-btn-primary">
              3D Showroom&apos;a Gir
            </a>
            <a href="#rfq" className="tpg-btn tpg-btn-ghost">
              RFQ Sürecini Gör
            </a>
          </div>

          <div className="tpg-hero-meta">
            <span>⚡ Gerçek zamanlı Supabase altyapısı</span>
            <span>🛰️ Babylon.js ile 3D fuar deneyimi</span>
          </div>
        </div>
      </section>

      {/* Sektörler */}
      <section className="tpg-section" id="sectors">
        <div className="tpg-section-header">
          <h2>Sektör Bazlı B2B Mağazalar</h2>
          <p>
            Ambalaj, gıda, tekstil, makine, kimya ve daha fazlası için ayrı
            vitrinler. Her sektör kendi 3D fuar alanına bağlanacak.
          </p>
        </div>

        <div className="tpg-grid">
          <div className="tpg-card">
            <h3>Ambalaj &amp; Baskı</h3>
            <p>
              Karton kutu, vakum, şrink, etiket, baskı makineleri ve hammadde
              tedarikçileri.
            </p>
          </div>
          <div className="tpg-card">
            <h3>Gıda &amp; Tarım</h3>
            <p>
              Toplu alım yapan ithalatçılar ile üreticileri Pi destekli B2B
              altyapıda buluştur.
            </p>
          </div>
          <div className="tpg-card">
            <h3>Sanayi &amp; Makine</h3>
            <p>
              CNC tezgahlar, otomasyon hatları ve yedek parçalar için dijital
              fuar alanı.
            </p>
          </div>
        </div>
      </section>

      {/* 3D Showroom placeholder */}
      <section className="tpg-section tpg-section-muted" id="showroom">
        <div className="tpg-section-header">
          <h2>3D Showroom (Babylon.js)</h2>
          <p>
            Buraya Babylon.js ile çalışan etkileşimli 3D fuar sahnesi gelecek.
            Şimdilik placeholder alanı.
          </p>
        </div>

        <div className="tpg-showroom-placeholder">
          <span>🧱 3D sahne yakında burada olacak...</span>
        </div>
      </section>

      {/* RFQ Akışı */}
      <section className="tpg-section" id="rfq">
        <div className="tpg-section-header">
          <h2>RFQ Bazlı Ticaret Akışı</h2>
          <p>
            Minimum sipariş miktarı, teslimat Incoterm&apos;leri ve ödeme
            seçenekleriyle tam B2B RFQ süreci.
          </p>
        </div>

        <ol className="tpg-rfq-steps">
          <li>
            <strong>1. Alıcı RFQ açar</strong> – İhtiyaç, hedef fiyat ve miktar
            sisteme girilir.
          </li>
          <li>
            <strong>2. Satıcılar teklif verir</strong> – Supabase üzerinden
            gerçek zamanlı teklif akışı.
          </li>
          <li>
            <strong>3. Eşleşme &amp; sipariş</strong> – Kabul edilen teklif
            otomatik siparişe dönüşür.
          </li>
        </ol>
      </section>
    </div>
  );
}
