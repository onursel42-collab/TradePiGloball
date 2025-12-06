// app/layout.js
import './globals.css';

export const metadata = {
  title: 'TradePiGlobal',
  description: 'Global B2B Pi & fiat friendly trade hub',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
          backgroundColor: '#050816',
          color: '#f9fafb',
        }}
      >
        <header
          style={{
            borderBottom: '1px solid #1f2933',
            padding: '12px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'sticky',
            top: 0,
            zIndex: 20,
            background: '#050816',
          }}
        >
          <div style={{ fontWeight: 700, fontSize: 20 }}>
            TradePi<span style={{ color: '#f97316' }}>Global</span>
          </div>
          <nav style={{ display: 'flex', gap: 16, fontSize: 14 }}>
            <a href="/" style={{ textDecoration: 'none', color: '#e5e7eb' }}>
              Home
            </a>
            <a
              href="/vendor/apply"
              style={{ textDecoration: 'none', color: '#e5e7eb' }}
            >
              Become a Vendor
            </a>
            <a
              href="/auth"
              style={{
                textDecoration: 'none',
                color: '#111827',
                backgroundColor: '#f97316',
                padding: '6px 12px',
                borderRadius: 999,
                fontWeight: 600,
              }}
            >
              Login
            </a>
          </nav>
        </header>
        <main style={{ minHeight: '100vh' }}>{children}</main>
        <footer
          style={{
            borderTop: '1px solid #1f2933',
            padding: '12px 20px',
            fontSize: 12,
            color: '#9ca3af',
          }}
        >
          © {new Date().getFullYear()} TradePiGlobal. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
