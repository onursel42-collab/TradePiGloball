// components/Layout.tsx
import Head from "next/head";
import React from "react";

type LayoutProps = {
  title?: string;
  children: React.ReactNode;
};

export default function Layout({ title, children }: LayoutProps) {
  const pageTitle = title
    ? `${title} – TradePiGlobal`
    : "TradePiGlobal – Yeni Nesil B2B";

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="tpg-shell">
        {/* Üst bar */}
        <header className="tpg-header">
          <div className="tpg-header-inner">
            <div className="tpg-logo">
              <span className="tpg-logo-mark">π</span>
              <span className="tpg-logo-text">TradePiGlobal</span>
            </div>

            <nav className="tpg-nav">
              <a href="#sectors">Sektörler</a>
              <a href="#showroom">3D Showroom</a>
              <a href="#rfq">RFQ Akışı</a>
              <a href="#about">Hakkında</a>
            </nav>

            <div className="tpg-header-actions">
              <a href="#" className="tpg-btn tpg-btn-ghost">
                Giriş Yap
              </a>
              <a href="#" className="tpg-btn tpg-btn-primary">
                Satıcı Ol
              </a>
            </div>
          </div>
        </header>

        {/* Sayfa içeriği */}
        <main className="tpg-main">{children}</main>

        {/* Footer */}
        <footer className="tpg-footer" id="about">
          <div className="tpg-footer-inner">
            <div>
              <div className="tpg-footer-logo">TradePiGlobal</div>
              <p className="tpg-footer-text">
                Pi destekli yeni nesil B2B altyapısı. Supabase + Next.js +
                Babylon.js stack.
              </p>
            </div>

            <div className="tpg-footer-links">
              <a href="#sectors">Sektörler</a>
              <a href="#showroom">3D Fuar</a>
              <a href="#rfq">RFQ Akışı</a>
              <a href="#">KVKK &amp; Koşullar</a>
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
