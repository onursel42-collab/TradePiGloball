
import Link from "next/link";

export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
        TradePi Global – B2B Marketplace
      </h1>
      <p style={{ marginBottom: "1.5rem", textAlign: "center", maxWidth: 480 }}>
        Burası geçici ana sayfa. Sonra ana vitrin, satıcı tipleri ve reklam
        duvarını buraya kuracağız.
      </p>
      <Link
        href="/auth"
        style={{
          padding: "0.75rem 1.5rem",
          borderRadius: "999px",
          border: "1px solid #111",
          textDecoration: "none",
        }}
      >
        Giriş / Kayıt
      </Link>
    </main>
  );
}
