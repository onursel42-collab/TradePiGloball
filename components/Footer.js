import Link from "next/link";

export default function Footer() {
  return (
    <footer className="tpg-footer">
      <div className="tpg-container tpg-footer-inner">
        <div>
          <div className="tpg-logo">
            <span>TradePi</span>Global
          </div>
          <div>Pi destekli modern B2B ticaret altyapısı.</div>
        </div>
        <div className="tpg-footer-links">
          <Link href="/login">Giriş</Link>
          <Link href="/signup">Kayıt</Link>
          <Link href="/showroom">3D Showroom</Link>
          <Link href="/rfq">RFQ</Link>
        </div>
      </div>
      <div className="tpg-container" style={{ marginTop: 8 }}>
        © {new Date().getFullYear()} TradePiGlobal
      </div>
    </footer>
  );
}
