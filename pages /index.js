import Link from "next/link";

export default function Home() {
  return (
    <div className="tpg-container">
      <section className="tpg-hero">
        <div className="tpg-hero-grid">
          <div>
            <h1 className="tpg-hero-title">
              Üretici ve alıcıları{" "}
              <span>tek B2B köprüde</span> buluşturuyoruz.
            </h1>
            <p className="tpg-section-sub" style={{ marginTop: 8 }}>
              Doğrulanmış tedarikçiler, RFQ tabanlı teklif sistemi ve hibrit
              ödeme altyapısı ile global ticareti sadeleştiriyoruz.
            </p>

            <div className="tpg-hero-pill-row">
              <span className="tpg-pill">🔒 Güvenli süreç</span>
              <span className="tpg-pill">🌍 Global alıcı & satıcı</span>
              <span className="tpg-pill">📄 RFQ ile toplu teklif</span>
            </div>

            <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
              <Link href="/signup">
                <button className="tpg-btn tpg-btn-primary">
                  Alıcı / Satıcı Kaydı
                </button>
              </Link>
              <Link href="/showroom">
                <button className="tpg-btn tpg-btn-outline">
                  3D Showroom&apos;a Git
                </button>
              </Link>
            </div>
          </div>

          <div className="tpg-card">
            <h3 className="tpg-section-title">Hızlı RFQ</h3>
            <p className="tpg-section-sub">
              Alıcılar tek form ile birden fazla satıcıdan teklif isteyebilir.
            </p>
            <Link href="/rfq" style={{ marginTop: 12, display: "inline-block" }}>
              <button className="tpg-btn tpg-btn-primary">
                RFQ Talebi Oluştur
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Sektörler */}
      <section className="tpg-section" id="sectors">
        <h2 className="tpg-section-title">Sektörler</h2>
        <p className="tpg-section-sub">
          TradePiGlobal üzerindeki temel sektör segmentleri.
        </p>

        <div className="tpg-grid" style={{ marginTop: 16 }}>
          {[
            "Ambalaj & Baskı",
            "Gıda & İçecek",
            "Tekstil & Konfeksiyon",
            "Elektronik & IoT",
            "Kimya & Endüstriyel",
            "Ev & Dekorasyon",
            "Lojistik & Depolama",
            "Tarım & Girdiler"
          ].map((name) => (
            <div key={name} className="tpg-card">
              <div style={{ fontSize: 15, marginBottom: 4 }}>{name}</div>
              <div className="tpg-section-sub">
                Bu segmentteki satıcılar RFQ ve ürün vitrini ile listelenecek.
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mini vitrin skeleton */}
      <section className="tpg-section tpg-section-muted">
        <h2 className="tpg-section-title">Vitrin (Demo)</h2>
        <p className="tpg-section-sub">
          Supabase &quot;products&quot; tablosu bağlandığında gerçek ürünler
          burada listelenecek.
        </p>

        <div className="tpg-grid" style={{ marginTop: 16 }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="tpg-product-card">
              <span className="tpg-tag-sm">Demo Slot #{i + 1}</span>
              <h3>Ürün Başlığı</h3>
              <p className="tpg-section-sub">
                Bu alan Supabase&apos;ten dinamik olarak doldurulacak.
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
                }
