export const metadata = {
  title: "TradePiGlobal – Global B2B Marketplace",
  description: "TradePiGlobal: Supabase + Next.js altyapılı yeni nesil B2B & Pi ticaret platformu.",
};

export default function HomePage() {
  return (
    <div className="tpg-page">
      {/* HEADER */}
      <header className="tpg-header">
        <div className="tpg-container tpg-header-inner">
          <div className="tpg-logo-wrap">
            <div className="tpg-logo-dot">TP</div>
            <div className="tpg-logo-texts">
              <span className="tpg-logo-main">TradePiGlobal</span>
              <span className="tpg-logo-sub">Global B2B &amp; Pi Commerce</span>
            </div>
          </div>

          <nav className="tpg-nav">
            <a href="#sectors">Sektörler</a>
            <a href="#showcase">Vitrin</a>
            <a href="#premium">Premium Satıcılar</a>
            <a href="#rfq">RFQ</a>
          </nav>

          <div className="tpg-header-actions">
            <button className="tpg-link-btn">Alıcı Kaydı</button>
            <button className="tpg-link-btn">Satıcı Kaydı</button>
            <button className="tpg-btn tpg-btn-primary">Giriş Yap</button>
          </div>
        </div>
      </header>

      {/* TOP BAR: KURLAR */}
      <div className="tpg-topbar">
        <div className="tpg-container tpg-topbar-inner">
          <span className="tpg-top-pill">Canlı Kur</span>
          <span>USD/TRY: 32,10 · EUR/TRY: 35,20 · 1 Pi ≈ 10 USD (demo)</span>
        </div>
      </div>

      {/* HERO + RFQ */}
      <main>
        <section className="tpg-hero">
          <div className="tpg-container tpg-hero-inner">
            {/* Left */}
            <div className="tpg-hero-left">
              <p className="tpg-kicker">GLOBAL B2B • Pİ ENTEGRASYONLU</p>
              <h1 className="tpg-hero-title">
                Üretici ve toptancıları{" "}
                <span className="tpg-primary">tek platformda</span> global
                alıcılarla buluştur.
              </h1>
              <p className="tpg-hero-sub">
                Doğrulanmış tedarikçiler, RFQ tabanlı teklif sistemi ve hibrit
                ödeme altyapısıyla ticaretini sadeleştir. Supabase + Next.js
                altyapısı canlı.
              </p>

              {/* Search */}
              <div className="tpg-search">
                <input
                  type="text"
                  placeholder="Ürün, firma veya sektör ara…"
                />
                <button className="tpg-btn tpg-btn-primary">Ara</button>
              </div>

              {/* Tags */}
              <div className="tpg-tags">
                <span className="tpg-tag-label">Popüler:</span>
                <button className="tpg-chip">Ambalaj &amp; Baskı</button>
                <button className="tpg-chip">Gıda &amp; İçecek</button>
                <button className="tpg-chip">Tekstil &amp; Moda</button>
                <button className="tpg-chip">Elektronik &amp; IoT</button>
              </div>

              {/* Benefits */}
              <div className="tpg-benefits">
                <div className="tpg-benefit-item">
                  <span className="tpg-benefit-icon">🔒</span>
                  <div>
                    <h3>Güvenli ödeme &amp; escrow</h3>
                    <p>
                      Ödemeler teslimat onayına kadar korumalı hesapta tutulur.
                    </p>
                  </div>
                </div>
                <div className="tpg-benefit-item">
                  <span className="tpg-benefit-icon">🌍</span>
                  <div>
                    <h3>Global görünürlük</h3>
                    <p>
                      Markanı onlarca ülkeyle eşleştiren akıllı B2B arama
                      motoru.
                    </p>
                  </div>
                </div>
                <div className="tpg-benefit-item">
                  <span className="tpg-benefit-icon">⚡</span>
                  <div>
                    <h3>Gerçek zamanlı RFQ</h3>
                    <p>Alıcı tek ekrandan RFQ açar, satıcılar canlı teklif verir.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right RFQ box */}
            <aside id="rfq" className="tpg-hero-right">
              <div className="tpg-rfq-box">
                <h4>RFQ İşlemleri</h4>
                <p>Kısa yoldan toplu teklif yönetimi.</p>
                <div className="tpg-rfq-buttons">
                  <button className="tpg-btn tpg-btn-primary tpg-btn-full">
                    Teklif Ver
                  </button>
                  <button className="tpg-btn tpg-btn-ghost tpg-btn-full">
                    Teklif Al
                  </button>
                </div>
                <div className="tpg-rfq-stats">
                  <div>
                    <span className="tpg-rfq-label">Aktif RFQ</span>
                    <span className="tpg-rfq-value">128</span>
                  </div>
                  <div>
                    <span className="tpg-rfq-label">Alıcı ülke</span>
                    <span className="tpg-rfq-value">32+</span>
                  </div>
                  <div>
                    <span className="tpg-rfq-label">Doğrulanmış üretici</span>
                    <span className="tpg-rfq-value">1.240</span>
                  </div>
                </div>
                <p className="tpg-rfq-note">
                  * Gerçek veriler Supabase üzerinden otomatik beslenecektir.
                </p>
              </div>
            </aside>
          </div>
        </section>

        {/* SEKTÖRLER */}
        <section id="sectors" className="tpg-section">
          <div className="tpg-container">
            <h2 className="tpg-section-title">Sektörler</h2>
            <p className="tpg-section-sub">
              Gıdadan tekstile, makineden ambalaja kadar onlarca sektörde
              tedarikçi bul.
            </p>

            <div className="tpg-sector-grid">
              <div className="tpg-sector-item">Ambalaj &amp; Baskı</div>
              <div className="tpg-sector-item">Gıda &amp; İçecek</div>
              <div className="tpg-sector-item">Tekstil &amp; Konfeksiyon</div>
              <div className="tpg-sector-item">Elektronik &amp; IoT</div>
              <div className="tpg-sector-item">Kimya &amp; Endüstriyel</div>
              <div className="tpg-sector-item">Ev &amp; Dekorasyon</div>
              <div className="tpg-sector-item">Lojistik &amp; Depolama</div>
              <div className="tpg-sector-item">Makine &amp; Yedek Parça</div>
            </div>
          </div>
        </section>

        {/* PREMIUM SATICI */}
        <section id="premium" className="tpg-section tpg-section-muted">
          <div className="tpg-container">
            <h2 className="tpg-section-title">Premium Satıcı Alanı</h2>
            <p className="tpg-section-sub">
              Premium üyeler öne çıkan vitrin alanında markalarını global alıcıya
              ilk sırada gösterir.
            </p>

            <div className="tpg-premium-grid">
              <div className="tpg-premium-card">
                <span className="tpg-premium-badge">PREMIUM SLOT</span>
                <p className="tpg-premium-empty">
                  Satıcı profili burada görünecek.
                </p>
              </div>
              <div className="tpg-premium-card">
                <span className="tpg-premium-badge">PREMIUM SLOT</span>
                <p className="tpg-premium-empty">
                  Satıcı profili burada görünecek.
                </p>
              </div>
              <div className="tpg-premium-card">
                <span className="tpg-premium-badge">PREMIUM SLOT</span>
                <p className="tpg-premium-empty">
                  Satıcı profili burada görünecek.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* VİTRİN / SHOWCASE */}
        <section id="showcase" className="tpg-section">
          <div className="tpg-container">
            <h2 className="tpg-section-title">Vitrin Alanı</h2>
            <p className="tpg-section-sub">
              Ürünler ve kampanyalar için hazır vitrin slotları. 3D fuar alanı
              Elite 3D Showroom planıyla aktif olur.
            </p>

            <div className="tpg-showcase-grid">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="tpg-slot" />
              ))}
            </div>
          </div>
        </section>

        {/* RFQ TABLO PLACEHOLDER */}
        <section className="tpg-section tpg-section-muted">
          <div className="tpg-container">
            <h2 className="tpg-section-title">Son RFQ Talepleri</h2>
            <p className="tpg-section-sub">
              Gerçek RFQ verileri Supabase sorgularıyla buraya düşecek.
            </p>

            <div className="tpg-rfq-table-wrapper">
              <table className="tpg-rfq-table">
                <thead>
                  <tr>
                    <th>Ürün</th>
                    <th>Miktar</th>
                    <th>Ülke</th>
                    <th>Durum</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="tpg-rfq-empty-row">
                    <td colSpan={4}>
                      Henüz gösterilecek RFQ bulunmuyor. İlk talebi sen
                      oluştur.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>

      {/* CTA */}
      <section className="tpg-cta">
        <div className="tpg-container tpg-cta-inner">
          <h2>B2B ticaretini TradePiGlobal ile güçlendir.</h2>
          <p>
            Alıcı veya satıcı olarak kaydol, hesabını tamamla. Detaylı işlemler
            panel üzerinden yönetilir.
          </p>
          <div className="tpg-cta-actions">
            <button className="tpg-btn tpg-btn-light">Alıcı Olarak Başla</button>
            <button className="tpg-btn tpg-btn-outline">Satıcı Olarak Başla</button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="tpg-footer">
        <div className="tpg-container tpg-footer-grid">
          <div>
            <div className="tpg-footer-logo">TradePiGlobal</div>
            <p className="tpg-footer-text">
              Pi destekli modern B2B ticaret altyapısı. Supabase + Next.js +
              ileride BabylonJS entegrasyonu için hazır.
            </p>
          </div>

          <div>
            <h4>Platform</h4>
            <ul>
              <li>Sektörler</li>
              <li>Vitrin</li>
              <li>Premium Satıcılar</li>
              <li>RFQ Yapısı</li>
            </ul>
          </div>

          <div>
            <h4>Hesap</h4>
            <ul>
              <li>Alıcı Kaydı</li>
              <li>Satıcı Kaydı</li>
              <li>Giriş Yap</li>
            </ul>
          </div>
        </div>
        <div className="tpg-footer-copy">
          © {new Date().getFullYear()} TradePiGlobal. Tüm hakları saklıdır.
        </div>
      </footer>

      {/* STYLES */}
      <style jsx>{`
        .tpg-page {
          min-height: 100vh;
          background: #020617;
          color: #e5e7eb;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Text",
            sans-serif;
        }

        .tpg-container {
          max-width: 1120px;
          margin: 0 auto;
          padding: 0 16px;
        }

        .tpg-header {
          position: sticky;
          top: 0;
          z-index: 30;
          backdrop-filter: blur(14px);
          background: rgba(2, 6, 23, 0.92);
          border-bottom: 1px solid #111827;
        }

        .tpg-header-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 12px 0;
        }

        .tpg-logo-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .tpg-logo-dot {
          width: 36px;
          height: 36px;
          border-radius: 999px;
          background: #10b981;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #022c22;
          font-weight: 700;
          font-size: 14px;
        }

        .tpg-logo-texts {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .tpg-logo-main {
          font-weight: 600;
          font-size: 16px;
          color: #f9fafb;
        }

        .tpg-logo-sub {
          font-size: 12px;
          color: #9ca3af;
        }

        .tpg-nav {
          display: flex;
          gap: 18px;
          font-size: 14px;
        }

        .tpg-nav a {
          color: #e5e7eb;
          text-decoration: none;
        }

        .tpg-nav a:hover {
          color: #a5f3fc;
        }

        .tpg-header-actions {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .tpg-btn {
          border-radius: 999px;
          padding: 7px 14px;
          font-size: 13px;
          border: none;
          cursor: pointer;
          font-weight: 500;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          white-space: nowrap;
        }

        .tpg-btn-primary {
          background: #10b981;
          color: #022c22;
        }

        .tpg-btn-ghost {
          background: transparent;
          border: 1px solid #10b981;
          color: #ecfdf5;
        }

        .tpg-btn-light {
          background: #ecfdf5;
          color: #022c22;
        }

        .tpg-btn-outline {
          background: transparent;
          border: 1px solid #ecfdf5;
          color: #ecfdf5;
        }

        .tpg-btn-full {
          width: 100%;
        }

        .tpg-link-btn {
          background: transparent;
          border: none;
          color: #e5e7eb;
          font-size: 13px;
          cursor: pointer;
        }

        .tpg-topbar {
          border-bottom: 1px solid #111827;
          background: #020617;
        }

        .tpg-topbar-inner {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 6px 0;
          font-size: 12px;
          color: #9ca3af;
        }

        .tpg-top-pill {
          padding: 3px 10px;
          border-radius: 999px;
          background: #0f172a;
          color: #e5e7eb;
          font-size: 11px;
        }

        .tpg-hero {
          padding: 28px 0 24px;
          background: radial-gradient(circle at top left, #111827 0, #020617 50%);
        }

        .tpg-hero-inner {
          display: grid;
          grid-template-columns: minmax(0, 2.1fr) minmax(0, 1.5fr);
          gap: 28px;
        }

        .tpg-kicker {
          margin: 0 0 6px;
          font-size: 11px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #a5f3fc;
        }

        .tpg-hero-title {
          margin: 0 0 10px;
          font-size: 26px;
          font-weight: 700;
          color: #f9fafb;
        }

        .tpg-primary {
          color: #10b981;
        }

        .tpg-hero-sub {
          margin: 0 0 16px;
          font-size: 14px;
          color: #9ca3af;
        }

        .tpg-search {
          display: flex;
          gap: 8px;
          margin-bottom: 10px;
        }

        .tpg-search input {
          flex: 1;
          border-radius: 999px;
          border: 1px solid #111827;
          background: #020617;
          padding: 8px 12px;
          font-size: 13px;
          color: #e5e7eb;
        }

        .tpg-search input::placeholder {
          color: #6b7280;
        }

        .tpg-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          align-items: center;
          margin-bottom: 16px;
        }

        .tpg-tag-label {
          font-size: 12px;
          color: #9ca3af;
        }

        .tpg-chip {
          border-radius: 999px;
          padding: 4px 10px;
          border: 1px solid #111827;
          background: #020617;
          font-size: 12px;
          color: #e5e7eb;
          cursor: pointer;
        }

        .tpg-chip:hover {
          border-color: #10b981;
        }

        .tpg-benefits {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 10px;
        }

        .tpg-benefit-item {
          display: flex;
          gap: 8px;
          padding: 10px;
          border-radius: 12px;
          background: #020617;
          border: 1px solid #111827;
        }

        .tpg-benefit-icon {
          font-size: 18px;
        }

        .tpg-benefit-item h3 {
          margin: 0 0 2px;
          font-size: 13px;
          color: #e5e7eb;
        }

        .tpg-benefit-item p {
          margin: 0;
          font-size: 12px;
          color: #9ca3af;
        }

        .tpg-hero-right {
          display: flex;
          align-items: flex-start;
          justify-content: flex-end;
        }

        .tpg-rfq-box {
          width: 100%;
          max-width: 320px;
          border-radius: 18px;
          padding: 16px 16px 14px;
          background: #020617;
          border: 1px solid #10b98133;
          box-shadow: 0 18px 45px rgba(15, 23, 42, 0.7);
        }

        .tpg-rfq-box h4 {
          margin: 0 0 4px;
          font-size: 15px;
          color: #e5e7eb;
        }

        .tpg-rfq-box p {
          margin: 0 0 10px;
          font-size: 12px;
          color: #9ca3af;
        }

        .tpg-rfq-buttons {
          display: flex;
          gap: 8px;
          margin-bottom: 10px;
        }

        .tpg-rfq-stats {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 8px;
          margin-bottom: 6px;
        }

        .tpg-rfq-label {
          font-size: 11px;
          color: #9ca3af;
        }

        .tpg-rfq-value {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: #ecfdf5;
        }

        .tpg-rfq-note {
          font-size: 11px;
          color: #6b7280;
        }

        .tpg-section {
          padding: 26px 0;
          background: #020617;
          color: #e5e7eb;
        }

        .tpg-section-muted {
          background: #020617;
          border-top: 1px solid #111827;
          border-bottom: 1px solid #111827;
        }

        .tpg-section-title {
          margin: 0 0 8px;
          font-size: 20px;
          color: #e5e7eb;
        }

        .tpg-section-sub {
          margin: 0 0 16px;
          font-size: 13px;
          color: #9ca3af;
        }

        .tpg-sector-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 10px;
        }

        .tpg-sector-item {
          background: #0f172a;
          border-radius: 12px;
          padding: 10px 12px;
          font-size: 13px;
          border: 1px solid #111827;
        }

        .tpg-premium-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 14px;
        }

        .tpg-premium-card {
          background: #0f172a;
          border-radius: 14px;
          padding: 14px;
          border: 1px solid #10b981;
        }

        .tpg-premium-badge {
          display: inline-flex;
          padding: 4px 8px;
          border-radius: 999px;
          background: #10b981;
          color: #022c22;
          font-size: 11px;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .tpg-premium-empty {
          font-size: 13px;
          color: #d1d5db;
        }

        .tpg-showcase-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 10px;
        }

        .tpg-slot {
          height: 140px;
          border-radius: 12px;
          background: radial-gradient(circle at top, #111827 0, #020617 60%);
          border: 1px solid #111827;
        }

        .tpg-rfq-table-wrapper {
          overflow-x: auto;
        }

        .tpg-rfq-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 13px;
          background: #020617;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid #111827;
        }

        .tpg-rfq-table th,
        .tpg-rfq-table td {
          padding: 8px 10px;
          text-align: left;
        }

        .tpg-rfq-table thead {
          background: #0f172a;
          color: #e5e7eb;
        }

        .tpg-rfq-empty-row td {
          text-align: center;
          color: #6b7280;
        }

        .tpg-cta {
          background: #022c22;
          color: #ecfdf5;
          padding: 26px 0;
        }

        .tpg-cta-inner {
          display: flex;
          flex-direction: column;
          gap: 10px;
          align-items: flex-start;
        }

        .tpg-cta-inner h2 {
          margin: 0;
          font-size: 20px;
        }

        .tpg-cta-actions {
          display: flex;
          gap: 10px;
        }

        .tpg-footer {
          background: #020617;
          color: #9ca3af;
          border-top: 1px solid #111827;
          padding-top: 18px;
        }

        .tpg-footer-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.5fr) repeat(2, minmax(0, 1fr));
          gap: 16px;
          padding-bottom: 12px;
        }

        .tpg-footer-logo {
          font-weight: 700;
          font-size: 16px;
          color: #f9fafb;
        }

        .tpg-footer-text {
          margin: 6px 0 0;
          font-size: 13px;
        }

        .tpg-footer h4 {
          margin: 0 0 6px;
          font-size: 13px;
          color: #e5e7eb;
        }

        .tpg-footer ul {
          margin: 0;
          padding: 0;
          list-style: none;
          font-size: 12px;
        }

        .tpg-footer li {
          margin: 3px 0;
        }

        .tpg-footer-copy {
          border-top: 1px solid #111827;
          padding: 8px 16px 12px;
          font-size: 11px;
          text-align: center;
          color: #6b7280;
        }

        @media (max-width: 768px) {
          .tpg-header-inner {
            flex-wrap: wrap;
          }

          .tpg-nav {
            display: none;
          }

          .tpg-hero-inner {
            grid-template-columns: minmax(0, 1fr);
          }

          .tpg-hero-right {
            justify-content: flex-start;
          }

          .tpg-rfq-box {
            margin-top: 12px;
          }

          .tpg-footer-grid {
            grid-template-columns: minmax(0, 1fr);
          }
        }
      `}</style>
    </div>
  );
        }
