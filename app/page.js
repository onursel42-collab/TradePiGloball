import Link from 'next/link';

export default function HomePage() {
  return (
    <main>
      <h1>TradePi Global</h1>

      <p className="subtitle">
        B2B Pazar Yeri • Pi Network + Supabase altyapılı satıcı paneli
      </p>

      <div className="card">
        <p>Satıcı paneline girmek veya kayıt olmak için aşağıdan devam et.</p>
        <Link href="/auth" className="button">
          Üyelik / Giriş
        </Link>
      </div>
    </main>
  );
}
