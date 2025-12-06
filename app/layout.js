import './globals.css';

export const metadata = {
  title: 'TradePi Global',
  description: 'B2B Marketplace powered by Pi Network & Supabase',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
