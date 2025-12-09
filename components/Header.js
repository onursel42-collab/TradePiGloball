import Link from "next/link";

export default function Header() {
  return (
    <header>
      <div className="tpg-topbar">
        <div className="tpg-container tpg-topbar-inner">
          <div>TradePiGlobal</div>
          <div className="tpg-topbar-right">
            <span>USD/TRY: -</span>
            <span>EUR/TRY: -</span>
            <span>Pi iç kuru: 1 Pi ≈ 10 USD</span>
          </div>
        </div>
      </div>
      <div className="tpg-header">
        <div className="tpg-container tpg-header-inner">
          <Link href="/" className="tpg-logo">
            <span>TradePi</span>Global
          </Link>

          <nav className="tpg-nav">
            <Link href="/#sectors">Sektörler</Link>
            <Link href="/showroom">3D Showroom</Link>
            <Link href="/rfq">RFQ</Link>
            <Link href="/dashboard">Panel</Link>
          </nav>

          <div style={{ display: "flex", gap: 8 }}>
            <Link href="/signup">
              <button className="tpg-btn tpg-btn-outline">Kayıt Ol</button>
            </Link>
            <Link href="/login">
              <button className="tpg-btn tpg-btn-primary">Giriş Yap</button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
