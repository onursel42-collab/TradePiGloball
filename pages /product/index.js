import Link from "next/link";

export default function Home() {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>TradePiGlobal</h1>
        <p style={styles.subtitle}>
          Yeni Nesil B2B — Üretici & Alıcıları Dünya Çapında Birleştir 🚀
        </p>
      </header>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>3D Showroom Deneyimi 🎮</h2>
        <p style={styles.sectionText}>
          Ürünleri dijital sahnede keşfet — Babylon.js destekli 🏆
        </p>
        <Link href="/product">
          <span style={styles.button}>Showroom’a Git</span>
        </Link>
      </section>

      <footer style={styles.footer}>
        <p>Supabase + Next.js altyapısı aktif 🔥</p>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
    padding: "40px 20px",
  },
  header: {
    marginBottom: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
  subtitle: {
    marginTop: 10,
    fontSize: 16,
    color: "#444",
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 600,
  },
  sectionText: {
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    display: "inline-block",
    backgroundColor: "#0070f3",
    color: "#fff",
    padding: "12px 22px",
    borderRadius: 8,
    fontSize: 16,
    cursor: "pointer",
  },
  footer: {
    marginTop: 70,
    color: "#777",
  },
};
