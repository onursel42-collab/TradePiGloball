import Link from "next/link";

export default function Navbar() {
  return (
    <nav style={styles.nav}>
      <Link href="/" style={styles.logo}>
        TradePiGlobal
      </Link>

      <ul style={styles.menu}>
        <li><Link href="/product">Showroom</Link></li>
        <li><Link href="/login">Giriş Yap</Link></li>
        <li><Link href="/signup">Kayıt Ol</Link></li>
      </ul>
    </nav>
  );
}

const styles = {
  nav: {
    width: "100%",
    padding: "16px 26px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    borderBottom: "1px solid #eaeaea",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  logo: {
    fontWeight: "bold",
    fontSize: 22,
    color: "#0070f3",
  },
  menu: {
    display: "flex",
    gap: "22px",
    listStyle: "none",
    fontSize: 16,
  },
};
