// components/Layout.js
import Head from "next/head";

export default function Layout({ title, children }) {
  const pageTitle = title ? `${title} – TradePiGlobal` : "TradePiGlobal";

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>

      <header className="tpg-auth-header">
        <div className="tpg-auth-container">
          <a href="/" className="logo">
            <span className="mark">TP</span>
            <span>TradePiGlobal</span>
          </a>
        </div>
      </header>

      <main className="tpg-auth-main">
        <div className="tpg-auth-container">{children}</div>
      </main>

      <style jsx>{`
        .tpg-auth-header {
          border-bottom: 1px solid #e5e7eb;
          background: #ffffff;
        }
        .tpg-auth-container {
          max-width: 480px;
          margin: 0 auto;
          padding: 10px 16px 24px;
        }
        .logo {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: #111827;
        }
        .mark {
          width: 28px;
          height: 28px;
          border-radius: 999px;
          background: #1e293b;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          font-weight: 700;
        }
        .tpg-auth-main {
          min-height: calc(100vh - 60px);
          background: #f3f4f6;
        }
      `}</style>
    </>
  );
}
