export const metadata = {
  title: "TradePiGlobal",
  description: "Yeni Nesil B2B Platformu",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
