// pages/index.js
import Head from "next/head";

export default function HomePage() {
  const sectors = [
    "Ambalaj & Baskı",
    "Gıda & İçecek",
    "Tekstil & Konfeksiyon",
    "Elektronik & IoT",
    "Endüstriyel Üretim",
    "Kimya & Plastik",
    "Ev & Dekorasyon",
    "Lojistik & Depolama",
  ];

  const showcaseSlots = Array.from({ length: 12 });

  return (
    <>
      <Head>
        <title>TradePiGlobal – Pi destekli B2B Marketplace</title>
        <meta
          name="description"
          content="TradePiGlobal, global üretici ve alıcıları aynı B2B köprüde buluşturan, Pi destekli ticaret altyapısıdır."
        />
      </Head>

      <div className="tpg-page">
        {/* HEADER */}
        <header className="tpg-header">
          <div className="tpg-container tpg-header-inner">
            <div className="tpg-logo">
              <span className="tpg-logo-mark">TP</span>
              <span>TradePiGlobal</span>
            </div>

            <nav className="tpg-nav">
              <a href="#sectors">Sektörler</a>
              <a href="#premium-sellers">Premium Satıcılar</a>
              <a href="#rfqs">RFQ Alanı</a>
            </nav>

            <div className="tpg-header-actions">
              <a href="/auth/register-buyer" className="tpg-btn-text">
                Alıcı Kaydı
              </a>
              <a href="/auth/register-seller" className="tpg-btn-text">
                Satıcı Kaydı
              </a>
              <a href="/auth/login" className="tpg-btn-primary">
                Giriş Yap
              </a>
            </div>
          </div>
        </header>

        {/* HERO + RFQ KUTUSU */}
        <main>
          <section className="tpg-hero">
            <div className="tpg-container tpg-hero-inner">
              {/* Sol taraf */}
              <div className="tpg-hero-left">
                <h1 className="tpg-hero-title">
                  Üretici ve alıcıları{" "}
                  <span className="tpg-hero-highlight">tek B2B köprüde</span>{" "}
                  buluşturuyoruz.
                </h1>

                <p className="tpg-hero-sub">
                  TradePiGlobal; tedarikçiler için görünürlük, alıcılar için
                  şeffaf RFQ yönetimi ve Pi destekli hibrit ödeme altyapısı
                  sunar. Siz ticarete odaklanın, altyapıyı biz yönetelim.
                </p>

                {/* Arama kutusu */}
                <div className="tpg-search">
                  <div className="tpg-search-box">
                    <span className="tpg-search-icon">🔍</span>
                    <input
                      type="text"
                      placeholder="Ürün, firma veya sektör ara…"
                    />
                    <button className="tpg-search-btn">Ara</button>
                  </div>

                  <div className="tpg-search-chips">
                    <button className="tpg-chip">Ambalaj tedarikçisi</button>
                    <button className="tpg-chip">Özel etiket gıda</button>
                    <button className="tpg-chip">IoT üreticisi</button>
                  </div>
                </div>

                {/* Kısa avantaj satırı */}
                <div className="tpg-inline-benefits">
                  <span>🔒 Güvenli ödeme akışı</span>
                  <span>🌍 Global B2B eşleşme</span>
                  <span>⚡ RFQ tabanlı teklif alma</span>
                </div>
              </div>

              {/* Sağ RFQ kutusu */}
              <aside className="tpg-hero-right">
                <div className="tpg-rfq-box">
                  <h4>Hızlı RFQ oluştur</h4>
                  <p>
                    Tek form ile birden fazla tedarikçiden teklif topla. Alıcı
                    olarak detayları gir, satıcılar sana teklif göndersin.
                  </p>

                  <div className="tpg-rfq-actions">
                    <button className="tpg-btn-primary tpg-btn-full">
                      RFQ Oluştur
                    </button>
                    <button className="tpg-btn-ghost tpg-btn-full">
                      Açık RFQ’ları Gör
                    </button>
                  </div>

                  <div className="tpg-rfq-mini">
                    <span className="dot" />
                    <span>Gerçek veriler ziyaretçiler geldikçe burada listelenecek.</span>
                  </div>
                </div>
              </aside>
            </div>
          </section>

          {/* SEKTÖRLER BLOKU */}
          <section id="sectors" className="tpg-section">
            <div className="tpg-container">
              <h2 className="tpg-section-title">Öne çıkan sektörler</h2>
              <p className="tpg-section-sub">
                İlk aşamada bu sektörlere odaklanıyoruz. Zamanla yeni dikeyler
                eklenecek; tüm B2B tedarik zincirini aynı çatı altında topluyoruz.
              </p>

              <div className="tpg-sector-grid">
                {sectors.map((s) => (
                  <div key={s} className="tpg-sector-item">
                    {s}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* PREMIUM SATICI + VİTRİN */}
          <section id="premium-sellers" className="tpg-section tpg-section-muted">
            <div className="tpg-container">
              <div className="tpg-premium-header">
                <h2 className="tpg-section-title">Premium satıcı vitrini</h2>
                <p className="tpg-section-sub">
                  Premium plan kullanan satıcılar; arama sonuçlarında öne çıkar,
                  ana sayfa vitrininde listelenir ve gelişmiş görünürlük elde eder.
                </p>
              </div>

              {/* Premium kartlar */}
              <div className="tpg-premium-grid">
                <div className="tpg-premium-card">
                  <div className="tpg-premium-badge">PREMIUM</div>
                  <h3>Premium satıcı alanı</h3>
                  <p>
                    Premium plana geçen satıcıların profilleri burada vitrin
                    alanında gösterilecek.
                  </p>
                </div>
                <div className="tpg-premium-card">
                  <div className="tpg-premium-badge">GLOBAL</div>
                  <h3>Global görünürlük</h3>
                  <p>
                    Uluslararası alıcı odaklı satıcı profilleri, bu bölümde
                    öncelikli görünürlük alır.
                  </p>
                </div>
                <div className="tpg-premium-card">
                  <div className="tpg-premium-badge">3D</div>
                  <h3>3D fuar alanı girişi</h3>
                  <p>
                    Elite 3D showroom yetkisine sahip satıcılar; özel 3D fuar
                    alanına taşınabilir.
                  </p>
                </div>
              </div>

              {/* 3D fuar alanı için slot grid (şimdilik boş bloklar) */}
              <div className="tpg-showcase-wrapper">
                <h3 className="tpg-showcase-title">
                  Ana sayfa fuar vitrini (slot alanı)
                </h3>
                <div className="tpg-showcase-grid">
                  {showcaseSlots.map((_, idx) => (
                    <div key={idx} className="tpg-slot" />
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* RFQ LİSTESİ (GERÇEK VERİ İÇİN HAZIR TABLO) */}
          <section id="rfqs" className="tpg-section">
            <div className="tpg-container">
              <h2 className="tpg-section-title">RFQ akışı</h2>
              <p className="tpg-section-sub">
                Supabase entegrasyonu tamamlandığında; buraya gerçek alıcı
                talepleri (RFQ’lar) otomatik düşecek. Şu an sadece yapı hazır.
              </p>

              <div className="tpg-rfq-table-wrapper">
                <table className="tpg-rfq-table">
                  <thead>
                    <tr>
                      <th>Talep başlığı</th>
                      <th>Miktar</th>
                      <th>Hedef ülke</th>
                      <th>Oluşturma</th>
                      <th>Durum</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="tpg-rfq-empty-row">
                      <td colSpan={5}>
                        Henüz listelenecek RFQ bulunmuyor. Alıcılar taleplerini
                        oluşturmaya başladığında, kayıtlar burada görüntülenecek.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="tpg-cta">
            <div className="tpg-container tpg-cta-inner">
              <div>
                <h2>TradePiGlobal ile B2B ticarete başla</h2>
                <p>
                  Ücretsiz kayıt ol, profilini tamamla ve tedarikçi / alıcı
                  tarafında ilk adımını at. Pi destekli hibrit ödeme altyapısı
                  ilerleyen aşamalarda devreye alınacak.
                </p>
              </div>
              <div className="tpg-cta-actions">
                <a href="/auth/register-buyer" className="tpg-btn-primary">
                  Alıcı olarak başla
                </a>
                <a href="/auth/register-seller" className="tpg-btn-ghost">
                  Satıcı olarak başla
                </a>
              </div>
            </div>
          </section>
        </main>

        {/* FOOTER */}
        <footer className="tpg-footer">
          <div className="tpg-container tpg-footer-grid">
            <div>
              <div className="tpg-footer-logo">TradePiGlobal</div>
              <p className="tpg-footer-text">
                Pi destekli dijital B2B ticaret altyapısı. Üretici ve alıcıları
                aynı köprüde buluşturuyoruz.
              </p>
            </div>

            <div>
              <h4>Platform</h4>
              <ul>
                <li>Sektörler</li>
                <li>Premium satıcılar</li>
                <li>RFQ akışı</li>
              </ul>
            </div>

            <div>
              <h4>Hesap</h4>
              <ul>
                <li>Alıcı kaydı</li>
                <li>Satıcı kaydı</li>
                <li>Giriş yap</li>
              </ul>
            </div>
          </div>

          <div className="tpg-footer-copy">
            © {new Date().getFullYear()} TradePiGlobal
          </div>
        </footer>
      </div>
    </>
  );
            }
