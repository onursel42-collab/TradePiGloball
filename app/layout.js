import "./globals.css";

export const metadata = {
  title: "TradePiGlobal",
  description: "Pi Network tabanlı B2B ticaret platformu"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
