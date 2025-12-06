
export const metadata = {
  title: "TradePi Global",
  description: "B2B Marketplace",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
