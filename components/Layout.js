import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="tpg-layout">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
