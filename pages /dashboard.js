export default function DashboardPage() {
  // Buraya supabase'den session çekme vs sonra eklenecek
  return (
    <div className="tpg-container tpg-section">
      <h1 className="tpg-section-title">Kontrol Paneli</h1>
      <p className="tpg-section-sub">
        Buradan ürünlerini, RFQ tekliflerini ve premium slotlarını yöneteceksin.
      </p>

      <div className="tpg-grid" style={{ marginTop: 16 }}>
        <div className="tpg-card">
          <div className="tpg-section-title" style={{ fontSize: 16 }}>
            Ürünler
          </div>
          <p className="tpg-section-sub">
            Supabase &quot;products&quot; tablosu ile entegre liste burada
            olacak.
          </p>
        </div>

        <div className="tpg-card">
          <div className="tpg-section-title" style={{ fontSize: 16 }}>
            RFQ Gelen Teklifler
          </div>
          <p className="tpg-section-sub">
            Buyer tarafından gönderilen RFQ teklifleri burada listelenecek.
          </p>
        </div>

        <div className="tpg-card">
          <div className="tpg-section-title" style={{ fontSize: 16 }}>
            Premium Slotlar
          </div>
          <p className="tpg-section-sub">
            3D showroom ve vitrin premium alanları için yönetim kartı.
          </p>
        </div>
      </div>
    </div>
  );
}
