import "../styles/globals.css";

export const metadata = {
  title: "TradePiGlobal – B2B Marketplace",
  description: "Supabase + Next.js altyapılı yeni nesil B2B ticaret platformu",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body className="tpg-body">
        {children}
      </body>
    </html>
  );
}
