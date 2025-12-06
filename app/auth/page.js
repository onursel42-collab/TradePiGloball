export default function AuthPage() {
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
        TradePi Global – Giriş / Kayıt
      </h1>
      <p style={{ textAlign: "center", maxWidth: 480 }}>
        Buraya Supabase ile satıcı / alıcı giriş ekranını kuracağız.
        Şimdilik sadece placeholder olarak dursun.
      </p>
    </main>
  );
}
